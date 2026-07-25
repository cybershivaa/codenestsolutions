import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/messages")({
  head: () => ({
    meta: [{ title: "Messages — CodeNest Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Messages">
      <ComingSoon label="Messages" />
    </ClientPortalShell>
  ),
});
