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
