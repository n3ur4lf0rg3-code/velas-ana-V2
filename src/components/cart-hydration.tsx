import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function CartHydration() {
  const markHydrated = useCart((s) => s.markHydrated);

  useEffect(() => {
    void useCart.persist.rehydrate();
    markHydrated();
  }, [markHydrated]);

  return null;
}
