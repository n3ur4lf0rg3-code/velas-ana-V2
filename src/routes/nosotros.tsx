import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { Ornament } from "@/components/ornament";
import { Button } from "@/components/ui/button";
import { STORE } from "@/lib/bank";

export const Route = createFileRoute("/nosotros")({ component: AboutPage });

function AboutPage() {
  return (
    <main>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <BrandLogo decorative className="h-24 md:h-28" />
          <p className="text-xs tracking-[0.22em] uppercase text-gold mt-6">La casa</p>
          <h1 className="font-display mt-2 text-headline">Velas Ana</h1>
          <Ornament className="mt-5 justify-start" />
          <p className="mt-5 leading-relaxed text-muted">
            Ana trabaja en un atelier pequeño en {STORE.city}: cera de soya,
            mechas de algodón, moldes tratados como flores. La casa nació de
            querer un objeto que oliera bien y se viera vivo sobre la mesa —
            no un cilindro anónimo.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Las rosas se construyen pétalo a pétalo. Los frappés se vierten en
            capas, como un postre. Los wax melts se moldean como bombones
            porque el gesto de elegir uno y ponerlo a derretir debía sentirse
            igual de íntimo.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-surface">
          <img
            src="/products/hero.jpg"
            alt="Velas artesanales de la casa sobre lino y piedra"
            className="aspect-photo w-full object-cover"
          />
        </div>
      </div>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Cera de soya",
              body: "Quema más limpia y lenta que la parafina. La pigmentamos con tintes suaves, nunca neón.",
            },
            {
              title: "Aromas de verdad",
              body: "Rosa, jazmín, café, lavanda, vainilla. Notas que se reconocen en una habitación, no en un pasillo de centro comercial.",
            },
            {
              title: "Pedido a pedido",
              body: "No hay anaquel infinito. Cuando confirmas la transferencia, esa pieza se reserva y se empaca para ti.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="font-display text-title">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-headline">Un lugar en tu mesa</h2>
        <p className="mt-4 text-muted leading-relaxed">
          Si quieres un lote para un evento, un empaque de regalo o un aroma
          que no está en el catálogo, escríbenos. El correo de la casa es{" "}
          <a className="text-fg underline-offset-2 hover:underline" href={`mailto:${STORE.email}`}>
            {STORE.email}
          </a>
          .
        </p>
        <Button asChild className="mt-8">
          <Link to="/catalogo">Ver la colección</Link>
        </Button>
      </section>
    </main>
  );
}
