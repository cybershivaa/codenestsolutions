import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Netweavesolutions Client Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ClientPortalShell title="Notifications">
      <ComingSoon label="Notifications" />
    </ClientPortalShell>
  ),
});

