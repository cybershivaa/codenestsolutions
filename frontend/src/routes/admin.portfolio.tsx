import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/admin/pages/PortfolioPage";
export const Route = createFileRoute("/admin/portfolio")({ component: PortfolioPage });
