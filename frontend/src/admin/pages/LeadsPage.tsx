import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { leads, type Lead } from "@/admin/data/dummy";
import { Download, Plus, Mail } from "lucide-react";

const columns: Column<Lead>[] = [
  { key: "id", header: "ID", className: "font-mono text-xs text-muted-foreground" },
  {
    key: "name",
    header: "Contact",
    render: (r) => (
      <div>
        <div className="font-medium">{r.name}</div>
        <div className="text-xs text-muted-foreground">{r.email}</div>
      </div>
    ),
  },
  { key: "company", header: "Company" },
  { key: "service", header: "Service" },
  { key: "budget", header: "Budget" },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "createdAt",
    header: "Created",
    render: (r) => new Date(r.createdAt).toLocaleDateString(),
  },
  {
    key: "actions",
    header: "",
    render: () => (
      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Mail className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
    className: "text-right",
  },
];

export function LeadsPage() {
  return (
    <div>
      <PageHeader
        title="Leads"
        description="Inbound enquiries from your website and campaigns."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> New Lead
            </Button>
          </>
        }
      />
      <DataTable
        rows={leads}
        columns={columns}
        searchKeys={["name", "email", "company", "service"]}
      />
    </div>
  );
}
