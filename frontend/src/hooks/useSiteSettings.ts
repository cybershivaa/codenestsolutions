import { useQuery } from "@tanstack/react-query";
import { getPublicSettings } from "@/lib/cms.functions";
import { defaultSettings, type SiteSettings } from "@/data/defaultSettings";

export function useSiteSettings(): SiteSettings {
  const { data } = useQuery({
    queryKey: ["site-settings", "public"],
    queryFn: () => getPublicSettings(),
    staleTime: 60_000,
    initialData: defaultSettings,
  });
  return data;
}
