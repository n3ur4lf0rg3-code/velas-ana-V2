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
  /** sku + aroma + color */
  key: string;
  /** SKU del producto (= product.id en BD) */
  sku: string;
  productId: string;
  /** Nombre guardado al agregar (no depende del catálogo) */
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  scentId: string;
  scentName: string;
  colorId: string;
  colorName: string;
  colorHex: string;
};

export function cartItemKey(sku: string, scentId: string, colorId: string) {
  return sku + "::" + scentId + "::" + colorId;
}

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  markHydrated: () => void;
  add: (product: Product, quantity: number, options: CartOptions) => void;
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
      add: (product, quantity = 1, options) => {
        const sku = product.sku || product.id;
        const key = cartItemKey(sku, options.scentId, options.colorId);
        const items = get().items.slice();
        const index = items.findIndex((item) => item.key === key);
        if (index >= 0) {
          const current = items[index];
          if (current) {
            items[index] = {
              key: current.key,
              sku: current.sku,
              productId: current.productId,
              productName: current.productName,
              productImage: current.productImage,
              price: current.price,
              quantity: current.quantity + quantity,
              scentId: current.scentId,
              scentName: current.scentName,
              colorId: current.colorId,
              colorName: current.colorName,
              colorHex: current.colorHex,
            };
          }
        } else {
          items.push({
            key: key,
            sku: sku,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            price: product.price,
            quantity: quantity,
            scentId: options.scentId,
            scentName: options.scentName,
            colorId: options.colorId,
            colorName: options.colorName,
            colorHex: options.colorHex,
          });
        }
        set({ items: items });
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
            item.key === key ? Object.assign({}, item, { quantity: quantity }) : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "velas-ana-cart-v5",
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

/** Líneas del carrito: usan snapshot; el catálogo solo refresca precio/stock si existe. */
export function cartLines(items: CartItem[], products?: Product[]) {
  return items.map((item) => {
    const live = products
      ? products.find((p) => p.id === item.productId || p.sku === item.sku)
      : undefined;
    const name = item.productName || (live && live.name) || item.sku;
    const image = item.productImage || (live && live.image) || "";
    const price = typeof item.price === "number" ? item.price : (live && live.price) || 0;
    const stock = live ? live.stock : 99;
    return {
      key: item.key,
      sku: item.sku,
      productId: item.productId,
      productName: name,
      productImage: image,
      price: price,
      stock: stock,
      quantity: item.quantity,
      scentId: item.scentId,
      scentName: item.scentName,
      colorId: item.colorId,
      colorName: item.colorName,
      colorHex: item.colorHex,
      lineTotal: price * item.quantity,
      product: live || {
        id: item.productId,
        sku: item.sku,
        name: name,
        image: image,
        price: price,
        stock: stock,
        tagline: "",
        description: "",
        care: "",
        shape: "",
        scentId: item.scentId,
        scentName: item.scentName,
        colorId: item.colorId,
        colorName: item.colorName,
        colorHex: item.colorHex,
        notes: [],
        burnHours: "",
        weight: "",
        featured: false,
        isNew: false,
        availableColorIds: [],
      },
    };
  });
}

export function cartSubtotal(items: CartItem[], products?: Product[]) {
  return cartLines(items, products).reduce(
    (sum, line) => sum + line.lineTotal,
    0,
  );
}
