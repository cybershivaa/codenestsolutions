import { useQuery } from "@tanstack/react-query";
import {
  getPublicCollection,
  collectionDefaults,
  type CollectionKey,
} from "@/lib/collections.functions";

export function useCollection<T = any>(key: CollectionKey): T[] {
  const { data } = useQuery({
    queryKey: ["collection", key],
    queryFn: () => getPublicCollection({ data: { key } }),
    staleTime: 60_000,
    initialData: collectionDefaults[key] as any[],
  });
  return (data ?? collectionDefaults[key]) as T[];
}
