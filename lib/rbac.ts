export type AppRole =
  | "Proprietor"
  | "Admin"
  | "Accounts Officer"
  | "HR Executive"
  | "Project Engineer"
  | "Site Supervisor"
  | "Store Manager";

export const APP_ROLES: AppRole[] = [
  "Proprietor",
  "Admin",
  "Accounts Officer",
  "HR Executive",
  "Project Engineer",
  "Site Supervisor",
  "Store Manager",
];

export type AppModuleKey =
  | "dashboard"
  | "analytics"
  | "userAccess"
  | "settings"
  | "hrm"
  | "payroll"
  | "agreementsContracts"
  | "projects"
  | "inventory"
  | "subcontractors"
  | "flats"
  | "moneyIndent"
  | "accounts.paymentVoucher"
  | "accounts.receivedVoucher"
  | "accounts.clientReceipts"
  | "accounts.journal"
  | "accounts.journalBill"
  | "accounts.balanceSheet";

export type DeleteMode = "approval" | "disabled" | "archive";

export interface ModuleActions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canApprove: boolean;
  canPrint: boolean;
  deleteMode: DeleteMode;
}

type ModuleMatrix = Partial<Record<AppModuleKey, Partial<ModuleActions>>>;

const baseDefaults: ModuleActions = {
  canView: true,
  canCreate: false,
  canEdit: false,
  canApprove: false,
  canPrint: true,
  deleteMode: "approval",
};

const proprietorMatrix: ModuleMatrix = {
  dashboard: { canCreate: true, canEdit: true, canApprove: true },
  analytics: { canCreate: true, canEdit: true, canApprove: true },
  userAccess: { canCreate: true, canEdit: true, canApprove: true },
  settings: { canCreate: true, canEdit: true, canApprove: true },
  hrm: { canCreate: true, canEdit: true, canApprove: true },
  payroll: { canCreate: true, canEdit: true, canApprove: true },
  agreementsContracts: { canCreate: true, canEdit: true, canApprove: true },
  projects: { canCreate: true, canEdit: true, canApprove: true },
  inventory: { canCreate: true, canEdit: true, canApprove: true },
  subcontractors: { canCreate: true, canEdit: true, canApprove: true },
  flats: { canCreate: true, canEdit: true, canApprove: true },
  moneyIndent: { canCreate: true, canEdit: true, canApprove: true },
  "accounts.paymentVoucher": { canCreate: true, canEdit: true, canApprove: true },
  "accounts.receivedVoucher": { canCreate: true, canEdit: true, canApprove: true },
  "accounts.clientReceipts": { canCreate: true, canEdit: true, canApprove: true },
  "accounts.journal": { canCreate: true, canEdit: true, canApprove: true },
  "accounts.journalBill": { canCreate: true, canEdit: true, canApprove: true },
  "accounts.balanceSheet": { canCreate: true, canEdit: true, canApprove: true },
};

const adminMatrix: ModuleMatrix = {
  dashboard: { canCreate: true, canEdit: true },
  analytics: { canCreate: true, canEdit: true },
  userAccess: { canCreate: true, canEdit: true },
  settings: { canEdit: true },
  hrm: { canCreate: true, canEdit: true },
  payroll: { canCreate: true, canEdit: true },
  agreementsContracts: { canCreate: true, canEdit: true },
  projects: { canCreate: true, canEdit: true },
  inventory: { canCreate: true, canEdit: true },
  subcontractors: { canCreate: true, canEdit: true },
  flats: { canCreate: true, canEdit: true },
  moneyIndent: { canCreate: true, canEdit: true },
  "accounts.paymentVoucher": { canCreate: true, canEdit: true },
  "accounts.receivedVoucher": { canCreate: true, canEdit: true },
  "accounts.clientReceipts": { canCreate: true, canEdit: true },
  "accounts.journal": { canCreate: true, canEdit: true },
  "accounts.journalBill": { canCreate: true, canEdit: true },
  "accounts.balanceSheet": { canView: true },
};

const accountsOfficerMatrix: ModuleMatrix = {
  dashboard: {},
  analytics: {},
  payroll: { canView: true },
  "accounts.paymentVoucher": { canCreate: true, canEdit: true },
  "accounts.receivedVoucher": { canCreate: true, canEdit: true },
  "accounts.clientReceipts": { canCreate: true, canEdit: true },
  "accounts.journal": { canCreate: true, canEdit: true },
  "accounts.journalBill": { canCreate: true, canEdit: true },
  "accounts.balanceSheet": { canView: true, canPrint: true },
};

const hrExecutiveMatrix: ModuleMatrix = {
  dashboard: {},
  hrm: { canCreate: true, canEdit: true },
  payroll: { canView: true },
  userAccess: { canView: true },
};

const projectEngineerMatrix: ModuleMatrix = {
  dashboard: {},
  projects: { canCreate: true, canEdit: true },
  inventory: { canView: true },
  subcontractors: { canView: true },
  moneyIndent: { canCreate: true },
};

const siteSupervisorMatrix: ModuleMatrix = {
  dashboard: {},
  hrm: { canCreate: true, canEdit: true },
  projects: { canView: true },
  inventory: { canView: true },
};

const storeManagerMatrix: ModuleMatrix = {
  dashboard: {},
  inventory: { canCreate: true, canEdit: true },
  projects: { canView: true },
  subcontractors: { canView: true },
};

const MATRIX_BY_ROLE: Record<AppRole, ModuleMatrix> = {
  Proprietor: proprietorMatrix,
  Admin: adminMatrix,
  "Accounts Officer": accountsOfficerMatrix,
  "HR Executive": hrExecutiveMatrix,
  "Project Engineer": projectEngineerMatrix,
  "Site Supervisor": siteSupervisorMatrix,
  "Store Manager": storeManagerMatrix,
};

export function getModuleActions(role: AppRole, module: AppModuleKey): ModuleActions {
  const overrides = MATRIX_BY_ROLE[role]?.[module] ?? {};
  return {
    ...baseDefaults,
    ...overrides,
  };
}

export interface RoleSidebarVisibility {
  /** List of route prefixes that should be visible for this role */
  routes: string[];
}

const SIDEBAR_BY_ROLE: Record<AppRole, RoleSidebarVisibility> = {
  Proprietor: {
    routes: [
      "/dashboard",
      "/analytics",
      "/user-access",
      "/settings",
      "/hrm",
      "/payroll",
      "/agreements-contracts",
      "/projects",
      "/inventory",
      "/subcontractors",
      "/flats",
      "/money-indent",
      "/accounts",
    ],
  },
  Admin: {
    routes: [
      "/dashboard",
      "/analytics",
      "/user-access",
      "/settings",
      "/hrm",
      "/payroll",
      "/agreements-contracts",
      "/projects",
      "/inventory",
      "/subcontractors",
      "/flats",
      "/money-indent",
      "/accounts",
    ],
  },
  "Accounts Officer": {
    routes: ["/dashboard", "/analytics", "/payroll", "/accounts", "/projects"],
  },
  "HR Executive": {
    routes: ["/dashboard", "/hrm", "/payroll", "/user-access"],
  },
  "Project Engineer": {
    routes: ["/dashboard", "/projects", "/inventory", "/subcontractors", "/money-indent"],
  },
  "Site Supervisor": {
    routes: ["/dashboard", "/projects", "/hrm", "/inventory"],
  },
  "Store Manager": {
    routes: ["/dashboard", "/inventory", "/projects", "/subcontractors"],
  },
};

export function isRouteVisibleForRole(role: AppRole, href: string): boolean {
  const { routes } = SIDEBAR_BY_ROLE[role];
  return routes.some((prefix) => href === prefix || href.startsWith(`${prefix}/`));
}

export function getRoleBadgeStyle(role: AppRole): {
  color: string;
  bg: string;
  border: string;
} {
  switch (role) {
    case "Proprietor":
      return {
        color: "text-amber-900",
        bg: "bg-amber-100",
        border: "border-amber-200",
      };
    case "Admin":
      return {
        color: "text-indigo-900",
        bg: "bg-indigo-100",
        border: "border-indigo-200",
      };
    case "Accounts Officer":
      return {
        color: "text-emerald-900",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
      };
    case "HR Executive":
      return {
        color: "text-pink-900",
        bg: "bg-pink-100",
        border: "border-pink-200",
      };
    case "Project Engineer":
      return {
        color: "text-sky-900",
        bg: "bg-sky-100",
        border: "border-sky-200",
      };
    case "Site Supervisor":
      return {
        color: "text-slate-900",
        bg: "bg-slate-100",
        border: "border-slate-200",
      };
    case "Store Manager":
      return {
        color: "text-lime-900",
        bg: "bg-lime-100",
        border: "border-lime-200",
      };
    default:
      return {
        color: "text-slate-900",
        bg: "bg-slate-100",
        border: "border-slate-200",
      };
  }
}

