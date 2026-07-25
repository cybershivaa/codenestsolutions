import { createFileRoute } from "@tanstack/react-router";
import { MediaPage } from "@/admin/pages/MediaPage";
export const Route = createFileRoute("/admin/media")({ component: MediaPage });
