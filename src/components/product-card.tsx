import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock < 1;

  return (
    <article className="group flex flex-col transition-transform duration-300 ease-out active:scale-[0.98] sm:hover:-translate-y-1">
      <Link
        to="/producto/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden rounded-xl bg-surface shadow-sm transition-shadow duration-300 group-hover:shadow-md"
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-portrait w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {product.isNew ? (
          <Badge className="absolute top-3 left-3 border-gold/40 bg-raised/90 text-gold-fg">
            Nueva
          </Badge>
        ) : null}
        {soldOut ? (
          <Badge className="absolute top-3 right-3 border-gold/40 bg-raised/90 text-gold-fg">
            Bajo pedido
          </Badge>
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
            className="transition-colors duration-150 hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-sm font-medium tabular-nums">
            {formatPrice(product.price)}
          </p>
          <Link
            to="/producto/$id"
            params={{ id: product.id }}
            className="text-sm text-primary transition-colors hover:underline"
          >
            {soldOut ? "Pedir a medida" : "Elegir aroma"}
          </Link>
        </div>
      </div>
    </article>
  );
}
