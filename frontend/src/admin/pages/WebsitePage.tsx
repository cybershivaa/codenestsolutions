import { PageHeader } from "@/admin/components/PageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { Globe, Zap, ShieldCheck, Eye, ExternalLink, Pencil } from "lucide-react";
import { AnimatedCounter } from "@/admin/hooks/useAnimatedNumber";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/admin/components/StatusBadge";

const pages = [
  { name: "Home", path: "/", views: 42120, status: "Published" },
  { name: "About", path: "/about", views: 12401, status: "Published" },
  { name: "Services", path: "/services", views: 28941, status: "Published" },
  { name: "Portfolio", path: "/portfolio", views: 19822, status: "Published" },
  { name: "Pricing", path: "/pricing", views: 11933, status: "Published" },
  { name: "Blog", path: "/blog", views: 15644, status: "Published" },
  { name: "Contact", path: "/contact", views: 8221, status: "Published" },
  { name: "Careers", path: "/careers", views: 6110, status: "Published" },
];

export function WebsitePage() {
  return (
    <div>
      <PageHeader title="Website" description="Manage the public-facing pages of Netweavesolutions.com." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          gradient
          label="Total Pages"
          icon={<Globe className="h-5 w-5" />}
          value={<AnimatedCounter value={pages.length} />}
        />
        <StatCard
          label="Performance"
          delta={3}
          icon={<Zap className="h-5 w-5" />}
          value={<AnimatedCounter value={98} suffix="/100" />}
        />
        <StatCard
          label="Uptime"
          delta={0}
          icon={<ShieldCheck className="h-5 w-5" />}
          value={"99.99%"}
        />
        <StatCard
          label="Monthly Views"
          delta={12}
          icon={<Eye className="h-5 w-5" />}
          value={<AnimatedCounter value={145201} />}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-xl">
        <div className="border-b border-border/60 p-4">
          <div className="text-sm font-semibold">Pages</div>
          <div className="text-xs text-muted-foreground">Every route on the public site.</div>
        </div>
        <ul className="divide-y divide-border/60">
          {pages.map((p) => (
            <li key={p.path} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.path}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {p.views.toLocaleString()} views
                </span>
                <StatusBadge status={p.status} />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

