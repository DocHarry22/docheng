import type { UserRole } from "@/lib/auth";
import {
  calculatorDefinitions,
  getCalculatorBySlug,
} from "@/lib/calculators";

const roleRank: Record<UserRole, number> = {
  viewer: 0,
  member: 1,
  admin: 2,
};

export function hasRequiredRole(userRole: UserRole, requiredRole: UserRole) {
  return roleRank[userRole] >= roleRank[requiredRole];
}

export function canAccessCalculator(userRole: UserRole, slug: string) {
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) {
    return false;
  }

  return hasRequiredRole(userRole, calculator.requiredRole);
}

export function getAccessibleCalculators(userRole: UserRole) {
  return calculatorDefinitions.filter((calculator) =>
    hasRequiredRole(userRole, calculator.requiredRole)
  );
}

export function getLockedCalculators(userRole: UserRole) {
  return calculatorDefinitions.filter(
    (calculator) => !hasRequiredRole(userRole, calculator.requiredRole)
  );
}

export function getRoleLabel(role: UserRole) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "member":
      return "Member";
    case "viewer":
      return "Viewer";
  }
}

export function getRoleSummary(role: UserRole) {
  switch (role) {
    case "admin":
      return "Full access to the dashboard, engineering calculators, and protected admin tooling.";
    case "member":
      return "Access to the main dashboard and member-level engineering calculators.";
    case "viewer":
      return "Read-only access with starter calculators enabled.";
  }
}
