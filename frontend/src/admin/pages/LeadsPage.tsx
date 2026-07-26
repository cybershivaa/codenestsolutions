import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/admin/components/PageHeader";
import { DataTable, type Column } from "@/admin/components/DataTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useIsAdmin } from "@/hooks/useAuthUser";
import { Navigate } from "@tanstack/react-router";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: string;
  createdAt: string;
}

const columns: Column<LeadRow>[] = [
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
  { key: "message", header: "Message", className: "max-w-xs truncate" },
  { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  {
    key: "createdAt",
    header: "Created",
    render: (r) => new Date(r.createdAt).toLocaleDateString(),
  },
  {
    key: "actions",
    header: "",
    render: (r) => (
      <div className="flex justify-end gap-1">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <a href={`mailto:${r.email}`}>
            <Mail className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    ),
    className: "text-right",
  },
];

export function LeadsPage() {
  const { isAdmin, loading: authLoading } = useIsAdmin();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    async function loadLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;

        const mapped: LeadRow[] = data.map((l) => ({
          id: l.id,
          name: l.name,
          email: l.email,
          company: l.company || "N/A",
          message: l.message || "",
          status: l.status || "new",
          createdAt: l.created_at || new Date().toISOString(),
        }));

        setLeads(mapped);
      } catch (e: any) {
        console.error("Error loading leads:", e);
        toast.error(e?.message ?? "Failed to load leads");
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [isAdmin]);

  const exportLeads = () => {
    if (leads.length === 0) return toast.info("No leads to export");
    const headers = ["ID", "Name", "Email", "Company", "Message", "Status", "Created At"];
    const rows = leads.map((l) => [l.id, l.name, l.email, l.company, l.message, l.status, l.createdAt]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully!");
  };

  if (authLoading || (isAdmin && loading)) {
    return (
      <div className="grid h-64 place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Inbound contact requests and form submissions from your website."
        actions={
          <Button variant="outline" size="sm" onClick={exportLeads}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
        }
      />
      <DataTable
        rows={leads}
        columns={columns}
        searchKeys={["name", "email", "company", "message"]}
      />
    </div>
  );
}
