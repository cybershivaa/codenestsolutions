import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/files")({
  head: () => ({
    meta: [{ title: "Files — Netweavesolutions Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Files">
      <ComingSoon label="Files" />
    </ClientPortalShell>
  ),
});

