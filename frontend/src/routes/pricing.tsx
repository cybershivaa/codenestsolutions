import { createFileRoute } from "@tanstack/react-router";
import { PricingSection } from "@/components/home/pricing-section";
import { Section } from "@/components/section";
import { useCollection } from "@/hooks/useCollection";
import { comparison } from "@/data/pricing";
import { Check, X } from "lucide-react";
import { FaqSection } from "@/components/home/faq-section";
import { ContactCta } from "@/components/home/contact-cta";
import { brand } from "@/data/brand";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: `Pricing — ${brand.name}` },
      {
        name: "description",
        content: "Transparent packages and custom quotes for websites, apps and software.",
      },
      { property: "og:title", content: `Pricing — ${brand.name}` },
      { property: "og:description", content: "Honest pricing, no surprises." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function cell(v: string | boolean) {
  const plans = useCollection<any>("pricing");
  if (v === true) return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (v === false) return <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />;
  return <span className="text-sm">{v}</span>;
}

function Pricing() {
  return (
    <>
      <PricingSection />
      <Section
        eyebrow="Compare"
        title={
          <>
            Package <span className="text-gradient">comparison.</span>
          </>
        }
        center
      >
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold">Starter</th>
                <th className="p-4 font-semibold text-primary">Professional</th>
                <th className="p-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? "bg-muted/20" : ""}>
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">{cell(row.starter)}</td>
                  <td className="p-4 text-center">{cell(row.pro)}</td>
                  <td className="p-4 text-center">{cell(row.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <FaqSection />
      <ContactCta />
    </>
  );
}
