import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/admin/pages/BlogPage";
export const Route = createFileRoute("/admin/blog")({ component: BlogPage });
