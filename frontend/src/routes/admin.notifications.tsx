import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/admin/pages/NotificationsPage";
export const Route = createFileRoute("/admin/notifications")({ component: NotificationsPage });
