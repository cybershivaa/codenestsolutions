import { cn } from "@/lib/utils";

const logoSrc = new URL("../assets/netweavesolutions-logo.svg", import.meta.url).href;

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="Netweavesolutions logo"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    />
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

