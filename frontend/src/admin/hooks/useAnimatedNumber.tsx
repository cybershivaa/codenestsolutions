import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (startedAt.current === null) startedAt.current = t;
      const progress = Math.min(1, (t - startedAt.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const n = useAnimatedNumber(value);
  return (
    <span>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}
