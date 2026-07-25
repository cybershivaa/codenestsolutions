import { motion } from "motion/react";

const logos = [
  "NORTHWIND",
  "LUMEN",
  "VERTEX",
  "BRIGHT",
  "KITE & CO.",
  "ATLAS",
  "OASIS",
  "MERIDIAN",
];

export function TrustedBy() {
  return (
    <section className="py-14 border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by teams shipping the future
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {logos.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center font-display font-bold text-sm text-muted-foreground/70 tracking-tight"
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
