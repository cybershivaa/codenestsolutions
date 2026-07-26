import { useQuery } from "@tanstack/react-query";
import { getPublicSettings } from "@/lib/cms.functions";
import { defaultSettings, type SiteSettings } from "@/data/defaultSettings";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ensureSiteContentLiveSync } from "@/hooks/siteContentSync";

export function useSiteSettings(): SiteSettings {
  const queryClient = useQueryClient();

  useEffect(() => {
    ensureSiteContentLiveSync(queryClient);
  }, [queryClient]);

  const { data } = useQuery({
    queryKey: ["site-settings", "public"],
    queryFn: () => getPublicSettings(),
    staleTime: 60_000,
    initialData: defaultSettings,
  });
  return data;
}
