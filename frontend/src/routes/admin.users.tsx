import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@/admin/pages/UsersPage";
export const Route = createFileRoute("/admin/users")({ component: UsersPage });
