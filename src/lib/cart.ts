import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  markHydrated: () => void;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      add: (productId, quantity = 1) => {
        const items = [...get().items];
        const index = items.findIndex((item) => item.productId === productId);
        if (index >= 0) {
          const current = items[index];
          if (current) {
            items[index] = { ...current, quantity: current.quantity + quantity };
          }
        } else {
          items.push({ productId, quantity });
        }
        set({ items });
      },
      remove: (productId) =>
        set({ items: get().items.filter((item) => item.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().remove(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "velas-ana-cart",
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartLines(items: CartItem[], products: Product[]) {
  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.quantity };
    })
    .filter((line) => line !== null);
}

export function cartSubtotal(items: CartItem[], products: Product[]) {
  return cartLines(items, products).reduce((sum, line) => sum + line.lineTotal, 0);
}
