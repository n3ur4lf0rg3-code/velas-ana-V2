import { n as Ornament, t as Button } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as BANK, s as STORE } from "./router-D25UkTNE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/como-comprar-qeaFl5SW.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Elige tus velas",
		body: "Recorre el catálogo. Filtra por forma —rosa, frappé, wax melt o decorativa— o por aroma. Abre cada pieza para ver notas, tiempo de quema y cuidado."
	},
	{
		n: "02",
		title: "Ármalas en el carrito",
		body: "Suma la cantidad que quieras. Puedes volver al catálogo: el carrito se guarda en este dispositivo."
	},
	{
		n: "03",
		title: "Déjanos tus datos",
		body: "Nombre, correo, teléfono, dirección y una nota si el pedido es de regalo. Con eso preparamos la caja y el envío."
	},
	{
		n: "04",
		title: "Recibe tu número de orden",
		body: "Al confirmar aparece un folio —por ejemplo VA-4821— junto con la CLABE. Guárdalo: es el concepto de tu transferencia."
	},
	{
		n: "05",
		title: "Transfiere o deposita",
		body: "Todavía no hay pago con tarjeta. El pago es por transferencia SPEI o depósito bancario, a nombre de la casa."
	},
	{
		n: "06",
		title: "Envía el comprobante",
		body: `Mándalo a ${STORE.email} o por WhatsApp al ${STORE.whatsapp}, con tu número de orden. En 1 a 3 días hábiles sale tu caja, a todo México.`
	}
];
function HowToBuy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "El rito"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-headline",
				children: "Cómo comprar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, { className: "mt-5 justify-start" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted leading-relaxed",
				children: "Velas Ana trabaja por pedido y transferencia. Sin pasarela, sin prisa: tú eliges, nosotras preparamos cuando el depósito llega."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 space-y-8",
				children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_1fr] gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-gold leading-none pt-0.5",
						children: step.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-title",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: step.body
					})] })]
				}, step.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 rounded-xl border border-border bg-raised p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-title",
						children: "Datos para transferir"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Banco"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: BANK.name })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Titular"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right",
									children: BANK.holder
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "CLABE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: BANK.clabeDisplay
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Cuenta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: BANK.accountDisplay
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "El concepto es siempre tu número de orden. El monto, el total de la confirmación."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogo",
						children: "Ir al catálogo"
					})
				})
			})
		]
	});
}
//#endregion
export { HowToBuy as component };
