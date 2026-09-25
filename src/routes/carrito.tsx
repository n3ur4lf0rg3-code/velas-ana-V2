import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { QuantitySelector } from "@/components/quantity-selector";
import { Button } from "@/components/ui/button";
import { listCatalog } from "@/lib/catalog-api";
import { cartCount, cartLines, cartSubtotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/carrito")({
  loader: () => listCatalog(),
  component: CartPage,
});

function CartPage() {
  const { products } = Route.useLoaderData();
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const lines = cartLines(items, products);
  const total = cartSubtotal(items, products);
  const count = cartCount(items);

  if (!hydrated) {
    return <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6" />;
  }

  if (lines.length === 0) {
    return (
      <main className="px-4">
        <EmptyState
          title="El carrito está en calma"
          action={
            <Button asChild>
              <Link to="/catalogo">Elegir una vela</Link>
            </Button>
          }
        >
          Todavía no hay piezas aquí. El catálogo espera en la otra mesa.
        </EmptyState>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">Pedido</p>
      <h1 className="font-display mt-2 text-headline">Tu carrito</h1>
      <p className="mt-2 text-sm text-muted tabular-nums">
        {count} {count === 1 ? "pieza" : "piezas"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-y divide-border border-y border-border">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-4 py-6">
              <Link
                to="/producto/$id"
                params={{ id: line.product.id }}
                className="size-24 shrink-0 overflow-hidden rounded-lg bg-surface sm:size-28"
              >
                <img
                  src={line.product.image}
                  alt=""
                  className="size-full object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/producto/$id"
                      params={{ id: line.product.id }}
                      className="font-display text-lg hover:text-primary"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-sm text-muted">{line.product.tagline}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-subtle">
                      <span
                        className="inline-block size-2.5 rounded-full border border-border"
                        style={{ backgroundColor: line.colorHex }}
                      />
                      {line.scentName} · {line.colorName}
                    </p>
                  </div>
                  <p className="text-sm font-medium tabular-nums">
                    {formatPrice(line.lineTotal)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantitySelector
                    value={line.quantity}
                    max={Math.max(1, line.product.stock)}
                    onChange={(qty) => setQuantity(line.key, qty)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(line.key)}
                    className="flex size-11 items-center justify-center rounded-md text-muted hover:text-danger"
                    aria-label={`Quitar ${line.product.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-border bg-raised p-6">
          <h2 className="font-display text-title">Resumen</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
          <p className="mt-3 text-sm text-subtle">
            El envío se confirma al recibir tu transferencia. No hay cargo con
            tarjeta por ahora.
          </p>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">Continuar el pedido</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
            <Link to="/catalogo">Seguir viendo</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
