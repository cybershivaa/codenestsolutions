import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/admin/pages/ServicesPage";
export const Route = createFileRoute("/admin/services")({ component: ServicesPage });
