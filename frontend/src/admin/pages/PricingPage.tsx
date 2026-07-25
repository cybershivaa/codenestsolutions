import { PageHeader } from "@/admin/components/PageHeader";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { plans } from "@/admin/data/dummy";
import { Check, Pencil, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingPage() {
  return (
    <div>
      <PageHeader
        title="Pricing"
        description="Manage packages, tiers and public pricing."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Plan
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-lg",
              p.featured &&
                "border-[var(--brand)]/40 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--brand)_45%,transparent)]",
            )}
          >
            {p.featured && (
              <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] px-2 py-0.5 text-[10px] font-semibold text-white">
                <Star className="h-3 w-3" /> POPULAR
              </div>
            )}
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {p.name}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <div className="font-display text-4xl font-semibold">{p.price}</div>
              <div className="text-xs text-muted-foreground">/ {p.interval}</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {["Priority support", "Unlimited revisions", "Dedicated PM", "SLA & security"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <StatusBadge status={p.active ? "Published" : "Draft"} />
              <Button variant="outline" size="sm">
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
