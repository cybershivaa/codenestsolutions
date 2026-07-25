import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/admin/data/dummy";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

const columns: Column<Project>[] = [
  {
    key: "title",
    header: "Project",
    render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted-foreground">{r.client}</div>
      </div>
    ),
  },
  { key: "category", header: "Category" },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "updatedAt",
    header: "Updated",
    render: (r) => new Date(r.updatedAt).toLocaleDateString(),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: () => (
      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
];

export function PortfolioPage() {
  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Manage the case studies displayed on your public site."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Project
          </Button>
        }
      />
      <DataTable rows={projects} columns={columns} searchKeys={["title", "client", "category"]} />
    </div>
  );
}
