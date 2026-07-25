import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/payments")({
  head: () => ({
    meta: [{ title: "Payments — CodeNest Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Payments">
      <ComingSoon label="Payments" />
    </ClientPortalShell>
  ),
});
