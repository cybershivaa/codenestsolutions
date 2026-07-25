import { createFileRoute } from "@tanstack/react-router";
import { BuilderPage } from "@/admin/pages/BuilderPage";
export const Route = createFileRoute("/admin/builder")({ component: BuilderPage });
