import { createFileRoute } from "@tanstack/react-router";
import { CareersPage } from "@/admin/pages/CareersPage";
export const Route = createFileRoute("/admin/careers")({ component: CareersPage });
