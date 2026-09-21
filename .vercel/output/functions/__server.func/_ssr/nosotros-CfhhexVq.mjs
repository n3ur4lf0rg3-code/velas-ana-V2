import { H as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Button, t as Ornament } from "./ornament-BtZfPFdQ.mjs";
import { f as BrandLogo, u as STORE } from "./router-XIM6apER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nosotros-CfhhexVq.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
					decorative: true,
					className: "h-24 md:h-28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] uppercase text-gold mt-6",
					children: "La casa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-headline",
					children: "Velas Ana"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, { className: "mt-5 justify-start" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 leading-relaxed text-muted",
					children: [
						"Ana trabaja en un atelier pequeño en ",
						STORE.city,
						": cera de soya, mechas de algodón, moldes tratados como flores. La casa nació de querer un objeto que oliera bien y se viera vivo sobre la mesa — no un cilindro anónimo."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 leading-relaxed text-muted",
					children: "Las rosas se construyen pétalo a pétalo. Los frappés se vierten en capas, como un postre. Los wax melts se moldean como bombones porque el gesto de elegir uno y ponerlo a derretir debía sentirse igual de íntimo."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/products/hero.jpg",
					alt: "Velas artesanales de la casa sobre lino y piedra",
					className: "aspect-photo w-full object-cover"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3",
				children: [
					{
						title: "Cera de soya",
						body: "Quema más limpia y lenta que la parafina. La pigmentamos con tintes suaves, nunca neón."
					},
					{
						title: "Aromas de verdad",
						body: "Rosa, jazmín, café, lavanda, vainilla. Notas que se reconocen en una habitación, no en un pasillo de centro comercial."
					},
					{
						title: "Pedido a pedido",
						body: "No hay anaquel infinito. Cuando confirmas la transferencia, esa pieza se reserva y se empaca para ti."
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
			className: "mx-auto max-w-3xl px-4 py-16 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-headline",
					children: "Un lugar en tu mesa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-muted leading-relaxed",
					children: [
						"Si quieres un lote para un evento, un empaque de regalo o un aroma que no está en el catálogo, escríbenos. El correo de la casa es",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-fg underline-offset-2 hover:underline",
							href: `mailto:${STORE.email}`,
							children: STORE.email
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogo",
						children: "Ver la colección"
					})
				})
			]
		})
	] });
}
//#endregion
export { AboutPage as component };
