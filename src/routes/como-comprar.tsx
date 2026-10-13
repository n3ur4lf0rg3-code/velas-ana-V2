import { createFileRoute, Link } from "@tanstack/react-router";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { STORE } from "@/lib/bank";

export const Route = createFileRoute("/como-comprar")({ component: HowToBuy });

const STEPS = [
  {
    n: "01",
    title: "Elige tus velas",
    body: "Recorre el catálogo y filtra por forma —rosa, frappé, wax melt o decorativa—. En cada pieza eliges aroma y color.",
  },
  {
    n: "02",
    title: "Ármalas en el carrito",
    body: "Suma la cantidad que quieras. Puedes volver al catálogo: el carrito se guarda en este dispositivo.",
  },
  {
    n: "03",
    title: "Déjanos tus datos",
    body: "Nombre, correo, teléfono y dirección en CDMX o área metropolitana. Una nota si el pedido es de regalo o tienes horario preferido.",
  },
  {
    n: "04",
    title: "Recibe tu número de orden",
    body: "Al confirmar aparece un folio como VA-01102026-5376. Guárdalo: es tu referencia para seguimiento.",
  },
  {
    n: "05",
    title: "Pago contra entrega",
    body: "Pagas en efectivo al recibir el pedido. No pedimos transferencia anticipada.",
  },
  {
    n: "06",
    title: "Coordinamos la entrega",
    body: `Te contactamos por WhatsApp (\( {STORE.whatsapp}) o correo ( \){STORE.email}) para acordar fecha, hora y punto de encuentro. Si hay stock, puede ser el mismo día; si está bajo pedido, de 2 a 3 días.`,
  },
  {
    n: "07",
    title: "Entrega",
    body: STORE.deliveryNote,
  },
];

function HowToBuy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">El rito</p>
      <h1 className="font-display mt-2 text-headline">Cómo comprar</h1>
      <Ornament className="mt-5 justify-start" />
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
        <h2 className="font-display text-title">Contacto</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Correo</dt>
            <dd>
              <a
                href={`mailto:${STORE.email}`}
                className="underline-offset-2 hover:underline"
              >
                {STORE.email}
              </a>
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">WhatsApp</dt>
            <dd>
              <a
                href={`https://wa.me/${STORE.whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {STORE.whatsapp}
              </a>
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Zona</dt>
            <dd className="text-right">{STORE.city}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Pago</dt>
            <dd>Contra entrega</dd>
          </div>
        </dl>
      </section>

      <div className="mt-10">
        <Button asChild size="lg">
          <Link to="/catalogo">Ir al catálogo</Link>
        </Button>
      </div>
    </main>
  );
}
