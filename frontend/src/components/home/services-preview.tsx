import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { Section } from "@/components/section";
import { ArrowUpRight } from "lucide-react";

export function ServicesPreview() {
  const services = useCollection<any>("services");
  return (
    <Section
      eyebrow="What we do"
      title={<>End-to-end product engineering, under one roof.</>}
      subtitle="From first sketch to production traffic — design, build and grow with a team that treats your product like theirs."
    >
      <div className="grid gap-px bg-border rounded-2xl overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon =
            (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
              s.icon
            ] ?? Icons.Sparkles;
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-card"
            >
              <Link
                to="/services"
                hash={s.slug}
                className="group relative block h-full p-8 transition-colors hover:bg-accent/40"
              >
                <Icon className="h-6 w-6 text-foreground" />
                <h3 className="mt-6 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
