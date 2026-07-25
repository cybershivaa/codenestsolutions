import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const search = z
  .object({
    token: z.string().optional(),
    token_hash: z.string().optional(),
    type: z.string().optional(),
  })
  .catch({});

export const Route = createFileRoute("/client/verify-email")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Verify Email — CodeNest Solutions" },
      { name: "description", content: "Confirm your CodeNest client account email address." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { token, token_hash, type } = useSearch({ from: "/client/verify-email" });
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const targetToken = token_hash || token;

    if (!targetToken) {
      // Check if user is already authenticated
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setState("ok");
        } else {
          setState("err");
          setMsg("Missing verification token");
        }
      });
      return;
    }

    const otpType = (type || "signup") as
      "signup" | "invite" | "magiclink" | "recovery" | "email_change" | "email";
    supabase.auth
      .verifyOtp({
        token_hash: targetToken,
        type: otpType,
      })
      .then(({ error }) => {
        if (error) {
          setState("err");
          setMsg(error.message);
        } else {
          setState("ok");
        }
      })
      .catch((e: unknown) => {
        setState("err");
        setMsg(e instanceof Error ? e.message : "Verification failed");
      });
  }, [token, token_hash, type]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      {state === "loading" && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
      {state === "ok" && (
        <>
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <h1 className="mt-4 text-xl font-semibold">Email verified</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your account is now active.</p>
          <Link to="/client/login" className="mt-6 text-primary hover:underline">
            Continue to sign in
          </Link>
        </>
      )}
      {state === "err" && (
        <>
          <XCircle className="h-10 w-10 text-destructive" />
          <h1 className="mt-4 text-xl font-semibold">Verification failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">{msg}</p>
          <Link to="/client/login" className="mt-6 text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      )}
    </div>
  );
}
