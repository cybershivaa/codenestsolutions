import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ClientPortalShell } from "@/components/client/client-portal-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientAuth } from "@/hooks/use-client-auth";

export const Route = createFileRoute("/client/settings")({
  head: () => ({
    meta: [{ title: "Settings — Netweavesolutions Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { changePassword } = useClientAuth();
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNext] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success("Password updated");
      setCurrent("");
      setNext("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ClientPortalShell title="Settings">
      <form
        onSubmit={onSubmit}
        className="max-w-md rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4"
      >
        <h2 className="font-semibold">Change password</h2>
        <div>
          <Label htmlFor="cp">Current password</Label>
          <Input
            id="cp"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="np">New password</Label>
          <Input
            id="np"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNext(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Update password"}
        </Button>
      </form>
    </ClientPortalShell>
  );
}

