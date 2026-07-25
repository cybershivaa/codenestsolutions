import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  getDraftCollection,
  saveDraftCollection,
  publishCollection,
  collectionDefaults,
  type CollectionKey,
} from "@/lib/collections.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useIsAdmin } from "@/hooks/useAuthUser";
import { Navigate } from "@tanstack/react-router";

const KEYS: { key: CollectionKey; label: string }[] = [
  { key: "services", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
  { key: "blog", label: "Blog Posts" },
  { key: "pricing", label: "Pricing Plans" },
  { key: "testimonials", label: "Testimonials" },
  { key: "team", label: "Team Members" },
  { key: "values", label: "Company Values" },
  { key: "processSteps", label: "Process Steps" },
  { key: "jobs", label: "Open Roles" },
  { key: "benefits", label: "Benefits" },
  { key: "faqs", label: "FAQs" },
];

export function CollectionsPage() {
  const { isAdmin, loading } = useIsAdmin();
  const qc = useQueryClient();
  const [active, setActive] = useState<CollectionKey>("services");
  const [items, setItems] = useState<any[]>([]);
  const [dirty, setDirty] = useState(false);

  const draftFn = useServerFn(getDraftCollection);
  const saveFn = useServerFn(saveDraftCollection);
  const publishFn = useServerFn(publishCollection);

  const { data: fetched } = useQuery({
    queryKey: ["draft-collection", active],
    queryFn: () => draftFn({ data: { key: active } }),
    enabled: !!isAdmin,
  });

  useEffect(() => {
    if (fetched) {
      setItems(fetched as any[]);
      setDirty(false);
    }
  }, [fetched, active]);

  const save = useMutation({
    mutationFn: () => saveFn({ data: { key: active, items } }),
    onSuccess: () => {
      toast.success("Draft saved");
      setDirty(false);
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

  const publish = useMutation({
    mutationFn: () => publishFn({ data: { key: active, items } }),
    onSuccess: () => {
      toast.success("Published live");
      setDirty(false);
      qc.invalidateQueries({ queryKey: ["collection", active] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Publish failed"),
  });

  const resetToDefaults = () => {
    setItems(collectionDefaults[active] as any[]);
    setDirty(true);
  };

  const addItem = () => {
    const template = (collectionDefaults[active][0] as any) ?? {};
    setItems([...items, JSON.parse(JSON.stringify(template))]);
    setDirty(true);
  };

  const removeItem = (i: number) => {
    setItems(items.filter((_, idx) => idx !== i));
    setDirty(true);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    setDirty(true);
  };

  const updateItem = (i: number, raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const next = [...items];
      next[i] = parsed;
      setItems(next);
      setDirty(true);
    } catch {
      // ignore parse errors while typing
    }
  };

  const summaryLabel = useMemo(
    () => (it: any) => it?.title || it?.name || it?.q || it?.slug || it?.role || "(item)",
    [],
  );

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold">Collections</h1>
          <p className="text-sm text-muted-foreground">
            Edit every list-based section of the website — services, portfolio, blog, pricing and
            more.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && <Badge variant="secondary">Unsaved changes</Badge>}
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reset defaults
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => save.mutate()}
            disabled={save.isPending}
          >
            <Save className="h-4 w-4 mr-2" /> Save draft
          </Button>
          <Button
            variant="brand"
            size="sm"
            onClick={() => publish.mutate()}
            disabled={publish.isPending}
          >
            <Upload className="h-4 w-4 mr-2" /> Publish live
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="p-2 h-fit">
          <nav className="flex flex-col">
            {KEYS.map((k) => (
              <button
                key={k.key}
                onClick={() => setActive(k.key)}
                className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  active === k.key ? "bg-accent font-medium" : "hover:bg-accent/50"
                }`}
              >
                {k.label}
                <span className="ml-2 text-xs text-muted-foreground">
                  {active === k.key ? items.length : ""}
                </span>
              </button>
            ))}
          </nav>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""}. Edit each as JSON — changes
              reflect on the public site after publish.
            </p>
            <Button size="sm" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" /> Add item
            </Button>
          </div>

          {items.map((it, i) => (
            <Card key={i} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm truncate">
                  #{i + 1} · {summaryLabel(it)}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => removeItem(i)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <Textarea
                defaultValue={JSON.stringify(it, null, 2)}
                onChange={(e) => updateItem(i, e.target.value)}
                className="font-mono text-xs min-h-[180px]"
              />
            </Card>
          ))}

          {items.length === 0 && (
            <Card className="p-8 text-center text-sm text-muted-foreground">
              No items yet. Click "Add item" to create one, or "Reset defaults" to load starter
              content.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
