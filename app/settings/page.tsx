 "use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppState } from "@/components/state/app-provider";
import { getRoleBadgeStyle } from "@/lib/rbac";

export default function SettingsPage() {
  const { userProfile, setUserProfile, theme, setTheme, notifications, setNotifications } =
    useAppState();

  const roleStyle = getRoleBadgeStyle(userProfile.role);

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="System Settings"
        description="Manage administrator profile, appearance, notifications, and core system preferences."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader className="border-b border-border/80 pb-3">
            <CardTitle className="text-sm font-semibold">
              Configuration Center
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Admin Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="system">System Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Full Name
                      </label>
                      <Input
                        value={userProfile.name}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Designation
                      </label>
                      <Input
                        value={userProfile.designation}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            designation: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Official Email
                      </label>
                      <Input defaultValue="ark.operations@arkconstructions.com" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Mobile Number
                      </label>
                      <Input defaultValue="017 1117 8167" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Company Name
                      </label>
                      <Input value="ARK ENGINEERING & CONSTRUCTIONS" readOnly />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Office Address
                      </label>
                      <Textarea
                        rows={3}
                        value="8/T, MIDDLE NANDIPARA, KHILGAON, DHAKA-1219"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Finance Year
                      </label>
                      <Select defaultValue="2025-26">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-25">2024–25</SelectItem>
                          <SelectItem value="2025-26">2025–26</SelectItem>
                          <SelectItem value="2026-27">2026–27</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
                  <Button size="sm">Save Profile</Button>
                  <span>
                    Session profile is used on printable headers and approval
                    sections.
                  </span>
                </div>
              </TabsContent>

              <TabsContent value="password" className="mt-5">
                <div className="max-w-xl space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700">
                      Current Password
                    </label>
                    <Input type="password" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        New Password
                      </label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Confirm New Password
                      </label>
                      <Input type="password" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    This interface represents the password policy only. In this
                    offline ERP preview, no real authentication changes are
                    processed.
                  </p>
                  <Button size="sm">Update Password</Button>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="mt-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Theme Mode
                      </label>
                      <Select
                        value={theme}
                        onValueChange={(value) =>
                          setTheme(value as typeof theme)
                        }
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Choose theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="mt-1 text-xs text-slate-500">
                        Choose how the ERP aligns with your system or personal
                        preference.
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Density
                      </label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comfortable">
                            Comfortable
                          </SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs">
                    <div className="font-semibold text-slate-800">
                      Live Preview
                    </div>
                    <p className="text-slate-600">
                      Appearance preferences update how dashboards, tables, and
                      forms are rendered across the system. Light mode keeps a
                      bright, modern layout; dark mode suits late-night site
                      reviews.
                    </p>
                    <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-soft">
                      <div className="mb-2 h-2 w-24 rounded-full bg-slate-200" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded-xl bg-slate-100" />
                        <div className="h-8 rounded-xl bg-slate-100" />
                        <div className="h-8 rounded-xl bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-medium text-slate-800">
                            Login Alerts
                          </div>
                          <p className="text-xs text-slate-500">
                            Show a welcome confirmation banner after successful
                            login.
                          </p>
                        </div>
                        <Select
                          value={notifications.loginMessage}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              loginMessage: value as typeof notifications.loginMessage,
                            })
                          }
                        >
                          <SelectTrigger className="h-8 w-28 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-medium text-slate-800">
                            Payment Messages
                          </div>
                          <p className="text-xs text-slate-500">
                            Control notifications when large payments or
                            receipts are recorded.
                          </p>
                        </div>
                        <Select
                          value={notifications.paymentAlerts}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              paymentAlerts: value as typeof notifications.paymentAlerts,
                            })
                          }
                        >
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="summary">
                              Daily summary
                            </SelectItem>
                            <SelectItem value="instant">
                              Instant alerts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs">
                    <div className="font-semibold text-slate-800">
                      Notification Channels
                    </div>
                    <p className="text-slate-600">
                      This ERP preview focuses on on-screen notifications only.
                      Email and SMS configuration is documented here for
                      implementation reference.
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Email</span>
                        <Select defaultValue="primary">
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">
                              Primary only
                            </SelectItem>
                            <SelectItem value="all">All admins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">SMS</span>
                        <Select defaultValue="critical">
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="critical">
                              Critical only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="system" className="mt-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Default Currency
                      </label>
                      <Select defaultValue="BDT">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BDT">
                            BDT – Bangladeshi Taka
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Working Days
                      </label>
                      <Select defaultValue="sun-thu">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sun-thu">
                            Sunday to Thursday
                          </SelectItem>
                          <SelectItem value="mon-fri">
                            Monday to Friday
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Default Time Zone
                      </label>
                      <Select defaultValue="asia-dhaka">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-dhaka">
                            Asia/Dhaka (GMT+6) – Bangladesh
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Project Code Pattern
                      </label>
                      <Input defaultValue="Region-Number (e.g. DU-0001)" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700">
                        Auto Numbering Prefix
                      </label>
                      <Input defaultValue="FY26-" />
                    </div>
                    <p className="text-xs text-slate-500">
                      These rules are used while creating new projects,
                      vouchers, and HR records to keep the ERP consistent.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
                  <Button size="sm">Save System Settings</Button>
                  <span>
                    Configuration changes remain local to this browser session
                    for presentation purposes.
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Session Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Signed in as</span>
                <span className="font-semibold text-slate-900">
                  {userProfile.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Role</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${roleStyle.bg} ${roleStyle.color} ${roleStyle.border}`}
                >
                  {userProfile.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Company</span>
                <span className="font-semibold text-slate-900">
                  ARK ENGINEERING &amp; CONSTRUCTIONS
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Restricted File Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600">
              <p>
                Sensitive vouchers, journals, and selected contracts are marked
                as <span className="font-semibold">RESTRICTED FILE</span> in
                the ERP. Download and delete actions are visually locked for
                non-proprietor roles.
              </p>
              <p>
                Any delete option in these modules will open an{" "}
                <span className="font-semibold">Approval Required</span> dialog
                or remain disabled with a tooltip indicating proprietor
                approval.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

