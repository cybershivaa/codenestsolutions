import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/admin/pages/CollectionsPage";

export const Route = createFileRoute("/admin/collections")({
  component: CollectionsPage,
});
