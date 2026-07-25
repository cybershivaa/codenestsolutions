import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/admin/pages/TeamPage";
export const Route = createFileRoute("/admin/team")({ component: TeamPage });
