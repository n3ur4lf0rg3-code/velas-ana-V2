import { a as SHAPES, i as SCENTS, n as Ornament, r as cn, u as products } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$5 } from "./router-D25UkTNE.mjs";
import { r as ProductCard } from "./product-card-BlM5LMNP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-5Rc4x5tH.js
var import_jsx_runtime = require_jsx_runtime();
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-full px-4 text-sm transition-colors duration-150", active ? "bg-primary text-primary-fg" : "border border-border bg-raised text-fg hover:border-gold"),
		children
	});
}
function CatalogPage() {
	const { forma, aroma } = Route$5.useSearch();
	const navigate = Route$5.useNavigate();
	const filtered = products.filter((product) => {
		if (forma && product.shape !== forma) return false;
		if (aroma && product.scent !== aroma) return false;
		return true;
	});
	const usedScents = new Set(products.map((p) => p.scent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "Colección"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-headline",
				children: "El catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, { className: "mt-5 justify-start" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Filtra por forma o por aroma. Todas las piezas se hacen por lote pequeño y se reservan al confirmar la transferencia."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs tracking-[0.16em] uppercase text-subtle",
					children: "Forma"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !forma,
						onClick: () => navigate({ search: {
							forma: void 0,
							aroma
						} }),
						children: "Todas"
					}), SHAPES.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: forma === shape.id,
						onClick: () => navigate({ search: {
							forma: forma === shape.id ? void 0 : shape.id,
							aroma
						} }),
						children: shape.label
					}, shape.id))]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs tracking-[0.16em] uppercase text-subtle",
					children: "Aroma"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !aroma,
						onClick: () => navigate({ search: {
							forma,
							aroma: void 0
						} }),
						children: "Todos"
					}), SCENTS.filter((scent) => usedScents.has(scent.id)).map((scent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: aroma === scent.id,
						onClick: () => navigate({ search: {
							forma,
							aroma: aroma === scent.id ? void 0 : scent.id
						} }),
						children: scent.label
					}, scent.id))]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted tabular-nums",
				children: [
					filtered.length,
					" ",
					filtered.length === 1 ? "pieza" : "piezas"
				]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "No hay piezas con esa combinación. Prueba otro aroma o limpia los filtros."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
			})
		]
	});
}
//#endregion
export { CatalogPage as component };
