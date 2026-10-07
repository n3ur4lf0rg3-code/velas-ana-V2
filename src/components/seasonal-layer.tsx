import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getActiveCampaign, type Campaign } from "@/lib/campaign-api";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "va-campaign-dismissed";

export function SeasonalLayer() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getActiveCampaign()
      .then(({ campaign: c, products: p }) => {
        if (cancelled) return;
        setCampaign(c);
        setProducts(p);
        if (c) {
          // Quita temas previos y aplica el actual
          document.body.classList.forEach((cls) => {
            if (cls.startsWith("theme-")) document.body.classList.remove(cls);
          });
          document.body.classList.add(`theme-${c.theme}`);
          if (c.showPopup) {
            const dismissed = sessionStorage.getItem(`${STORAGE_KEY}:${c.id}`);
            if (!dismissed) setPopupOpen(true);
          }
        }
      })
      .catch(() => {
        /* sin campaña o tabla aún no migrada */
      });

    return () => {
      cancelled = true;
      document.body.classList.forEach((cls) => {
        if (cls.startsWith("theme-")) document.body.classList.remove(cls);
      });
    };
  }, []);

  function dismissPopup() {
    if (campaign) {
      sessionStorage.setItem(`${STORAGE_KEY}:${campaign.id}`, "1");
    }
    setPopupOpen(false);
  }

  if (!campaign) return null;

  // Siempre al catálogo filtrado por esta campaña
  const catalogSearch = { temporada: campaign.slug };

  return (
    <>
      {campaign.showBanner ? (
        <div className="seasonal-banner border-b border-border px-4 py-2.5 text-center text-sm">
          <span className="font-medium">{campaign.title}</span>
          {campaign.subtitle ? (
            <span className="text-muted"> — {campaign.subtitle}</span>
          ) : null}{" "}
          <Link
            to="/catalogo"
            search={catalogSearch}
            className="text-primary underline-offset-2 hover:underline"
          >
            {campaign.ctaLabel}
          </Link>
        </div>
      ) : null}

      {popupOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={campaign.title}
        >
          <div className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-raised p-6 shadow-lg">
            <button
              type="button"
              onClick={dismissPopup}
              className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>
            <p className="text-xs tracking-[0.2em] uppercase text-gold">Temporada</p>
            <h2 className="font-display mt-2 pr-10 text-headline">{campaign.title}</h2>
            {campaign.subtitle ? (
              <p className="mt-2 text-sm text-muted">{campaign.subtitle}</p>
            ) : null}

            {products.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/producto/$id"
                      params={{ id: p.id }}
                      onClick={dismissPopup}
                      className="flex gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-gold"
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt=""
                          className="size-16 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="size-16 shrink-0 rounded-lg bg-border" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{p.name}</span>
                        <span className="block text-xs text-subtle">{p.scentName}</span>
                        <span className="mt-1 block text-sm tabular-nums">
                          {formatPrice(p.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-muted">
                Explora la colección de temporada en el catálogo.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild className="flex-1">
                <Link to="/catalogo" search={catalogSearch} onClick={dismissPopup}>
                  {campaign.ctaLabel}
                </Link>
              </Button>
              <Button type="button" variant="ghost" onClick={dismissPopup}>
                Ahora no
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
