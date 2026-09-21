import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Ornament } from "@/components/ornament";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { listCatalog } from "@/lib/catalog-api";
import { SHAPES } from "@/lib/products";

export const Route = createFileRoute("/")({
  loader: () => listCatalog(),
  component: Home,
});

const SHAPE_BLURBS: Record<string, string> = {
  rosa: "Pétalos vertidos uno a uno, como una flor de jardín.",
  frappe: "El café de la tarde, esculpido en cera y vainilla.",
  "wax-melt": "Bombones de cera para el quemador, sin mecha.",
  decorativa: "Formas que se quedan en la mesa cuando se apagan.",
};

function Home() {
  const { products } = Route.useLoaderData();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-gold">
            Colección artesanal
          </p>
          <h1 className="font-display mt-4 text-display italic text-fg">
            Velas que se recuerdan
          </h1>
          <Ornament className="mt-6 justify-start" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Rosas esculpidas, frappés de vainilla, wax melts como chocolates.
            Cada pieza de Velas Ana se vierte a mano, con aromas lentos y formas
            que merecen la mesa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/catalogo">Ver el catálogo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/como-comprar">Cómo comprar</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-surface">
          <img
            src="/products/hero.jpg"
            alt="Mesa de atelier con velas rosa, un frappé de cera y wax melts"
            className="aspect-photo w-full object-cover sm:aspect-square lg:aspect-photo"
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { title: "Hecho a mano", body: "Cada pétalo y cada vaso se vierte en el atelier, sin moldes industriales." },
            { title: "Aroma verdadero", body: "Notas botánicas y gourmand, pensadas para habitaciones reales, no para vitrinas." },
            { title: "Pago sencillo", body: "Elige, confirma y transfiere. Te enviamos al recibir el comprobante." },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="font-display text-title">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-gold">Destacadas</p>
            <h2 className="font-display mt-2 text-headline">La mesa de hoy</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/catalogo" className="hidden sm:inline-flex">
              Toda la colección
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.22em] uppercase text-gold">Formas</p>
          <h2 className="font-display mt-2 text-headline">Cuatro maneras de encender</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SHAPES.map((shape) => (
              <Link
                key={shape.id}
                to="/catalogo"
                search={{ forma: shape.id }}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-raised px-6 py-7 transition-colors duration-150 hover:border-gold"
              >
                <div>
                  <h3 className="font-display text-title">{shape.label}</h3>
                  <p className="mt-1 text-sm text-muted">{SHAPE_BLURBS[shape.id]}</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-gold transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-surface">
          <img
            src="/products/hero.jpg"
            alt="Detalle de velas artesanales sobre lino crema"
            className="aspect-wide w-full object-cover object-bottom"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-gold">La casa</p>
          <h2 className="font-display mt-2 text-headline">Un atelier pequeño, velas lentas</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Velas Ana nace de la mesa de trabajo de Ana: cera de soya, mechas de
            algodón y moldes que se tratan como flores. No hay dos rosas iguales.
            Pedimos con calma y enviamos cuando el depósito llega — así cada
            pedido se atiende como una pieza, no como una fila.
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/nosotros">Conocer la casa</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
