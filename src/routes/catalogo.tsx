import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/ornament";
import { ProductCard } from "@/components/product-card";
import { getActiveCampaign } from "@/lib/campaign-api";
import { listCatalog } from "@/lib/catalog-api";
import { SHAPES } from "@/lib/products";
import { cn } from "@/lib/utils";

type CatalogSearch = {
  forma?: string;
  temporada?: string;
};

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    forma: typeof search.forma === "string" ? search.forma : undefined,
    temporada:
      typeof search.temporada === "string" ? search.temporada : undefined,
  }),
  loaderDeps: ({ search }) => ({
    temporada: search.temporada,
    forma: search.forma,
  }),
  loader: () => listCatalog(),
  component: CatalogPage,
});

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-4 text-sm transition-colors duration-150",
        active
          ? "bg-primary text-primary-fg"
          : "border border-border bg-raised text-fg hover:border-gold",
      )}
    >
      {children}
    </button>
  );
}

function CatalogPage() {
  const { forma, temporada } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = Route.useLoaderData();

  const [campaignTitle, setCampaignTitle] = useState<string | null>(null);
  const [campaignProductIds, setCampaignProductIds] = useState<string[] | null>(
    null,
  );

  useEffect(() => {
    if (!temporada) {
      setCampaignTitle(null);
      setCampaignProductIds(null);
      return;
    }
    let cancelled = false;
    void getActiveCampaign().then(({ campaign }) => {
      if (cancelled) return;
      if (campaign && campaign.slug === temporada) {
        setCampaignTitle(campaign.title);
        setCampaignProductIds(campaign.productIds);
      } else {
        setCampaignTitle(null);
        setCampaignProductIds(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [temporada]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (campaignProductIds && !campaignProductIds.includes(product.id)) {
        return false;
      }
      if (forma && product.shape !== forma) return false;
      return true;
    });
  }, [products, campaignProductIds, forma]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">
        {campaignTitle ? "Temporada" : "Colección"}
      </p>
      <h1 className="font-display mt-2 text-headline">
        {campaignTitle ?? "El catálogo"}
      </h1>
      <Ornament className="mt-5 justify-start" />
      <p className="mt-4 max-w-xl text-muted">
        {campaignTitle
          ? "Solo las piezas de la campaña activa. Puedes limpiar el filtro para ver todo el catálogo."
          : "Filtra por forma. Todas las piezas se hacen por lote pequeño y se reservan al confirmar la transferencia."}
      </p>

      {temporada ? (
        <button
          type="button"
          className="mt-4 text-sm text-primary underline-offset-2 hover:underline"
          onClick={() =>
            navigate({
              search: { forma, temporada: undefined },
            })
          }
        >
          Ver todo el catálogo
        </button>
      ) : null}

      <div className="mt-10">
        <p className="mb-2 text-xs tracking-[0.16em] uppercase text-subtle">
          Forma
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={!forma}
            onClick={() =>
              navigate({ search: { forma: undefined, temporada } })
            }
          >
            Todas
          </Chip>
          {SHAPES.map((shape) => (
            <Chip
              key={shape.id}
              active={forma === shape.id}
              onClick={() =>
                navigate({
                  search: {
                    forma: forma === shape.id ? undefined : shape.id,
                    temporada,
                  },
                })
              }
            >
              {shape.label}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-muted tabular-nums">
        {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-muted">
          No hay piezas con esa forma. Prueba otra o limpia el filtro.
        </p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
  }
