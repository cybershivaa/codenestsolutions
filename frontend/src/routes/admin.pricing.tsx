import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/admin/pages/PricingPage";
export const Route = createFileRoute("/admin/pricing")({ component: PricingPage });
