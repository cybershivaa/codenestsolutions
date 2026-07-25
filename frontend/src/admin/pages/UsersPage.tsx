import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { adminUsers, type AdminUser } from "@/admin/data/dummy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2 } from "lucide-react";

const columns: Column<AdminUser>[] = [
  {
    key: "name",
    header: "User",
    render: (r) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.name)}`}
          />
          <AvatarFallback>{r.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-xs text-muted-foreground">{r.email}</div>
        </div>
      </div>
    ),
  },
  { key: "role", header: "Role", render: (r) => <StatusBadge status={r.role} /> },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "lastActive",
    header: "Last active",
    render: (r) => <span className="text-muted-foreground">{r.lastActive}</span>,
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

export function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Users"
        description="Admin panel access and roles."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Invite User
          </Button>
        }
      />
      <DataTable rows={adminUsers} columns={columns} searchKeys={["name", "email", "role"]} />
    </div>
  );
}
