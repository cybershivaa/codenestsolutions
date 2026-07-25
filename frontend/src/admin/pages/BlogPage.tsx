import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { blogPosts, type BlogPost } from "@/admin/data/dummy";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

const columns: Column<BlogPost>[] = [
  {
    key: "title",
    header: "Post",
    render: (r) => (
      <div>
        <div className="font-medium">{r.title}</div>
        <div className="text-xs text-muted-foreground">by {r.author}</div>
      </div>
    ),
  },
  { key: "category", header: "Category" },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "views",
    header: "Views",
    render: (r) => (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Eye className="h-3.5 w-3.5" /> {r.views.toLocaleString()}
      </span>
    ),
  },
  {
    key: "publishedAt",
    header: "Date",
    render: (r) => new Date(r.publishedAt).toLocaleDateString(),
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

export function BlogPage() {
  return (
    <div>
      <PageHeader
        title="Blog"
        description="Author, review and publish blog articles."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Post
          </Button>
        }
      />
      <DataTable rows={blogPosts} columns={columns} searchKeys={["title", "author", "category"]} />
    </div>
  );
}
