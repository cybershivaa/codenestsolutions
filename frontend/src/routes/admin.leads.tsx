import { createFileRoute } from "@tanstack/react-router";
import { LeadsPage } from "@/admin/pages/LeadsPage";
export const Route = createFileRoute("/admin/leads")({ component: LeadsPage });
