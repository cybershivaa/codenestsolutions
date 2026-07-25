import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequireClientAuth } from "@/hooks/use-client-auth";
import { useNavigate } from "@tanstack/react-router";

export function ContactCta() {
  const requireAuth = useRequireClientAuth();
  const navigate = useNavigate();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
            Have an idea? Let's build it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Book a free 30-minute call. We'll scope your project and send a written proposal within
            48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => requireAuth(() => navigate({ to: "/client/projects/new" }))}
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/portfolio">Browse our work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
