"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";

interface ApprovalRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
}

export function ApprovalRequiredModal({
  open,
  onOpenChange,
  title = "Approval Required",
  description = "This action cannot directly delete or modify the record. Please route the request for proprietor approval.",
  children,
}: ApprovalRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border border-amber-200 bg-white shadow-xl">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-sm font-semibold tracking-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-xs text-slate-600">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 pt-1 text-xs text-slate-600">
          <p>
            In ARK ENGINEERING &amp; CONSTRUCTIONS, sensitive vouchers and
            journals follow a maker-checker workflow. Deletions are kept in{" "}
            <span className="font-semibold">ARCHIVE</span> status until
            proprietor approval.
          </p>
          {children}
          <div className="pt-1">
            <Badge variant="warning">UI ONLY – NO LIVE DELETION</Badge>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Route for Approval
          </Button>
        </DialogFooter>

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

