import { PageHeader } from "@/admin/components/PageHeader";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { team } from "@/admin/data/dummy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Plus, Pencil } from "lucide-react";

export function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        description="People behind CodeNest."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Invite Member
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.map((m) => (
          <div
            key={m.id}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-[var(--brand)]/20">
                <AvatarImage src={m.avatar} />
                <AvatarFallback>
                  {m.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{m.name}</div>
                <div className="truncate text-xs text-muted-foreground">{m.role}</div>
              </div>
              <StatusBadge status={m.status} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
              <a
                href={`mailto:${m.email}`}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5" /> {m.email}
              </a>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
