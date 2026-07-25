export type Service = {
  slug: string;
  category: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    category: "Web",
    title: "Website Development",
    description:
      "Blazing-fast, conversion-focused websites tailored to your brand — from marketing sites to complex portals.",
    icon: "Globe",
    items: [
      "Business Website",
      "Portfolio Website",
      "Landing Page",
      "School Website",
      "Coaching Website",
      "Hospital Website",
      "Restaurant Website",
      "Real Estate Website",
      "NGO Website",
      "E-commerce Website",
      "Blog Website",
      "News Portal",
    ],
  },
  {
    slug: "software-development",
    category: "Software",
    title: "Software Development",
    description:
      "Custom business software engineered for reliability, security and long-term maintainability.",
    icon: "Boxes",
    items: [
      "School ERP",
      "Hospital Management",
      "Inventory Management",
      "Billing Software",
      "CRM",
      "HR Management",
      "Attendance System",
      "Custom Business Software",
      "Desktop Applications",
      "Web Applications",
    ],
  },
  {
    slug: "mobile-app-development",
    category: "Mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps with buttery interactions and offline-first architecture.",
    icon: "Smartphone",
    items: ["Android App", "iOS App", "Flutter App", "React Native App"],
  },
  {
    slug: "ui-ux-design",
    category: "Design",
    title: "UI/UX Design",
    description:
      "Interfaces that feel effortless. Research-led, systemised design that raises product quality across the board.",
    icon: "Palette",
    items: ["Dashboard Design", "Logo Design", "Brand Identity"],
  },
  {
    slug: "seo-digital-marketing",
    category: "Growth",
    title: "SEO & Digital Marketing",
    description:
      "Data-driven SEO, content and paid strategy that compounds — turning search and social into predictable pipeline.",
    icon: "TrendingUp",
    items: ["Technical SEO", "Content Strategy", "Google Ads", "Social Media", "Analytics Setup"],
  },
  {
    slug: "devops-integrations",
    category: "Platform",
    title: "DevOps & Integrations",
    description:
      "Ship faster and scale calmly with modern hosting, CI/CD and integrations across your product surface.",
    icon: "Cloud",
    items: [
      "Website Maintenance",
      "Hosting Setup",
      "Cloud Deployment",
      "API Integration",
      "Payment Gateway Integration",
      "AI Chatbot Integration",
    ],
  },
];
