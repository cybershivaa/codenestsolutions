import { createFileRoute } from "@tanstack/react-router";
import { CMSPage } from "@/admin/pages/CMSPage";

export const Route = createFileRoute("/admin/cms")({
  head: () => ({
    meta: [{ title: "CMS — Content Management" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: CMSPage,
});
