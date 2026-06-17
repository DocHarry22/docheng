import { cookies } from "next/headers";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

export const SESSION_COOKIE_NAME = "docheng_session";
const USERS_FILE_PATH = join(process.cwd(), "data", "users.json");
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const MIN_PASSWORD_LENGTH = 8;

export type UserRole = "viewer" | "member" | "admin";

export interface SessionUser {
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

interface StoredUser extends SessionUser {
  salt: string;
  passwordHash: string;
}

interface StoredUsers {
  users: StoredUser[];
}

function getSessionSecret() {
  if (process.env.SESSION_SECRET) {
    return process.env.SESSION_SECRET;
  }

  return process.env.NODE_ENV === "production" ? null : "docheng-dev-session-secret";
}

function getDefaultUserStore(): StoredUsers {
  return { users: [] };
}

async function readUserStore() {
  try {
    const raw = await readFile(USERS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<StoredUsers>;

    if (!Array.isArray(parsed.users)) {
      return getDefaultUserStore();
    }

    return {
      users: parsed.users.filter((user): user is StoredUser => {
        return Boolean(
          user &&
            typeof user.email === "string" &&
            typeof user.name === "string" &&
            typeof user.role === "string" &&
            typeof user.createdAt === "string" &&
            typeof user.salt === "string" &&
            typeof user.passwordHash === "string"
        );
      }),
    };
  } catch {
    return getDefaultUserStore();
  }
}

async function writeUserStore(store: StoredUsers) {
  await mkdir(dirname(USERS_FILE_PATH), { recursive: true });
  await writeFile(USERS_FILE_PATH, JSON.stringify(store, null, 2) + "\n", "utf-8");
}

function sanitizeUser(user: StoredUser): SessionUser {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const passwordHash = scryptSync(password, salt, 64).toString("hex");
  return { salt, passwordHash };
}

function verifyPassword(password: string, user: StoredUser) {
  const candidateHash = scryptSync(password, user.salt, 64);
  const storedHash = Buffer.from(user.passwordHash, "hex");

  if (candidateHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(candidateHash, storedHash);
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf-8");
}

function signSessionPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function createSessionToken(user: SessionUser) {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload = encodeBase64Url(JSON.stringify(user));
  const signature = signSessionPayload(payload, secret);
  return `${payload}.${signature}`;
}

function verifySessionToken(token: string): SessionUser | null {
  const secret = getSessionSecret();
  if (!secret) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = signSessionPayload(payload, secret);
  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(payload)) as Partial<SessionUser>;
    if (
      typeof parsed.email !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.role !== "string" ||
      typeof parsed.createdAt !== "string"
    ) {
      return null;
    }

    if (!["viewer", "member", "admin"].includes(parsed.role)) {
      return null;
    }

    return parsed as SessionUser;
  } catch {
    return null;
  }
}

export function isAuthConfigured() {
  return Boolean(getSessionSecret());
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function findUserByEmail(email: string) {
  const normalized = normalizeEmail(email);
  const store = await readUserStore();
  const user = store.users.find((entry) => entry.email === normalized);
  return user ? sanitizeUser(user) : null;
}

export async function registerUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = name.trim().replace(/\s+/g, " ");

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (normalizedName.length < 2) {
    throw new Error("Please enter your full name.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Passwords must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  const store = await readUserStore();
  if (store.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account already exists for that email address.");
  }

  const role: UserRole = store.users.length === 0 ? "admin" : "member";
  const { salt, passwordHash } = hashPassword(password);

  const user: StoredUser = {
    email: normalizedEmail,
    name: normalizedName,
    role,
    createdAt: new Date().toISOString(),
    salt,
    passwordHash,
  };

  store.users.push(user);
  await writeUserStore(store);
  return sanitizeUser(user);
}

export async function authenticateUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  const store = await readUserStore();
  const user = store.users.find((entry) => entry.email === normalizedEmail);

  if (!user || !verifyPassword(password, user)) {
    return null;
  }

  return sanitizeUser(user);
}

export function applySessionCookie(
  response: Response & {
    cookies: {
      set: (
        name: string,
        value: string,
        options: {
          httpOnly: boolean;
          sameSite: "lax";
          secure: boolean;
          path: string;
          maxAge: number;
        }
      ) => void;
    };
  },
  user: SessionUser
) {
  const token = createSessionToken(user);
  if (!token) {
    throw new Error("Authentication is not configured.");
  }

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export function clearSessionCookie(
  response: Response & {
    cookies: {
      set: (
        name: string,
        value: string,
        options: {
          httpOnly: boolean;
          sameSite: "lax";
          secure: boolean;
          path: string;
          maxAge: number;
        }
      ) => void;
    };
  }
) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
