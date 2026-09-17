import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  quantity = 1,
  size = "lg",
  compact = false,
  className,
}: {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  className?: string;
}) {
  const add = useCart((s) => s.add);

  return (
    <Button
      size={size}
      className={className}
      onClick={() => {
        add(product.id, quantity);
        toast.success(`${product.name} se agregó al carrito`);
      }}
    >
      <ShoppingBag className="size-4" />
      {compact ? "Agregar" : "Agregar al carrito"}
    </Button>
  );
}