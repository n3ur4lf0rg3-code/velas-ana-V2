import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Button, t as Ornament } from "./ornament-BtZfPFdQ.mjs";
import { p as ArrowRight } from "../_libs/lucide-react.mjs";
import { s as Route$10 } from "./router-XIM6apER.mjs";
import { t as SHAPES } from "./products-BBFMn6GJ.mjs";
import { r as ProductCard } from "./product-card-CECIYEZO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PDa3cA3d.js
var import_jsx_runtime = require_jsx_runtime();
var SHAPE_BLURBS = {
	rosa: "Pétalos vertidos uno a uno, como una flor de jardín.",
	frappe: "El café de la tarde, esculpido en cera y vainilla.",
	"wax-melt": "Bombones de cera para el quemador, sin mecha.",
	decorativa: "Formas que se quedan en la mesa cuando se apagan."
};
function Home() {
	const { products } = Route$10.useLoaderData();
	const featured = products.filter((p) => p.featured).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] uppercase text-gold",
					children: "Colección artesanal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-4 text-display italic text-fg",
					children: "Velas que se recuerdan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, { className: "mt-6 justify-start" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-base leading-relaxed text-muted",
					children: "Rosas esculpidas, frappés de vainilla, wax melts como chocolates. Cada pieza de Velas Ana se vierte a mano, con aromas lentos y formas que merecen la mesa."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catalogo",
							children: "Ver el catálogo"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/como-comprar",
							children: "Cómo comprar"
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/products/hero.jpg",
					alt: "Mesa de atelier con velas rosa, un frappé de cera y wax melts",
					className: "aspect-photo w-full object-cover sm:aspect-square lg:aspect-photo"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6",
				children: [
					{
						title: "Hecho a mano",
						body: "Cada pétalo y cada vaso se vierte en el atelier, sin moldes industriales."
					},
					{
						title: "Aroma verdadero",
						body: "Notas botánicas y gourmand, pensadas para habitaciones reales, no para vitrinas."
					},
					{
						title: "Pago sencillo",
						body: "Elige, confirma y transfiere. Te enviamos al recibir el comprobante."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-title",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: item.body
				})] }, item.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] uppercase text-gold",
					children: "Destacadas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-headline",
					children: "La mesa de hoy"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/catalogo",
						className: "hidden sm:inline-flex",
						children: ["Toda la colección", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.22em] uppercase text-gold",
						children: "Formas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-headline",
						children: "Cuatro maneras de encender"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 sm:grid-cols-2",
						children: SHAPES.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/catalogo",
							search: { forma: shape.id },
							className: "group flex items-center justify-between gap-4 rounded-xl border border-border bg-raised px-6 py-7 transition-colors duration-150 hover:border-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-title",
								children: shape.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: SHAPE_BLURBS[shape.id]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5 shrink-0 text-gold transition-transform duration-150 group-hover:translate-x-1" })]
						}, shape.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/products/hero.jpg",
					alt: "Detalle de velas artesanales sobre lino crema",
					className: "aspect-wide w-full object-cover object-bottom"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] uppercase text-gold",
					children: "La casa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-headline",
					children: "Un atelier pequeño, velas lentas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted leading-relaxed",
					children: "Velas Ana nace de la mesa de trabajo de Ana: cera de soya, mechas de algodón y moldes que se tratan como flores. No hay dos rosas iguales. Pedimos con calma y enviamos cuando el depósito llega — así cada pedido se atiende como una pieza, no como una fila."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/nosotros",
						children: "Conocer la casa"
					})
				})
			] })]
		})
	] });
}
//#endregion
export { Home as component };
