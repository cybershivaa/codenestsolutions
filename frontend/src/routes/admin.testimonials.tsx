import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsPage } from "@/admin/pages/TestimonialsPage";
export const Route = createFileRoute("/admin/testimonials")({ component: TestimonialsPage });
