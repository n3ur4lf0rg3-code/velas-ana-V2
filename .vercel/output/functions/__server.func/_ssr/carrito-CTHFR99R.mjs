import { c as cartSubtotal, o as cartCount, p as useCart, s as cartLines, t as Button } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Trash2 } from "../_libs/lucide-react.mjs";
import { a as EmptyState } from "./router-D25UkTNE.mjs";
import { t as QuantitySelector } from "./quantity-selector-DNaCdBS6.mjs";
import { n as formatPrice } from "./format-DPQ7lO7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carrito-CTHFR99R.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const items = useCart((s) => s.items);
	const hydrated = useCart((s) => s.hydrated);
	const setQuantity = useCart((s) => s.setQuantity);
	const remove = useCart((s) => s.remove);
	const lines = cartLines(items);
	const total = cartSubtotal(items);
	const count = cartCount(items);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "mx-auto max-w-6xl px-4 py-16 sm:px-6" });
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "El carrito está en calma",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					children: "Elegir una vela"
				})
			}),
			children: "Todavía no hay piezas aquí. El catálogo espera en la otra mesa."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "Pedido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-headline",
				children: "Tu carrito"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted tabular-nums",
				children: [
					count,
					" ",
					count === 1 ? "pieza" : "piezas"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border border-y border-border",
					children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/producto/$id",
							params: { id: line.product.id },
							className: "size-24 shrink-0 overflow-hidden rounded-lg bg-surface sm:size-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: line.product.image,
								alt: "",
								className: "size-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/producto/$id",
									params: { id: line.product.id },
									className: "font-display text-lg hover:text-primary",
									children: line.product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: line.product.tagline
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium tabular-nums",
									children: formatPrice(line.lineTotal)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex items-center justify-between pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuantitySelector, {
									value: line.quantity,
									onChange: (qty) => setQuantity(line.productId, qty)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => remove(line.productId),
									className: "flex size-11 items-center justify-center rounded-md text-muted hover:text-danger",
									"aria-label": `Quitar ${line.product.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})]
						})]
					}, line.productId))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-xl border border-border bg-raised p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-title",
							children: "Resumen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatPrice(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-subtle",
							children: "El envío se confirma al recibir tu transferencia. No hay cargo con tarjeta por ahora."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "mt-6 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								children: "Continuar el pedido"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "mt-2 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalogo",
								children: "Seguir viendo"
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CartPage as component };
