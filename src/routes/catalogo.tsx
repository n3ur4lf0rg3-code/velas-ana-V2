import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/ornament";
import { ProductCard } from "@/components/product-card";
import {
  products,
  SCENTS,
  SHAPES,
  type ScentId,
  type ShapeId,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type CatalogSearch = {
  forma?: ShapeId;
  aroma?: ScentId;
};

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const forma = SHAPES.some((s) => s.id === search.forma)
      ? (search.forma as ShapeId)
      : undefined;
    const aroma = SCENTS.some((s) => s.id === search.aroma)
      ? (search.aroma as ScentId)
      : undefined;
    return { forma, aroma };
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
  const { forma, aroma } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = products.filter((product) => {
    if (forma && product.shape !== forma) return false;
    if (aroma && product.scent !== aroma) return false;
    return true;
  });

  const usedScents = new Set(products.map((p) => p.scent));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">Colección</p>
      <h1 className="font-display mt-2 text-headline">El catálogo</h1>
      <Ornament className="mt-5 justify-start" />
      <p className="mt-4 max-w-xl text-muted">
        Filtra por forma o por aroma. Todas las piezas se hacen por lote pequeño
        y se reservan al confirmar la transferencia.
      </p>

      <div className="mt-10 space-y-5">
        <div>
          <p className="mb-2 text-xs tracking-[0.16em] uppercase text-subtle">Forma</p>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={!forma}
              onClick={() => navigate({ search: { forma: undefined, aroma } })}
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
                      aroma,
                    },
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
              onClick={() => navigate({ search: { forma, aroma: undefined } })}
            >
              Todos
            </Chip>
            {SCENTS.filter((scent) => usedScents.has(scent.id)).map((scent) => (
              <Chip
                key={scent.id}
                active={aroma === scent.id}
                onClick={() =>
                  navigate({
                    search: {
                      forma,
                      aroma: aroma === scent.id ? undefined : scent.id,
                    },
                  })
                }
              >
                {scent.label}
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
