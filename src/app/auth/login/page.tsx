import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-svh bg-surface-base">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_30%)]" />
      <div className="px-6 pt-8 sm:px-8">
        <Link href="/" className="text-sm font-medium text-text-secondary hover:text-text-primary">
          ← Back to DoCHEng
        </Link>
      </div>
      <AuthForm mode="login" nextPath={params.next} />
    </main>
  );
}
