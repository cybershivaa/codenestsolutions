import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";

export const Route = createFileRoute("/client/projects")({
  head: () => ({
    meta: [
      { title: "My Projects — CodeNest Client Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ClientPortalShell title="My Projects">
      <ComingSoon label="Projects module" />
    </ClientPortalShell>
  ),
});
