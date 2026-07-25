import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/invoices")({
  head: () => ({
    meta: [{ title: "Invoices — CodeNest Client Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <ClientPortalShell title="Invoices">
      <ComingSoon label="Invoices" />
    </ClientPortalShell>
  ),
});
