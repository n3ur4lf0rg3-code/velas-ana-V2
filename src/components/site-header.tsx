import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/como-comprar", label: "Cómo comprar" },
  { to: "/nosotros", label: "La casa" },
] as const;

function CartLink() {
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const count = hydrated ? cartCount(items) : 0;

  return (
    <Link
      to="/carrito"
      className="relative flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface"
      aria-label={count ? `Carrito, ${count} piezas` : "Carrito"}
    >
      <ShoppingBag className="size-5" />
      {count > 0 ? (
        <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium leading-none text-primary-fg tabular-nums">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-4 px-4 md:h-28 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="Velas Ana, ir al inicio">
          <BrandLogo decorative />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm tracking-wide transition-colors duration-150",
                pathname === item.to ? "text-primary" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <CartLink />
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          className="border-t border-border bg-bg px-4 py-4 md:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-12 items-center text-base",
                    pathname === item.to ? "text-primary" : "text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
