import type React from "react";
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  UsersRound,
  BadgeDollarSign,
  FileSignature,
  FolderKanban,
  Package,
  HardHat,
  Building2,
  ReceiptText,
  Settings2,
} from "lucide-react";

export type SidebarMatchMode = "exact" | "startsWith";

export type SidebarItemBase = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badgeCount?: number;
  match?: SidebarMatchMode;
  roles?: string[];
};

export type SidebarChildItem = SidebarItemBase & {
  href: string;
};

export type SidebarParentItem = SidebarItemBase & {
  children: SidebarChildItem[];
};

export type SidebarItem = SidebarChildItem | SidebarParentItem;

export type SidebarSection = {
  id: string;
  title: string;
  items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    id: "overview",
    title: "OVERVIEW",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        match: "startsWith",
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        match: "startsWith",
      },
      {
        id: "user-access",
        label: "User Access",
        href: "/user-access",
        icon: ShieldCheck,
        match: "startsWith",
      },
    ],
  },
  {
    id: "operations",
    title: "OPERATIONS",
    items: [
      {
        id: "hrm",
        label: "HRM",
        icon: UsersRound,
        children: [
          {
            id: "hrm-departments",
            label: "Departments",
            href: "/hrm/departments",
          },
          {
            id: "hrm-designations",
            label: "Designations",
            href: "/hrm/designations",
          },
          {
            id: "hrm-employees",
            label: "Employees",
            href: "/hrm/employees",
          },
          {
            id: "hrm-employee-id-cards",
            label: "Employee ID Cards",
            href: "/hrm/employee-id-cards",
          },
          {
            id: "hrm-holidays",
            label: "Holidays",
            href: "/hrm/holidays",
          },
          {
            id: "hrm-leave-types",
            label: "Leave Types",
            href: "/hrm/leave-types",
          },
          {
            id: "hrm-leave-status",
            label: "Leave Status",
            href: "/hrm/leave-status",
          },
          {
            id: "hrm-shifts",
            label: "Shifts",
            href: "/hrm/shifts",
          },
          {
            id: "hrm-employee-movement",
            label: "Employee Movement",
            href: "/hrm/employee-movement",
          },
          {
            id: "hrm-attendance-sheet",
            label: "Attendance Sheet",
            href: "/hrm/attendance-sheet",
          },
          {
            id: "hrm-attendance-summary",
            label: "Attendance Summary",
            href: "/hrm/attendance-summary",
          },
          {
            id: "hrm-manpower-attendance",
            label: "Manpower Attendance",
            href: "/hrm/manpower-attendance",
          },
        ],
      },
      {
        id: "payroll",
        label: "Payroll",
        icon: BadgeDollarSign,
        children: [
          {
            id: "payroll-salary",
            label: "Salary",
            href: "/payroll/salary",
          },
          {
            id: "payroll-sheet",
            label: "Payroll Sheet",
            href: "/payroll/payroll-sheet",
          },
          {
            id: "payroll-client-details",
            label: "Client Details",
            href: "/payroll/client-details",
          },
        ],
      },
      {
        id: "agreements-contracts",
        label: "Agreements & Contracts",
        href: "/agreements-contracts",
        icon: FileSignature,
        match: "startsWith",
      },
      {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
        children: [
          {
            id: "projects-all",
            label: "All Projects",
            href: "/projects/all-projects",
          },
          {
            id: "projects-information",
            label: "Project Information",
            href: "/projects/project-information",
          },
          {
            id: "projects-codes",
            label: "Project Codes",
            href: "/projects/project-codes",
          },
          {
            id: "projects-types",
            label: "Project Types",
            href: "/projects/project-types",
          },
          {
            id: "projects-statuses",
            label: "Project Statuses",
            href: "/projects/project-statuses",
          },
          {
            id: "projects-daily-progress",
            label: "Daily Progress",
            href: "/projects/daily-progress",
          },
          {
            id: "projects-implementation-plan",
            label: "Implementation Plan",
            href: "/projects/implementation-plan",
          },
        ],
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: Package,
        children: [
          {
            id: "inventory-store-list",
            label: "Store List",
            href: "/inventory/store-list",
          },
        ],
      },
      {
        id: "subcontractors",
        label: "Sub-Contractors",
        icon: HardHat,
        children: [
          {
            id: "subcontractors-information",
            label: "Information",
            href: "/subcontractors/information",
          },
          {
            id: "subcontractors-summary",
            label: "Summary",
            href: "/subcontractors/summary",
          },
          {
            id: "subcontractors-contractor-bill",
            label: "Contractor Bill",
            href: "/subcontractors/contractor-bill",
          },
          {
            id: "subcontractors-footing-bill",
            label: "Footing Bill",
            href: "/subcontractors/footing-bill",
          },
          {
            id: "subcontractors-unit-rate",
            label: "Unit Rate",
            href: "/subcontractors/unit-rate",
          },
          {
            id: "subcontractors-daily-expense",
            label: "Daily Expense",
            href: "/subcontractors/daily-expense",
          },
        ],
      },
      {
        id: "flats",
        label: "Flats",
        icon: Building2,
        children: [
          {
            id: "flats-settings",
            label: "Settings",
            href: "/flats/settings",
          },
          {
            id: "flats-sales",
            label: "Sales",
            href: "/flats/sales",
          },
        ],
      },
      {
        id: "money-indent",
        label: "Money Indent",
        icon: ReceiptText,
        children: [
          {
            id: "money-indent-settings",
            label: "Settings",
            href: "/money-indent/settings",
          },
        ],
      },
    ],
  },
  {
    id: "finance",
    title: "FINANCE",
    items: [
      {
        id: "accounts",
        label: "Accounts",
        icon: ReceiptText,
        children: [
          {
            id: "accounts-payment-voucher",
            label: "Payment Voucher",
            href: "/accounts/payment-voucher",
          },
          {
            id: "accounts-received-voucher",
            label: "Received Voucher",
            href: "/accounts/received-voucher",
          },
          {
            id: "accounts-client-receipts",
            label: "Client Receipts",
            href: "/accounts/client-receipts",
          },
          {
            id: "accounts-journal",
            label: "Journal",
            href: "/accounts/journal",
          },
          {
            id: "accounts-journal-bill",
            label: "Journal & Bill",
            href: "/accounts/journal-bill",
          },
          {
            id: "accounts-balance-sheet",
            label: "Balance Sheet",
            href: "/accounts/balance-sheet",
          },
        ],
      },
    ],
  },
  {
    id: "system",
    title: "SYSTEM",
    items: [
      {
        id: "system-settings",
        label: "Settings",
        href: "/settings",
        icon: Settings2,
        match: "startsWith",
      },
    ],
  },
];

