import { cartLines, type CartItem } from "./cart";
import { createOrderInFirestore, getOrders as getOrdersFromFs } from "./firestore";

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

export type OrderLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: Customer;
  lines: OrderLine[];
  total: number;
};

const KEY = "velas-ana-orders";

export function makeOrderId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `VA-${n}`;
}

export function listOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrder(id: string) {
  return listOrders().find((order) => order.id === id);
}

export function saveOrder(order: Order) {
  // Guardar también en localStorage (respaldo inmediato para la página de confirmación)
  const all = listOrders().filter((existing) => existing.id !== order.id);
  all.unshift(order);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }

  // Guardar en Firestore (persistente)
  void createOrderInFirestore({
    code: order.id,
    customer: order.customer,
    lines: order.lines,
    total: order.total,
    status: "pending_transfer",
  }).catch((err) => {
    console.error("Error guardando orden en Firestore:", err);
  });
}

export function createOrder(customer: Customer, items: CartItem[]): Order {
  const lines: OrderLine[] = cartLines(items).map((line) => ({
    productId: line.product.id,
    name: line.product.name,
    price: line.product.price,
    quantity: line.quantity,
    image: line.product.image,
  }));
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return {
    id: makeOrderId(),
    createdAt: new Date().toISOString(),
    customer,
    lines,
    total,
  };
}

export async function listOrdersFromFirestore() {
  return getOrdersFromFs();
}
