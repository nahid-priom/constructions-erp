"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleTable } from "@/components/shared/simple-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { FilterBar } from "@/components/shared/filter-bar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InfoList } from "@/components/shared/info-list";
import { RestrictedFileBadge } from "@/components/shared/restricted-file-badge";
import { ApprovalRequiredModal } from "@/components/shared/approval-required-modal";
import { useAppState } from "@/components/state/app-provider";
import { getModuleActions } from "@/lib/rbac";

type PaymentStatus = "Paid" | "Due" | "Pending";

type PaymentVoucher = {
  id: string;
  date: string;
  projectCode: string;
  project: string;
  name: string;
  itemName: string;
  qty: number;
  unitPrice: number;
  totalCost: number;
  paymentStatus: PaymentStatus;
  restricted?: boolean;
  archived?: boolean;
};

const initialVouchers: PaymentVoucher[] = [
  {
    id: "PV-2026-0008",
    date: "2026-03-10",
    projectCode: "DU-0001",
    project: "12 Floors Commercial Building",
    name: "Rahman Foundation Works",
    itemName: "RCC footing casting (Package-03)",
    qty: 1,
    unitPrice: 1_850_000,
    totalCost: 1_850_000,
    paymentStatus: "Due",
    restricted: true,
  },
  {
    id: "PV-2026-0011",
    date: "2026-03-09",
    projectCode: "CTG-0007",
    project: "Factory Foundation Work",
    name: "Mithila Piling & Shuttering",
    itemName: "Shuttering & props rental – Feb 26",
    qty: 1,
    unitPrice: 1_245_000,
    totalCost: 1_245_000,
    paymentStatus: "Pending",
  },
  {
    id: "PV-2026-0015",
    date: "2026-03-08",
    projectCode: "GZP-0004",
    project: "10 Katha Plot Development",
    name: "Sylhet Civil Traders",
    itemName: "Earth filling & compaction – Lot 02",
    qty: 1,
    unitPrice: 890_000,
    totalCost: 890_000,
    paymentStatus: "Paid",
  },
];

type VoucherFormState = {
  id: string;
  date: string;
  projectCode: string;
  project: string;
  name: string;
  itemName: string;
  qty: number;
  unitPrice: number;
  paymentStatus: PaymentStatus;
  restricted: boolean;
};

const emptyForm: VoucherFormState = {
  id: "",
  date: new Date().toISOString().slice(0, 10),
  projectCode: "",
  project: "",
  name: "",
  itemName: "",
  qty: 1,
  unitPrice: 0,
  paymentStatus: "Pending",
  restricted: false,
};

export default function PaymentVoucherPage() {
  const { currentRole } = useAppState();
  const moduleActions = getModuleActions(
    currentRole,
    "accounts.paymentVoucher",
  );

  const [vouchers, setVouchers] = useState<PaymentVoucher[]>(initialVouchers);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">(
    "all",
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<VoucherFormState>(emptyForm);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialVouchers[0]?.id ?? null,
  );

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);

  const selectedVoucher = vouchers.find((v) => v.id === selectedId) ?? vouchers[0];

  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      if (v.archived) return false;
      const matchesSearch =
        !search ||
        v.id.toLowerCase().includes(search.toLowerCase()) ||
        v.projectCode.toLowerCase().includes(search.toLowerCase()) ||
        v.project.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase());
      const matchesProject =
        projectFilter === "all" || v.projectCode === projectFilter;
      const matchesStatus =
        statusFilter === "all" || v.paymentStatus === statusFilter;
      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [vouchers, search, projectFilter, statusFilter]);

  const totalAmount = filteredVouchers.reduce(
    (sum, v) => sum + v.totalCost,
    0,
  );
  const dueAmount = filteredVouchers
    .filter((v) => v.paymentStatus !== "Paid")
    .reduce((sum, v) => sum + v.totalCost, 0);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState(emptyForm);
    setFormOpen(true);
  };

  const handleOpenEdit = (voucher: PaymentVoucher) => {
    setEditingId(voucher.id);
    setFormState({
      id: voucher.id,
      date: voucher.date,
      projectCode: voucher.projectCode,
      project: voucher.project,
      name: voucher.name,
      itemName: voucher.itemName,
      qty: voucher.qty,
      unitPrice: voucher.unitPrice,
      paymentStatus: voucher.paymentStatus,
      restricted: !!voucher.restricted,
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    const totalCost = formState.qty * formState.unitPrice;
    if (editingId) {
      setVouchers((prev) =>
        prev.map((v) =>
          v.id === editingId
            ? {
                ...v,
                ...formState,
                totalCost,
              }
            : v,
        ),
      );
      setSelectedId(editingId);
    } else {
      const newId =
        formState.id.trim() ||
        `PV-LOCAL-${(vouchers.length + 1).toString().padStart(3, "0")}`;
      const newVoucher: PaymentVoucher = {
        ...formState,
        id: newId,
        totalCost,
      };
      setVouchers((prev) => [newVoucher, ...prev]);
      setSelectedId(newId);
    }
    setFormOpen(false);
  };

  const handleSoftDelete = (voucher: PaymentVoucher) => {
    if (!moduleActions.canEdit) {
      setApprovalModalOpen(true);
      return;
    }
    setVouchers((prev) =>
      prev.map((v) =>
        v.id === voucher.id ? { ...v, archived: true } : v,
      ),
    );
    setApprovalModalOpen(true);
  };

  const canCreateEdit = moduleActions.canCreate || moduleActions.canEdit;
  const showDeleteAsApproval = moduleActions.deleteMode === "approval";

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Payment Voucher Register"
        description="Construction site-wise payment vouchers for subcontractors, suppliers, and services."
        meta={
          <div className="flex items-center gap-2">
            {canCreateEdit && (
              <Button
                size="sm"
                className="rounded-full px-3 text-[11px]"
                onClick={handleOpenCreate}
              >
                Create voucher
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-3 text-[11px]"
            >
              Print current view
            </Button>
          </div>
        }
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Voucher Value (Filtered)"
          value={totalAmount.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Approved vouchers for disbursement"
          trend={{ label: "Within project cash flow plan", direction: "neutral" }}
        />
        <StatCard
          label="Outstanding Payables"
          value={dueAmount.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Pending release from accounts"
          trend={{ label: "To be cleared within 7 days", direction: "up" }}
        />
        <StatCard
          label="Projects Covered"
          value={`${new Set(filteredVouchers.map((v) => v.projectCode)).size} active jobs`}
          helper="Dhaka / Chattogram / Gazipur"
        />
        <StatCard
          label="Average Voucher Size"
          value={
            filteredVouchers.length > 0
              ? Math.round(totalAmount / filteredVouchers.length).toLocaleString(
                  "en-BD",
                  {
                    style: "currency",
                    currency: "BDT",
                    maximumFractionDigits: 0,
                  },
                )
              : "BDT 0"
          }
          helper="High value construction payouts"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Input
              placeholder="Search by voucher ID, project, or party"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select
              value={projectFilter}
              onValueChange={(value) => setProjectFilter(value)}
            >
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem>
                <SelectItem value="DU-0001">DU-0001</SelectItem>
                <SelectItem value="CTG-0007">CTG-0007</SelectItem>
                <SelectItem value="GZP-0004">GZP-0004</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Status</span>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as PaymentStatus | "all")
              }
            >
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Due">Due</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:min-w-0">
          <SimpleTable
            columns={[
              {
                key: "id",
                header: "Voucher",
                render: (row: PaymentVoucher) => (
                  <button
                    type="button"
                    className="flex w-full flex-col items-start text-left"
                    onClick={() => {
                      setSelectedId(row.id);
                      setDetailOpen(true);
                    }}
                  >
                    <span className="text-xs font-semibold text-slate-900">
                      {row.id}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {new Date(row.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </button>
                ),
                className: "min-w-[140px]",
              },
              {
                key: "projectCode",
                header: "Project",
                render: (row: PaymentVoucher) => (
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">
                      {row.projectCode}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {row.project}
                    </span>
                  </div>
                ),
                className: "min-w-[220px]",
              },
              {
                key: "name",
                header: "Payee",
                className: "min-w-[180px]",
              },
              {
                key: "itemName",
                header: "Item",
                className: "min-w-[240px]",
              },
              {
                key: "totalCost",
                header: "Total Cost (BDT)",
                render: (row: PaymentVoucher) =>
                  row.totalCost.toLocaleString("en-BD", {
                    maximumFractionDigits: 0,
                  }),
                className: "min-w-[150px] text-right",
              },
              {
                key: "paymentStatus",
                header: "Payment Status",
                render: (row: PaymentVoucher) => (
                  <div className="flex flex-col items-start gap-1">
                    <StatusBadge status={row.paymentStatus} />
                    {row.restricted && <RestrictedFileBadge />}
                  </div>
                ),
                className: "min-w-[150px]",
              },
            ]}
            data={filteredVouchers}
            rowKey={(row) => row.id}
          />
        </div>

        <div className="space-y-4 lg:col-span-4 lg:min-w-0">
          {selectedVoucher && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    Voucher Preview
                  </CardTitle>
                  {selectedVoucher.restricted && <RestrictedFileBadge />}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-700">
                        PAYMENT VOUCHER
                      </div>
                      <div className="text-[10px] text-slate-500">
                        ARK ENGINEERING &amp; CONSTRUCTIONS
                      </div>
                    </div>
                    <Badge variant="outline">PRINT STYLE</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <div className="text-slate-500">Voucher No</div>
                      <div className="font-semibold text-slate-900">
                        {selectedVoucher.id}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Date</div>
                      <div className="font-semibold text-slate-900">
                        {new Date(selectedVoucher.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Project</div>
                      <div className="font-semibold text-slate-900">
                        {selectedVoucher.projectCode} – {selectedVoucher.project}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Payee</div>
                      <div className="font-semibold text-slate-900">
                        {selectedVoucher.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2.5">
                    <div className="mb-2 flex text-[11px] font-semibold text-slate-600">
                      <span className="w-2/3">Narration</span>
                      <span className="w-1/3 text-right">Amount (BDT)</span>
                    </div>
                    <div className="flex items-start text-[11px]">
                      <div className="w-2/3 pr-2">
                        {selectedVoucher.itemName}
                      </div>
                      <div className="w-1/3 text-right font-semibold text-slate-900">
                        {selectedVoucher.totalCost.toLocaleString("en-BD", {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-slate-600">
                    <div>
                      <div>Prepared By</div>
                      <div className="mt-2 h-7 rounded-md border border-dashed border-slate-300" />
                    </div>
                    <div>
                      <div>Checked By</div>
                      <div className="mt-2 h-7 rounded-md border border-dashed border-slate-300" />
                    </div>
                    <div>
                      <div>Approved By</div>
                      <div className="mt-2 h-7 rounded-md border border-dashed border-slate-300" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={selectedVoucher.paymentStatus} />
                      {selectedVoucher.archived && (
                        <Badge variant="warning">Archived pending approval</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {moduleActions.canEdit && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 rounded-full px-3 text-[11px]"
                          onClick={() => handleOpenEdit(selectedVoucher)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 rounded-full px-3 text-[11px]"
                        onClick={() => setApprovalModalOpen(true)}
                      >
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Sheet open={formOpen} onOpenChange={setFormOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-sm font-semibold">
              {editingId ? "Edit Payment Voucher" : "Create Payment Voucher"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4 pt-0 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Voucher No
                </label>
                <Input
                  value={formState.id}
                  onChange={(e) =>
                    setFormState({ ...formState, id: e.target.value })
                  }
                  placeholder="Auto if left blank"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Date
                </label>
                <Input
                  type="date"
                  value={formState.date}
                  onChange={(e) =>
                    setFormState({ ...formState, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Project Code
                </label>
                <Input
                  value={formState.projectCode}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      projectCode: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="DU-0001"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Project Name
                </label>
                <Input
                  value={formState.project}
                  onChange={(e) =>
                    setFormState({ ...formState, project: e.target.value })
                  }
                  placeholder="Project description"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Payee Name
                </label>
                <Input
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Payment Status
                </label>
                <Select
                  value={formState.paymentStatus}
                  onValueChange={(value) =>
                    setFormState({
                      ...formState,
                      paymentStatus: value as PaymentStatus,
                    })
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Due">Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-slate-700">
                Item / Narration
              </label>
              <Input
                value={formState.itemName}
                onChange={(e) =>
                  setFormState({ ...formState, itemName: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={formState.qty}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      qty: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700">
                  Unit Price
                </label>
                <Input
                  type="number"
                  value={formState.unitPrice}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      unitPrice: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex flex-col justify-end">
                <div className="text-[11px] font-medium text-slate-700">
                  Total (BDT)
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {(formState.qty * formState.unitPrice).toLocaleString(
                    "en-BD",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700">
                  Restricted voucher
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 rounded-full px-2 text-[11px]"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      restricted: !prev.restricted,
                    }))
                  }
                >
                  {formState.restricted ? "Mark as standard" : "Mark as restricted"}
                </Button>
              </div>
              <p className="text-[11px] text-slate-600">
                Restricted vouchers show a lock badge and cannot be hard-deleted.
                Any delete attempt will move the record to archive and require
                proprietor approval.
              </p>
            </div>
          </div>
          <SheetFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
            >
              Save voucher
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          {selectedVoucher && (
            <>
              <SheetHeader>
                <SheetTitle className="text-sm font-semibold">
                  Voucher details
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4 pt-0 text-xs">
                <InfoList
                  columns={2}
                  items={[
                    {
                      label: "VOUCHER NO",
                      value: selectedVoucher.id,
                    },
                    {
                      label: "DATE",
                      value: new Date(selectedVoucher.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      ),
                    },
                    {
                      label: "PROJECT CODE",
                      value: selectedVoucher.projectCode,
                    },
                    {
                      label: "PROJECT",
                      value: selectedVoucher.project,
                    },
                    {
                      label: "PAYEE",
                      value: selectedVoucher.name,
                    },
                    {
                      label: "AMOUNT (BDT)",
                      value: selectedVoucher.totalCost.toLocaleString(
                        "en-BD",
                        { maximumFractionDigits: 0 },
                      ),
                    },
                  ]}
                />
                <div className="space-y-1">
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600">
                    NARRATION
                  </div>
                  <p className="text-xs text-slate-800">
                    {selectedVoucher.itemName}
                  </p>
                </div>
              </div>
              <SheetFooter>
                {showDeleteAsApproval && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-full border-amber-300 text-[11px] text-amber-800"
                    onClick={() => handleSoftDelete(selectedVoucher)}
                  >
                    Delete (approval required)
                  </Button>
                )}
                {moduleActions.canEdit && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-full px-3 text-[11px]"
                    onClick={() => handleOpenEdit(selectedVoucher)}
                  >
                    Edit voucher
                  </Button>
                )}
                <Button
                  size="sm"
                  className="h-8 rounded-full px-3 text-[11px]"
                  onClick={() => setApprovalModalOpen(true)}
                >
                  Print layout
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ApprovalRequiredModal
        open={approvalModalOpen}
        onOpenChange={setApprovalModalOpen}
      />
    </div>
  );
}

