import { createFileRoute } from "@tanstack/react-router";
import { ClientPortalShell, ComingSoon } from "@/components/client/client-portal-shell";

export const Route = createFileRoute("/client/projects/new")({
  head: () => ({
    meta: [
      { title: "Create New Project — Netweavesolutions Client Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ClientPortalShell title="Create New Project">
      <ComingSoon label="Project intake" />
    </ClientPortalShell>
  ),
});

