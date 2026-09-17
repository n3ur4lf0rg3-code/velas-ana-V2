import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as scentLabel, f as shapeLabel, l as getProduct, t as Button, u as products } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Clock, l as Flame, n as Weight } from "../_libs/lucide-react.mjs";
import { a as EmptyState, n as Route } from "./router-D25UkTNE.mjs";
import { t as QuantitySelector } from "./quantity-selector-DNaCdBS6.mjs";
import { n as formatPrice } from "./format-DPQ7lO7W.mjs";
import { n as Badge, r as ProductCard, t as AddToCartButton } from "./product-card-BlM5LMNP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._id-C_olW4dM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route.useParams();
	const product = getProduct(id);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No encontramos esa vela",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					children: "Ver el catálogo"
				})
			}),
			children: "Puede que se haya agotado el lote. Mira el resto de la colección."
		})
	});
	const related = products.filter((p) => p.id !== product.id && (p.shape === product.shape || p.scent === product.scent)).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogo",
						className: "hover:text-primary",
						children: "Catálogo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-subtle",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: product.name })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.name,
						className: "aspect-portrait w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: shapeLabel(product.shape) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: scentLabel(product.scent) }),
							product.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "text-gold-fg border-gold/40",
								children: "Nueva"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-4 text-headline",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: product.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-2xl font-medium tabular-nums",
						children: formatPrice(product.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 leading-relaxed text-muted",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-1.5 text-sm text-fg",
						children: product.notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-gold" }), note]
						}, note))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-8 grid grid-cols-3 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-raised px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
									className: "flex items-center gap-1.5 text-subtle",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5" }), "Quema"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: product.burnHours
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-raised px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
									className: "flex items-center gap-1.5 text-subtle",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weight, { className: "size-3.5" }), "Peso"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: product.weight
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-raised px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
									className: "flex items-center gap-1.5 text-subtle",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), "Lote"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: "A mano"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantitySelector, {
							value: quantity,
							onChange: setQuantity
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddToCartButton, {
							product,
							quantity,
							size: "md",
							className: "flex-1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-subtle",
						children: product.care
					})
				] })]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-headline",
					children: "También en la mesa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: item }, item.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
