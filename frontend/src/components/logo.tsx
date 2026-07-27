import { cn } from "@/lib/utils";

/**
 * Netweavesolutions wordmark.
 * Minimal geometric mark + typography.
 * Uses currentColor so it inherits foreground; the mark uses primary.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-7", className)}
      aria-hidden
    >
      <rect x="2" y="2" width="28" height="28" rx="8" className="fill-foreground" />
      <path
        d="M11 12.5 8 16l3 3.5M21 12.5 24 16l-3 3.5M18.2 10.5l-4.4 11"
        stroke="var(--background)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
  wordmark = "Netweavesolutions",
}: {
  className?: string;
  showWordmark?: boolean;
  wordmark?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      {showWordmark && (
        <span className="font-display font-semibold text-[15px] tracking-tight text-foreground">
          {wordmark}
        </span>
      )}
    </span>
  );
}

