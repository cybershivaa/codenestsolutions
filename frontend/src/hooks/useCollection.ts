import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getPublicCollection,
  collectionDefaults,
  type CollectionKey,
} from "@/lib/collections.functions";
import { useQueryClient } from "@tanstack/react-query";
import { ensureSiteContentLiveSync } from "@/hooks/siteContentSync";

export function useCollection<T = any>(key: CollectionKey): T[] {
  const queryClient = useQueryClient();

  useEffect(() => {
    ensureSiteContentLiveSync(queryClient);
  }, [queryClient]);

  const { data } = useQuery({
    queryKey: ["collection", key],
    queryFn: () => getPublicCollection({ data: { key } }),
    staleTime: 60_000,
    initialData: collectionDefaults[key] as any[],
  });
  return (data ?? collectionDefaults[key]) as T[];
}
