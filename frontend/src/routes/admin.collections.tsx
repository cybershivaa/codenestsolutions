import { createFileRoute } from "@tanstack/react-router";
import { CollectionsPage } from "@/admin/pages/CollectionsPage";
import { z } from "zod";

const searchSchema = z.object({
  tab: z.string().optional(),
}).catch({});

export const Route = createFileRoute("/admin/collections")({
  validateSearch: searchSchema,
  component: CollectionsPage,
});
