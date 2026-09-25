import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock < 1;

  return (
    <article className="group flex flex-col">
      <Link
        to="/producto/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden rounded-xl bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-portrait w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.isNew ? (
          <Badge className="absolute top-3 left-3 border-gold/40 bg-raised/90 text-gold-fg">
            Nueva
          </Badge>
        ) : null}
        {soldOut ? (
          <Badge className="absolute top-3 right-3 border-border bg-raised/90">Agotada</Badge>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">
          {product.scentName}
        </p>
        <h3 className="font-display text-title mt-1">
          <Link
            to="/producto/$id"
            params={{ id: product.id }}
            className="hover:text-primary transition-colors duration-150"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
          {soldOut ? (
            <span className="text-sm text-muted">Agotada</span>
          ) : (
            <AddToCartButton
              product={product}
              size="sm"
              compact
              options={{
                scentId: product.scentId,
                scentName: product.scentName,
                colorId: product.colorId,
                colorName: product.colorName,
                colorHex: product.colorHex,
              }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
