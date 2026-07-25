import { motion } from "motion/react";
import { Code2 } from "lucide-react";

const stacks = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Flutter",
  "React Native",
  "Express API",
  "PostgreSQL",
  "Gemini AI",
];

export function TechStackBadges() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/40 backdrop-blur-xl px-6 py-10 md:px-12 md:py-12 shadow-glow">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--primary) 35%, transparent), transparent 40%)",
              WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          <p className="relative text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Engineered using modern tech stacks for world-class teams
          </p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            {stacks.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/60 backdrop-blur px-4 py-2 text-sm font-medium text-foreground/90 hover:border-primary hover:text-primary hover:shadow-glow hover:-translate-y-0.5 transition-all cursor-default"
              >
                <Code2 className="h-3.5 w-3.5 text-primary/80 group-hover:text-primary" />
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
