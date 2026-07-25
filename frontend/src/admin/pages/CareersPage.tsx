import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { jobs, type Job } from "@/admin/data/dummy";
import { Plus, Users, Pencil } from "lucide-react";

const columns: Column<Job>[] = [
  {
    key: "title",
    header: "Role",
    render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted-foreground">
          {r.department} · {r.location}
        </div>
      </div>
    ),
  },
  { key: "type", header: "Type" },
  {
    key: "applicants",
    header: "Applicants",
    render: (r) => (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Users className="h-3.5 w-3.5" /> {r.applicants}
      </span>
    ),
  },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    ),
  },
];

export function CareersPage() {
  return (
    <div>
      <PageHeader
        title="Careers"
        description="Open roles and applicants."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Opening
          </Button>
        }
      />
      <DataTable rows={jobs} columns={columns} searchKeys={["title", "department", "location"]} />
    </div>
  );
}
