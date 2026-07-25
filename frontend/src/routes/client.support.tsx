import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/support")({
  head: () => ({
    meta: [{ title: "Support — CodeNest Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Support">
      <ComingSoon label="Support" />
    </ClientPortalShell>
  ),
});
