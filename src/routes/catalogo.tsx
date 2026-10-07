import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/ornament";
import { ProductCard } from "@/components/product-card";
import { getActiveCampaign } from "@/lib/campaign-api";
import { listCatalog } from "@/lib/catalog-api";
import { SHAPES } from "@/lib/products";
import { cn } from "@/lib/utils";

type CatalogSearch = {
  forma?: string;
  aroma?: string;
  color?: string;
  temporada?: string;
};

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    forma: typeof search.forma === "string" ? search.forma : undefined,
    aroma: typeof search.aroma === "string" ? search.aroma : undefined,
    color: typeof search.color === "string" ? search.color : undefined,
    temporada: typeof search.temporada === "string" ? search.temporada : undefined,
  }),
  loader: async ({ location }) => {
    const search = location.search as CatalogSearch;
    const [catalog, active] = await Promise.all([
      listCatalog(),
      getActiveCampaign(),
    ]);
    const campaignIds =
      search.temporada &&
      active.campaign &&
      active.campaign.slug === search.temporada
        ? active.campaign.productIds
        : null;
    return {
      ...catalog,
      campaignTitle: campaignIds ? active.campaign?.title ?? null : null,
      campaignProductIds: campaignIds,
    };
  },
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
  const { forma, aroma, color, temporada } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products, scents, colors, campaignTitle, campaignProductIds } =
    Route.useLoaderData();

  const filtered = products.filter((product) => {
    if (campaignProductIds && !campaignProductIds.includes(product.id)) {
      return false;
    }
    if (forma && product.shape !== forma) return false;
    if (aroma && product.scentId !== aroma) return false;
    if (color && product.colorId !== color) return false;
    return true;
  });

  const usedScents = new Set(products.map((p) => p.scentId));
  const usedColors = new Set(products.map((p) => p.colorId));

  function searchBase(extra: Partial<CatalogSearch> = {}) {
    return {
      forma,
      aroma,
      color,
      temporada,
      ...extra,
    };
  }

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
          : "Filtra por forma, aroma o color. Todas las piezas se hacen por lote pequeño y se reservan al confirmar la transferencia."}
      </p>

      {temporada ? (
        <button
          type="button"
          className="mt-4 text-sm text-primary underline-offset-2 hover:underline"
          onClick={() =>
            navigate({ search: { forma, aroma, color, temporada: undefined } })
          }
        >
          Ver todo el catálogo
        </button>
      ) : null}

      <div className="mt-10 space-y-5">
        <div>
          <p className="mb-2 text-xs tracking-[0.16em] uppercase text-subtle">Forma</p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={!forma}
              onClick={() => navigate({ search: searchBase({ forma: undefined }) })}
            >
              Todas
            </Chip>
            {SHAPES.map((shape) => (
              <Chip
                key={shape.id}
                active={forma === shape.id}
                onClick={() =>
                  navigate({
                    search: searchBase({
                      forma: forma === shape.id ? undefined : shape.id,
                    }),
                  })
                }
              >
                {shape.label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs tracking-[0.16em] uppercase text-subtle">Aroma</p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={!aroma}
              onClick={() => navigate({ search: searchBase({ aroma: undefined }) })}
            >
              Todos
            </Chip>
            {scents
              .filter((scent) => usedScents.has(scent.id))
              .map((scent) => (
                <Chip
                  key={scent.id}
                  active={aroma === scent.id}
                  onClick={() =>
                    navigate({
                      search: searchBase({
                        aroma: aroma === scent.id ? undefined : scent.id,
                      }),
                    })
                  }
                >
                  {scent.name}
                </Chip>
              ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs tracking-[0.16em] uppercase text-subtle">Color</p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={!color}
              onClick={() => navigate({ search: searchBase({ color: undefined }) })}
            >
              Todos
            </Chip>
            {colors
              .filter((item) => usedColors.has(item.id))
              .map((item) => (
                <Chip
                  key={item.id}
                  active={color === item.id}
                  onClick={() =>
                    navigate({
                      search: searchBase({
                        color: color === item.id ? undefined : item.id,
                      }),
                    })
                  }
                >
                  {item.name}
                </Chip>
              ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted tabular-nums">
        {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-muted">
          No hay piezas con esa combinación. Prueba otro aroma o limpia los filtros.
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
