import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  ListChecks,
  FileText,
  Receipt,
  CreditCard,
  Calendar,
  LifeBuoy,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { useClientAuth } from "@/hooks/use-client-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV: ReadonlyArray<{
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}> = [
  { to: "/client", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/client/projects", label: "My Projects", icon: FolderKanban },
  { to: "/client/projects/new", label: "Create New Project", icon: PlusCircle },
  { to: "/client/requirements", label: "My Requirements", icon: ListChecks },
  { to: "/client/files", label: "Files", icon: FileText },
  { to: "/client/invoices", label: "Invoices", icon: Receipt },
  { to: "/client/payments", label: "Payments", icon: CreditCard },
  { to: "/client/meetings", label: "Meetings", icon: Calendar },
  { to: "/client/support", label: "Support", icon: LifeBuoy },
  { to: "/client/messages", label: "Messages", icon: MessageSquare },
  { to: "/client/notifications", label: "Notifications", icon: Bell },
  { to: "/client/profile", label: "Profile", icon: User },
  { to: "/client/settings", label: "Settings", icon: Settings },
];

export function ClientPortalShell({ children, title }: { children: ReactNode; title?: string }) {
  const { user, loading, configured, logout } = useClientAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!configured) return;
    if (!user) {
      const redirect = pathname;
      navigate({ to: "/client/login", search: { redirect } as never, replace: true });
    }
  }, [user, loading, configured, navigate, pathname]);

  if (!configured) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Client Portal not configured</h1>
        <p className="mt-3 text-muted-foreground">
          Set <code className="rounded bg-muted px-1.5 py-0.5">VITE_CLIENT_API_URL</code> in the
          project's environment variables to your deployed Client API URL, then reload.
        </p>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[240px,1fr]">
      <aside className="md:sticky md:top-24 md:h-[calc(100vh-8rem)]">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-3 backdrop-blur">
          <div className="mb-3 px-3 py-2">
            <div className="truncate text-sm font-semibold">{user.fullName}</div>
            <div className="truncate text-xs text-muted-foreground">{user.email}</div>
          </div>
          <nav className="space-y-1">
            {NAV.map(({ to, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === to
                : pathname === to || pathname.startsWith(to + "/");
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
            <button
              onClick={async () => {
                await logout();
                navigate({ to: "/client/login" });
              }}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      <section>
        {title && (
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          </header>
        )}
        {children}
      </section>
    </div>
  );
}

export function ComingSoon({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-card/40 p-10 text-center">
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This module ships in Phase 2. Your Client API already has the schema for it.
      </p>
      <div className="mt-4">
        <Button asChild variant="outline" size="sm">
          <Link to="/client">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
