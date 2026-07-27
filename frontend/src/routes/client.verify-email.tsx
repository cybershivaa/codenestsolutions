import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/client/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify Email — Netweavesolutions" },
      { name: "description", content: "Your Netweavesolutions client account is ready to use." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [state, setState] = useState<"loading" | "ok">("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => setState("ok"), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      {state === "loading" ? (
        <p className="text-sm text-muted-foreground">Preparing your account…</p>
      ) : (
        <>
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <h1 className="mt-4 text-xl font-semibold">Account ready</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your Netweavesolutions client account is ready to use. Please sign in to continue.
          </p>
          <Link to="/client/login" className="mt-6 text-primary hover:underline">
            Continue to sign in
          </Link>
        </>
      )}
    </div>
  );
}

