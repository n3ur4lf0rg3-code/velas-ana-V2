import type { Order } from "@/lib/orders";
import { STORE } from "@/lib/bank";
import { formatPrice } from "@/lib/format";

function linesText(order: Order) {
  return order.lines
    .map(
      (l) =>
        `• ${l.name} × ${l.quantity} = ${formatPrice(l.price * l.quantity)}`,
    )
    .join("\n");
}

export function buildOrderWhatsAppText(order: Order) {
  return [
    `🕯️ Nuevo pedido ${order.id}`,
    ``,
    `Cliente: ${order.customer.name}`,
    `Tel: ${order.customer.phone}`,
    `Email: ${order.customer.email}`,
    `Dirección: ${order.customer.address}`,
    order.customer.notes ? `Notas: ${order.customer.notes}` : null,
    ``,
    `Productos:`,
    linesText(order),
    ``,
    `Total: ${formatPrice(order.total)}`,
    `Pago: contra entrega`,
    `Zona: CDMX / área metropolitana`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function orderWhatsAppUrl(order: Order) {
  const text = encodeURIComponent(buildOrderWhatsAppText(order));
  return `https://wa.me/\( {STORE.whatsappE164}?text= \){text}`;
}

/** Correo al dueño vía FormSubmit (gratis). Primera vez confirma el mail. */
export async function notifyNewOrder(order: Order) {
  const body = {
    _subject: `Nuevo pedido ${order.id} — Velas Ana`,
    _template: "table",
    pedido: order.id,
    cliente: order.customer.name,
    telefono: order.customer.phone,
    email_cliente: order.customer.email,
    direccion: order.customer.address,
    notas: order.customer.notes || "—",
    productos: linesText(order),
    total: formatPrice(order.total),
    pago: "Contra entrega",
    fecha: order.createdAt,
  };

  const res = await fetch(`https://formsubmit.co/ajax/${STORE.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`FormSubmit falló: ${res.status} ${t}`);
  }
}
