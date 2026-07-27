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
    queryKey: ["site-settings", "public", "latest"],
    queryFn: () => getPublicSettings(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    initialData: defaultSettings,
  });
  return data;
}
