import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/hooks/use-client-auth";
import { ApiError } from "@/lib/client-api";

export const Route = createFileRoute("/client/register")({
  head: () => ({
    meta: [
      { title: "Create your Client Account — CodeNest Solutions" },
      {
        name: "description",
        content:
          "Register a CodeNest client account to request quotes, start projects, and track delivery.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register: registerFn, configured } = useClientAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    acceptTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptTerms) return toast.error("Please accept the terms");
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");
    setSubmitting(true);
    try {
      const res = await registerFn({ ...form, acceptTerms: true });
      toast.success(res.message || "Account created — check your email to verify.");
      navigate({ to: "/client/login" });
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="rounded-2xl border border-border/60 bg-card/70 p-8 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight">Create your client account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Then you can request quotes, start projects and track delivery.
        </p>
        {!configured && (
          <p className="mt-3 rounded-md bg-destructive/10 p-3 text-xs text-destructive">
            Client API not configured. Set VITE_CLIENT_API_URL to your deployed API.
          </p>
        )}
        <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <div className="sm:col-span-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="companyName">Company</Label>
            <Input
              id="companyName"
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="referralCode">Referral code (optional)</Label>
            <Input
              id="referralCode"
              value={form.referralCode}
              onChange={(e) => set("referralCode", e.target.value)}
            />
          </div>
          <label className="sm:col-span-2 flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.acceptTerms}
              onChange={(e) => set("acceptTerms", e.target.checked)}
            />
            <span>I accept the Terms of Service and Privacy Policy.</span>
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full" disabled={submitting || !configured}>
              {submitting ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/client/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
