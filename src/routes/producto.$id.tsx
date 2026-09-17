import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Flame, Weight } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { QuantitySelector } from "@/components/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import {
  getProduct,
  products,
  scentLabel,
  shapeLabel,
} from "@/lib/products";

export const Route = createFileRoute("/producto/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="px-4">
        <EmptyState
          title="No encontramos esa vela"
          action={
            <Button asChild>
              <Link to="/catalogo">Ver el catálogo</Link>
            </Button>
          }
        >
          Puede que se haya agotado el lote. Mira el resto de la colección.
        </EmptyState>
      </main>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && (p.shape === product.shape || p.scent === product.scent))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted">
        <Link to="/catalogo" className="hover:text-primary">
          Catálogo
        </Link>
        <span className="mx-2 text-subtle">/</span>
        <span>{product.name}</span>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-portrait w-full object-cover"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{shapeLabel(product.shape)}</Badge>
            <Badge>{scentLabel(product.scent)}</Badge>
            {product.isNew ? <Badge className="text-gold-fg border-gold/40">Nueva</Badge> : null}
          </div>
          <h1 className="font-display mt-4 text-headline">{product.name}</h1>
          <p className="mt-2 text-muted">{product.tagline}</p>
          <p className="mt-6 text-2xl font-medium tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <ul className="mt-6 space-y-1.5 text-sm text-fg">
            {product.notes.map((note) => (
              <li key={note} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-gold" />
                {note}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-border bg-raised px-3 py-3">
              <dt className="flex items-center gap-1.5 text-subtle">
                <Flame className="size-3.5" />
                Quema
              </dt>
              <dd className="mt-1">{product.burnHours}</dd>
            </div>
            <div className="rounded-lg border border-border bg-raised px-3 py-3">
              <dt className="flex items-center gap-1.5 text-subtle">
                <Weight className="size-3.5" />
                Peso
              </dt>
              <dd className="mt-1">{product.weight}</dd>
            </div>
            <div className="rounded-lg border border-border bg-raised px-3 py-3">
              <dt className="flex items-center gap-1.5 text-subtle">
                <Clock className="size-3.5" />
                Lote
              </dt>
              <dd className="mt-1">A mano</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <AddToCartButton product={product} quantity={quantity} size="md" className="flex-1" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-subtle">{product.care}</p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-headline">También en la mesa</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
