import { PageHeader } from "@/admin/components/PageHeader";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/admin/data/dummy";
import { Check, Plus, Star, Trash2 } from "lucide-react";

export function TestimonialsPage() {
  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Approve and manage client testimonials shown on the site."
        actions={
          <Button
            size="sm"
            className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Testimonial
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <StatusBadge status={t.approved ? "Published" : "Draft"} />
              <div className="flex text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground/90">"{t.quote}"</p>
            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.company}</div>
              </div>
              <div className="flex gap-1">
                {!t.approved && (
                  <Button variant="outline" size="sm">
                    <Check className="mr-1 h-3.5 w-3.5" /> Approve
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
