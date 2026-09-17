import { cartLines, type CartItem } from "./cart";

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
  const all = listOrders().filter((existing) => existing.id !== order.id);
  all.unshift(order);
  window.localStorage.setItem(KEY, JSON.stringify(all));
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
