import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderKanban,
  Receipt,
  CreditCard,
  LifeBuoy,
  FileText,
  MessageSquare,
  Calendar,
  Bell,
  PlusCircle,
  Activity,
} from "lucide-react";
import { ClientPortalShell } from "@/components/client/client-portal-shell";
import { useClientAuth } from "@/hooks/use-client-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/client/")({
  head: () => ({
    meta: [
      { title: "Client Dashboard — CodeNest Solutions" },
      {
        name: "description",
        content: "Manage your projects, invoices, meetings, and messages with CodeNest.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientDashboard,
});

function StatCard({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: typeof FolderKanban;
  label: string;
  value: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur transition hover:border-primary/50 hover:bg-card/80"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold">{value}</div>
        </div>
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
      </div>
    </Link>
  );
}

function ClientDashboard() {
  const { user } = useClientAuth();
  return (
    <ClientPortalShell>
      <div className="mb-8 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/60 to-card/40 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user?.fullName?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start a new project, review invoices, or chat with your delivery team — everything's here.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to="/client/projects/new">
              <PlusCircle className="mr-1.5 h-4 w-4" />
              Start New Project
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/client/messages">Message Team</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={FolderKanban} label="Active Projects" value="0" to="/client/projects" />
        <StatCard icon={Receipt} label="Open Invoices" value="0" to="/client/invoices" />
        <StatCard icon={CreditCard} label="Payments" value="₹0" to="/client/payments" />
        <StatCard icon={LifeBuoy} label="Support Tickets" value="0" to="/client/support" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4" /> Recent Activity
          </div>
          <p className="text-sm text-muted-foreground">Your project updates will appear here.</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Bell className="h-4 w-4" /> Notifications
          </div>
          <p className="text-sm text-muted-foreground">You're all caught up.</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <MessageSquare className="h-4 w-4" /> Messages
          </div>
          <p className="text-sm text-muted-foreground">No new messages.</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Calendar className="h-4 w-4" /> Upcoming Meetings
          </div>
          <p className="text-sm text-muted-foreground">Nothing scheduled.</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-5 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <FileText className="h-4 w-4" /> Files
          </div>
          <p className="text-sm text-muted-foreground">
            Deliverables and shared documents will appear here.
          </p>
        </div>
      </div>
    </ClientPortalShell>
  );
}
