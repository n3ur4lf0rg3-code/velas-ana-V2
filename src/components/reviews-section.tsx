const REVIEWS = [
  {
    name: "María G.",
    place: "Coyoacán",
    text: "La rosa olió toda la tarde. Empaque precioso y llegaron el mismo día que acordamos.",
  },
  {
    name: "Luis R.",
    place: "Naucalpan",
    text: "Pedí wax melts de vainilla. Pago contra entrega sin complicaciones. Volveré a ordenar.",
  },
  {
    name: "Andrea P.",
    place: "Benito Juárez",
    text: "El frappé se ve igual que en la foto. Muy buen aroma y trato por WhatsApp.",
  },
];

export function ReviewsSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.22em] uppercase text-gold">Reseñas</p>
        <h2 className="font-display mt-2 text-headline">Lo que dicen en la mesa</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-xl border border-border bg-raised p-6"
            >
              <p className="text-sm leading-relaxed text-muted">“{r.text}”</p>
              <footer className="mt-4 text-sm font-medium">
                {r.name}
                <span className="block text-xs font-normal text-subtle">{r.place}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
