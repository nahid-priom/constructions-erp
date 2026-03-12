"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  useEffect,
} from "react";

import type { AppRole } from "@/lib/rbac";
import { APP_ROLES } from "@/lib/rbac";

type ThemeMode = "light" | "dark" | "system";

export type LoginMessagePreference = "enabled" | "disabled";

export interface UserProfile {
  name: string;
  officeId: string;
  designation: string;
  role: AppRole;
}

export interface NotificationSettings {
  loginMessage: LoginMessagePreference;
  paymentAlerts: "off" | "summary" | "instant";
}

export interface AppState {
  currentRole: AppRole;
  setCurrentRole: (role: AppRole) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  notifications: NotificationSettings;
  setNotifications: (settings: NotificationSettings) => void;
  showLoginBanner: boolean;
  dismissLoginBanner: () => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

const defaultUserProfile: UserProfile = {
  name: "AKHLAQUR RAHMAN",
  officeId: "AR-0001",
  designation: "PROPRIETOR",
  role: "Proprietor",
};

const defaultNotifications: NotificationSettings = {
  loginMessage: "enabled",
  paymentAlerts: "summary",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<AppRole>("Proprietor");
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [notifications, setNotifications] =
    useState<NotificationSettings>(defaultNotifications);
  const [showLoginBanner, setShowLoginBanner] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    if (theme === "system") {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.toggle("dark", isDark);
      return;
    }

    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (notifications.loginMessage === "disabled") {
      setShowLoginBanner(false);
    } else {
      setShowLoginBanner(true);
    }
  }, [notifications.loginMessage]);

  const value = useMemo<AppState>(
    () => ({
      currentRole,
      setCurrentRole,
      userProfile,
      setUserProfile,
      theme,
      setTheme,
      notifications,
      setNotifications,
      showLoginBanner,
      dismissLoginBanner: () => setShowLoginBanner(false),
    }),
    [currentRole, userProfile, theme, notifications, showLoginBanner],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return ctx;
}

export function useRoleOptions() {
  return APP_ROLES;
}

