import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { BANK, STORE } from "@/lib/bank";
import { formatDate, formatPrice } from "@/lib/format";
import { getOrder, type Order } from "@/lib/orders";

export const Route = createFileRoute("/pedido/$orderId")({
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrder(orderId) ?? null);
  }, [orderId]);

  if (order === undefined) {
    return <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6" />;
  }

  if (!order) {
    return (
      <main className="px-4">
        <EmptyState
          title="No encontramos ese pedido"
          action={
            <Button asChild>
              <Link to="/catalogo">Volver al catálogo</Link>
            </Button>
          }
        >
          El número no está en este dispositivo. Si acabas de pedir, no cierres
          la pestaña hasta copiar los datos bancarios.
        </EmptyState>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Ornament />
      <p className="mt-6 text-center text-xs tracking-[0.22em] uppercase text-gold">
        Pedido recibido
      </p>
      <h1 className="font-display mt-3 text-center text-headline">
        Gracias, {order.customer.name.split(" ")[0]}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted">
        Tu orden quedó reservada. Transfiere el total y envíanos el comprobante
        para preparar el envío.
      </p>

      <div className="mt-10 rounded-xl border border-gold/40 bg-raised px-6 py-8 text-center">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">Número de orden</p>
        <p className="font-display mt-2 text-4xl tracking-wide">{order.id}</p>
        <p className="mt-2 text-sm text-subtle">{formatDate(order.createdAt)}</p>
        <div className="mt-4 flex justify-center">
          <CopyButton value={order.id} label="Copiar número" />
        </div>
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-title">Transferencia o depósito</h2>
        <p className="mt-2 text-sm text-muted">
          Usa el número de orden como concepto. El pedido se pone en marcha
          cuando llega el comprobante.
        </p>
        <dl className="mt-6 space-y-4 text-sm">
          <Row label="Banco" value={BANK.name} />
          <Row label="Titular" value={BANK.holder} copy={BANK.holder} />
          <Row label="CLABE" value={BANK.clabeDisplay} copy={BANK.clabe} />
          <Row label="Cuenta" value={BANK.accountDisplay} copy={BANK.account} />
          <Row label="Concepto" value={order.id} copy={order.id} />
          <Row label="Monto" value={formatPrice(order.total)} />
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-title">Qué sigue</h2>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <li>1. Transfiere {formatPrice(order.total)} a la CLABE de arriba.</li>
          <li>
            2. Envía el comprobante a{" "}
            <a className="text-fg underline-offset-2 hover:underline" href={`mailto:${STORE.email}`}>
              {STORE.email}
            </a>{" "}
            o por WhatsApp al {STORE.whatsapp}, con tu número {order.id}.
          </li>
          <li>3. Preparamos tu caja en 1 a 3 días hábiles y te avisamos al enviar.</li>
        </ol>
      </section>

      <section className="mt-8 rounded-xl border border-border p-6">
        <h2 className="font-display text-title">Tu pedido</h2>
        <ul className="mt-4 divide-y divide-border">
          {order.lines.map((line) => (
            <li key={line.productId} className="flex items-center gap-3 py-3">
              <img
                src={line.image}
                alt=""
                className="size-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">{line.name}</p>
                <p className="text-xs text-subtle tabular-nums">× {line.quantity}</p>
              </div>
              <p className="text-sm tabular-nums">
                {formatPrice(line.price * line.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-medium">
          <span>Total a transferir</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </div>
        <p className="mt-4 text-sm text-muted">
          Envío a {order.customer.address}
        </p>
        {order.customer.notes ? (
          <p className="mt-2 text-sm text-muted">Nota: {order.customer.notes}</p>
        ) : null}
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/catalogo">Seguir viendo</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/como-comprar">Leer cómo comprar</Link>
        </Button>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  copy,
}: {
  label: string;
  value: string;
  copy?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <dt className="text-subtle">{label}</dt>
        <dd className="mt-0.5 font-medium tabular-nums">{value}</dd>
      </div>
      {copy ? <CopyButton value={copy} label="Copiar" /> : null}
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copiado" : label}
    </Button>
  );
}
