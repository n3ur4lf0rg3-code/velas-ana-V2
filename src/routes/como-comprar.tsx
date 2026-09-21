import { createFileRoute, Link } from "@tanstack/react-router";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { BANK, STORE } from "@/lib/bank";

export const Route = createFileRoute("/como-comprar")({ component: HowToBuy });

const STEPS = [
  {
    n: "01",
    title: "Elige tus velas",
    body: "Recorre el catálogo. Filtra por forma —rosa, frappé, wax melt o decorativa— o por aroma. Abre cada pieza para ver notas, tiempo de quema y cuidado.",
  },
  {
    n: "02",
    title: "Ármalas en el carrito",
    body: "Suma la cantidad que quieras. Puedes volver al catálogo: el carrito se guarda en este dispositivo.",
  },
  {
    n: "03",
    title: "Déjanos tus datos",
    body: "Nombre, correo, teléfono, dirección y una nota si el pedido es de regalo. Con eso preparamos la caja y el envío.",
  },
  {
    n: "04",
    title: "Recibe tu número de orden",
    body: "Al confirmar aparece un folio —por ejemplo VA-4821— junto con la CLABE. Guárdalo: es el concepto de tu transferencia.",
  },
  {
    n: "05",
    title: "Transfiere o deposita",
    body: "Todavía no hay pago con tarjeta. El pago es por transferencia SPEI o depósito bancario, a nombre de la casa.",
  },
  {
    n: "06",
    title: "Envía el comprobante",
    body: `Mándalo a ${STORE.email} o por WhatsApp al ${STORE.whatsapp}, con tu número de orden. En 1 a 3 días hábiles sale tu caja, a todo México.`,
  },
];

function HowToBuy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">El rito</p>
      <h1 className="font-display mt-2 text-headline">Cómo comprar</h1>
      <Ornament className="mt-5 justify-start" />
      <p className="mt-4 text-muted leading-relaxed">
        Velas Ana trabaja por pedido y transferencia. Sin pasarela, sin prisa:
        tú eliges, nosotras preparamos cuando el depósito llega.
      </p>

      <ol className="mt-12 space-y-8">
        {STEPS.map((step) => (
          <li key={step.n} className="grid grid-cols-[auto_1fr] gap-5">
            <span className="font-display text-2xl text-gold leading-none pt-0.5">
              {step.n}
            </span>
            <div>
              <h2 className="font-display text-title">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-14 rounded-xl border border-border bg-raised p-6">
        <h2 className="font-display text-title">Datos para transferir</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Banco</dt>
            <dd>{BANK.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Titular</dt>
            <dd className="text-right">{BANK.holder}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">CLABE</dt>
            <dd className="tabular-nums">{BANK.clabeDisplay}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Cuenta</dt>
            <dd className="tabular-nums">{BANK.accountDisplay}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          El concepto es siempre tu número de orden. El monto, el total de la
          confirmación.
        </p>
      </section>

      <div className="mt-10">
        <Button asChild size="lg">
          <Link to="/catalogo">Ir al catálogo</Link>
        </Button>
      </div>
    </main>
  );
}
