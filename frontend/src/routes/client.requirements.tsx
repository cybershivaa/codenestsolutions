import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";
export const Route = createFileRoute("/client/requirements")({
  head: () => ({
    meta: [
      { title: "My Requirements — CodeNest Client Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ClientPortalShell title="My Requirements">
      <ComingSoon label="Requirements" />
    </ClientPortalShell>
  ),
});
