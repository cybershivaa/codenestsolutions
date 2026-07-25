import { useEffect, useState } from "react";
import { PageHeader } from "@/admin/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Camera, Save, KeyRound, Loader2 } from "lucide-react";
import { useAuthUser, useIsAdmin } from "@/hooks/useAuthUser";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ProfilePage() {
  const { user, loading } = useAuthUser();
  const { isAdmin } = useIsAdmin();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const email = user?.email ?? "";
  const initials = (displayName || email || "U")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? (user.user_metadata?.full_name as string) ?? "");
        setAvatarUrl(data?.avatar_url ?? (user.user_metadata?.avatar_url as string) ?? "");
      });
    setPhone((user.phone as string) ?? "");
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name: displayName,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  };

  const updatePassword = async () => {
    if (!pwNew || pwNew !== pwConfirm) {
      toast.error("New passwords do not match");
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pwNew });
    setPwSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Password updated");
      setPwCurrent("");
      setPwNew("");
      setPwConfirm("");
    }
  };

  if (loading || !user) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Profile" description="Your personal account information." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-xl lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-[var(--brand)]/20">
                <AvatarImage
                  src={
                    avatarUrl ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName || email)}`
                  }
                />
                <AvatarFallback>{initials || "U"}</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-[var(--brand)] text-white shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 font-display text-lg font-semibold">
              {displayName || email.split("@")[0]}
            </div>
            <div className="text-sm text-muted-foreground">{email}</div>
            <div className="mt-3 flex gap-2">
              <StatusBadge status={isAdmin ? "Admin" : "Member"} />
              <StatusBadge status="Active" />
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-xl">
            <h3 className="text-sm font-semibold">Personal Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} disabled className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Avatar URL</Label>
                <Input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="mt-1"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={saveProfile} disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}{" "}
                Save Changes
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur-xl">
            <h3 className="text-sm font-semibold">Change Password</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>Current</Label>
                <Input
                  type="password"
                  value={pwCurrent}
                  onChange={(e) => setPwCurrent(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>New</Label>
                <Input
                  type="password"
                  value={pwNew}
                  onChange={(e) => setPwNew(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Confirm</Label>
                <Input
                  type="password"
                  value={pwConfirm}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={updatePassword} disabled={pwSaving}>
                {pwSaving ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <KeyRound className="mr-1.5 h-3.5 w-3.5" />
                )}{" "}
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
