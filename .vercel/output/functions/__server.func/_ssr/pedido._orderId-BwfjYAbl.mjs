import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as Ornament, t as Button } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Check, u as Copy } from "../_libs/lucide-react.mjs";
import { a as EmptyState, o as BANK, r as Route$1, s as STORE } from "./router-D25UkTNE.mjs";
import { n as formatPrice, t as formatDate } from "./format-DPQ7lO7W.mjs";
import { n as getOrder } from "./orders-DT7nml62.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pedido._orderId-BwfjYAbl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const { orderId } = Route$1.useParams();
	const [order, setOrder] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setOrder(getOrder(orderId) ?? null);
	}, [orderId]);
	if (order === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "mx-auto max-w-3xl px-4 py-16 sm:px-6" });
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No encontramos ese pedido",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					children: "Volver al catálogo"
				})
			}),
			children: "El número no está en este dispositivo. Si acabas de pedir, no cierres la pestaña hasta copiar los datos bancarios."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-xs tracking-[0.22em] uppercase text-gold",
				children: "Pedido recibido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display mt-3 text-center text-headline",
				children: ["Gracias, ", order.customer.name.split(" ")[0]]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-lg text-center text-muted",
				children: "Tu orden quedó reservada. Transfiere el total y envíanos el comprobante para preparar el envío."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-xl border border-gold/40 bg-raised px-6 py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] uppercase text-gold",
						children: "Número de orden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-2 text-4xl tracking-wide",
						children: order.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-subtle",
						children: formatDate(order.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
							value: order.id,
							label: "Copiar número"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-title",
						children: "Transferencia o depósito"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Usa el número de orden como concepto. El pedido se pone en marcha cuando llega el comprobante."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Banco",
								value: BANK.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Titular",
								value: BANK.holder,
								copy: BANK.holder
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "CLABE",
								value: BANK.clabeDisplay,
								copy: BANK.clabe
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Cuenta",
								value: BANK.accountDisplay,
								copy: BANK.account
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Concepto",
								value: order.id,
								copy: order.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Monto",
								value: formatPrice(order.total)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-title",
					children: "Qué sigue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-4 space-y-3 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"1. Transfiere ",
							formatPrice(order.total),
							" a la CLABE de arriba."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"2. Envía el comprobante a",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-fg underline-offset-2 hover:underline",
								href: `mailto:${STORE.email}`,
								children: STORE.email
							}),
							" ",
							"o por WhatsApp al ",
							STORE.whatsapp,
							", con tu número ",
							order.id,
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. Preparamos tu caja en 1 a 3 días hábiles y te avisamos al enviar." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-title",
						children: "Tu pedido"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: order.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: line.image,
									alt: "",
									className: "size-14 rounded-md object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: line.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-subtle tabular-nums",
										children: ["× ", line.quantity]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tabular-nums",
									children: formatPrice(line.price * line.quantity)
								})
							]
						}, line.productId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between border-t border-border pt-3 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total a transferir" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatPrice(order.total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: ["Envío a ", order.customer.address]
					}),
					order.customer.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["Nota: ", order.customer.notes]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogo",
						children: "Seguir viendo"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/como-comprar",
						children: "Leer cómo comprar"
					})
				})]
			})
		]
	});
}
function Row({ label, value, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-0.5 font-medium tabular-nums",
			children: value
		})] }), copy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
			value: copy,
			label: "Copiar"
		}) : null]
	});
}
function CopyButton({ value, label }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: async () => {
			try {
				await navigator.clipboard.writeText(value);
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			} catch {
				setCopied(false);
			}
		},
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copiado" : label]
	});
}
//#endregion
export { OrderPage as component };
