import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart, type CartOptions } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  quantity = 1,
  options,
  size = "lg",
  compact = false,
  className,
}: {
  product: Product;
  quantity?: number;
  options: CartOptions;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const soldOut = product.stock < 1;

  return (
    <Button
      size={size}
      className={className}
      onClick={() => {
        add(product.id, quantity, options);
        toast.success(
          soldOut
            ? `${product.name} · pedido bajo pedido (2–3 días)`
            : `${product.name} · ${options.scentName} · ${options.colorName} se agregó al carrito`,
        );
      }}
    >
      <ShoppingBag className="size-4" />
      {soldOut
        ? compact
          ? "Pedir"
          : "Pedir (2–3 días)"
        : compact
          ? "Agregar"
          : "Agregar al carrito"}
    </Button>
  );
}
