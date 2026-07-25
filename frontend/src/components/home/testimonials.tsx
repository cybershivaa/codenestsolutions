import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { Section } from "@/components/section";

export function TestimonialsSlider() {
  const testimonials = useCollection<any>("testimonials");
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <Section eyebrow="Kind words" title={<>What our partners tell others.</>} center>
      <div className="relative mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative text-center"
          >
            <Quote className="mx-auto h-6 w-6 text-muted-foreground/50" />
            <p className="mt-6 text-2xl md:text-3xl font-display font-medium leading-snug tracking-[-0.015em] text-foreground">
              "{t.quote}"
            </p>
            <footer className="mt-8 flex items-center justify-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-foreground text-sm font-semibold">
                {t.avatar}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">
                  {t.role}, {t.company}
                </div>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-foreground" : "w-4 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
