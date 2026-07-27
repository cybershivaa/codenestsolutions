import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/meetings")({
  head: () => ({
    meta: [{ title: "Meetings — Netweavesolutions Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Meetings">
      <ComingSoon label="Meetings" />
    </ClientPortalShell>
  ),
});

