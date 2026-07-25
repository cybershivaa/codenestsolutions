import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { services, type Service } from "@/admin/data/dummy";
import { Plus, Pencil, Trash2 } from "lucide-react";

const columns: Column<Service>[] = [
  { key: "name", header: "Service", render: (r) => <div className="font-medium">{r.name}</div> },
  { key: "category", header: "Category" },
  { key: "price", header: "Price" },
  { key: "active", header: "Active", render: (r) => <Switch defaultChecked={r.active} /> },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.active ? "Published" : "Draft"} />,
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: () => (
      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
];

export function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Services"
        description="Offerings and packages showcased on your public site."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Service
          </Button>
        }
      />
      <DataTable rows={services} columns={columns} searchKeys={["name", "category"]} />
    </div>
  );
}
