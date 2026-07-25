import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { services as defaultServices } from "@/data/services";
import { projects as defaultProjects } from "@/data/portfolio";
import { posts as defaultPosts } from "@/data/blog";
import { plans as defaultPlans } from "@/data/pricing";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import {
  team as defaultTeam,
  values as defaultValues,
  processSteps as defaultProcess,
} from "@/data/team";
import { jobs as defaultJobs, benefits as defaultBenefits } from "@/data/jobs";
import { faqs as defaultFaqs } from "@/data/faqs";

export type CollectionKey =
  | "services"
  | "portfolio"
  | "blog"
  | "pricing"
  | "testimonials"
  | "team"
  | "values"
  | "processSteps"
  | "jobs"
  | "benefits"
  | "faqs";

export const collectionDefaults: Record<CollectionKey, any[]> = {
  services: defaultServices,
  portfolio: defaultProjects,
  blog: defaultPosts,
  pricing: defaultPlans,
  testimonials: defaultTestimonials,
  team: defaultTeam,
  values: defaultValues,
  processSteps: defaultProcess,
  jobs: defaultJobs,
  benefits: defaultBenefits,
  faqs: defaultFaqs,
};

const rowId = (key: CollectionKey) => `col_${key}`;

type Loose = { from: (t: string) => any }; // eslint-disable-line @typescript-eslint/no-explicit-any

function serverPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function pickArray(v: unknown, fallback: any[]): any[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object" && Array.isArray((v as { items?: unknown[] }).items)) {
    return (v as { items: unknown[] }).items;
  }
  return fallback;
}

export const getPublicCollection = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ key: z.string() }).parse(input))
  .handler(async ({ data }): Promise<any[]> => {
    const key = data.key as CollectionKey;
    const fallback = collectionDefaults[key] ?? [];
    try {
      const sb = serverPublicClient() as unknown as Loose;
      const { data: row, error } = await sb
        .from("site_content")
        .select("published_data")
        .eq("id", rowId(key))
        .maybeSingle();
      if (error || !row) return fallback;
      return pickArray(row.published_data, fallback);
    } catch {
      return fallback;
    }
  });

export const getDraftCollection = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ key: z.string() }).parse(input))
  .handler(async ({ data, context }): Promise<any[]> => {
    const key = data.key as CollectionKey;
    const fallback = collectionDefaults[key] ?? [];
    const sb = context.supabase as unknown as Loose;
    const { data: row } = await sb
      .from("site_content")
      .select("data")
      .eq("id", rowId(key))
      .maybeSingle();
    if (!row) return fallback;
    return pickArray(row.data, fallback);
  });

const saveSchema = z.object({ key: z.string(), items: z.array(z.record(z.string(), z.unknown())) });

export const saveDraftCollection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => saveSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as Loose;
    const id = rowId(data.key as CollectionKey);
    const payload = { items: data.items };
    const { data: existing } = await sb
      .from("site_content")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (existing) {
      const { error } = await sb
        .from("site_content")
        .update({ data: payload, updated_by: context.userId })
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await sb
        .from("site_content")
        .insert({ id, data: payload, published_data: {}, updated_by: context.userId });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const publishCollection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => saveSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as Loose;
    const id = rowId(data.key as CollectionKey);
    const payload = { items: data.items };
    const { data: existing } = await sb
      .from("site_content")
      .select("id")
      .eq("id", id)
      .maybeSingle();
    if (existing) {
      const { error } = await sb
        .from("site_content")
        .update({ data: payload, published_data: payload, updated_by: context.userId })
        .eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await sb
        .from("site_content")
        .insert({ id, data: payload, published_data: payload, updated_by: context.userId });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });
