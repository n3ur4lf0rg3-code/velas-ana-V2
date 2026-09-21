import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { STORE } from "@/lib/bank";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-block" aria-label="Velas Ana, ir al inicio">
            <BrandLogo decorative className="h-20 md:h-24" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Velas aromáticas artesanales esculpidas a mano en {STORE.city}. Rosas,
            frappés, wax melts y formas que se quedan en la mesa.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Casa</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/catalogo" className="hover:text-primary">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/como-comprar" className="hover:text-primary">
                Cómo comprar
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-primary">
                La casa
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-primary">
                Administración
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-gold">Pedido</p>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Pagos por transferencia o depósito bancario. Enviamos a todo México
            al confirmar el comprobante.
          </p>
          <a
            href={`mailto:${STORE.email}`}
            className="mt-3 inline-block text-sm text-fg hover:text-primary"
          >
            {STORE.email}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-subtle sm:px-6">
          © {new Date().getFullYear()} Velas Ana. Hecho a mano, con calma.
        </p>
      </div>
    </footer>
  );
}
