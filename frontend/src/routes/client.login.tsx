import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/hooks/use-client-auth";
import { ApiError } from "@/lib/client-api";

const search = z.object({ redirect: z.string().optional() }).catch({});

export const Route = createFileRoute("/client/login")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Client Login — CodeNest Solutions" },
      {
        name: "description",
        content: "Sign in to your CodeNest client portal to manage projects, invoices and files.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login, configured, loading } = useClientAuth();
  const { redirect } = useSearch({ from: "/client/login" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: redirect || "/client", replace: true });
  }, [user, loading, navigate, redirect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password, remember);
      toast.success("Welcome back!");
      navigate({ to: redirect || "/client", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-8 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">Client Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Access your projects and invoices.</p>
        {!configured && (
          <p className="mt-3 rounded-md bg-destructive/10 p-3 text-xs text-destructive">
            Client API not configured. Set VITE_CLIENT_API_URL to your deployed API.
          </p>
        )}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/client/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={submitting || !configured}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New client?{" "}
          <Link to="/client/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
