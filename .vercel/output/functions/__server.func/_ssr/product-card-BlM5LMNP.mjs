import { d as scentLabel, p as useCart, r as cn, t as Button } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as formatPrice } from "./format-DPQ7lO7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-BlM5LMNP.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium tracking-wide text-muted", className),
		children
	});
}
function AddToCartButton({ product, quantity = 1, size = "lg", compact = false, className }) {
	const add = useCart((s) => s.add);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size,
		className,
		onClick: () => {
			add(product.id, quantity);
			toast.success(`${product.name} se agregó al carrito`);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), compact ? "Agregar" : "Agregar al carrito"]
	});
}
function ProductCard({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/producto/$id",
			params: { id: product.id },
			className: "relative block overflow-hidden rounded-xl bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				className: "aspect-portrait w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
			}), product.isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "absolute top-3 left-3 border-gold/40 bg-raised/90 text-gold-fg",
				children: "Nueva"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] uppercase text-gold",
					children: scentLabel(product.scent)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-title mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/producto/$id",
						params: { id: product.id },
						className: "hover:text-primary transition-colors duration-150",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: product.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between gap-3 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tabular-nums",
						children: formatPrice(product.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddToCartButton, {
						product,
						size: "sm",
						compact: true
					})]
				})
			]
		})]
	});
}
//#endregion
export { Badge as n, ProductCard as r, AddToCartButton as t };
