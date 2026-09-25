import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartOptions = {
  scentId: string;
  scentName: string;
  colorId: string;
  colorName: string;
  colorHex: string;
};

export type CartItem = {
  /** Clave única: producto + aroma + color */
  key: string;
  productId: string;
  quantity: number;
  scentId: string;
  scentName: string;
  colorId: string;
  colorName: string;
  colorHex: string;
};

export function cartItemKey(
  productId: string,
  scentId: string,
  colorId: string,
) {
  return `\( {productId}:: \){scentId}::${colorId}`;
}

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  markHydrated: () => void;
  add: (
    productId: string,
    quantity: number,
    options: CartOptions,
  ) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      add: (productId, quantity = 1, options) => {
        const key = cartItemKey(productId, options.scentId, options.colorId);
        const items = [...get().items];
        const index = items.findIndex((item) => item.key === key);
        if (index >= 0) {
          const current = items[index];
          if (current) {
            items[index] = {
              ...current,
              quantity: current.quantity + quantity,
            };
          }
        } else {
          items.push({
            key,
            productId,
            quantity,
            scentId: options.scentId,
            scentName: options.scentName,
            colorId: options.colorId,
            colorName: options.colorName,
            colorHex: options.colorHex,
          });
        }
        set({ items });
      },
      remove: (key) =>
        set({ items: get().items.filter((item) => item.key !== key) }),
      setQuantity: (key, quantity) => {
        if (quantity < 1) {
          get().remove(key);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.key === key ? { ...item, quantity } : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "velas-ana-cart-v2",
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
      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((line) => line !== null);
}

export function cartSubtotal(items: CartItem[], products: Product[]) {
  return cartLines(items, products).reduce((sum, line) => sum + line.lineTotal, 0);
}
