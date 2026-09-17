import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as cartSubtotal, p as useCart, r as cn, s as cartLines, t as Button } from "./ornament-S6k_KUws.mjs";
import { B as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as EmptyState } from "./router-D25UkTNE.mjs";
import { n as formatPrice } from "./format-DPQ7lO7W.mjs";
import { r as saveOrder, t as createOrder } from "./orders-DT7nml62.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-caA3-mHC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm text-fg", "placeholder:text-subtle transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-rose/50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-sm font-medium text-fg mb-1.5", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-lg border border-border bg-raised px-3.5 py-3 text-sm text-fg", "placeholder:text-subtle transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-rose/50", className),
		...props
	});
}
function validate(values) {
	const errors = {};
	if (values.name.trim().length < 2) errors.name = "Escribe tu nombre completo";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Escribe un correo válido";
	if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Escribe un teléfono a 10 dígitos";
	if (values.address.trim().length < 12) errors.address = "Incluye calle, colonia, ciudad y código postal";
	return errors;
}
function CheckoutPage() {
	const items = useCart((s) => s.items);
	const hydrated = useCart((s) => s.hydrated);
	const clear = useCart((s) => s.clear);
	const navigate = useNavigate();
	const lines = cartLines(items);
	const total = cartSubtotal(items);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "mx-auto max-w-6xl px-4 py-16 sm:px-6" });
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No hay piezas para pedir",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					children: "Ir al catálogo"
				})
			}),
			children: "Agrega una vela al carrito antes de completar tus datos."
		})
	});
	function onSubmit(event) {
		event.preventDefault();
		const nextErrors = validate({
			name,
			email,
			phone,
			address
		});
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		setSubmitting(true);
		const order = createOrder({
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			address: address.trim(),
			notes: notes.trim()
		}, items);
		saveOrder(order);
		clear();
		navigate({
			to: "/pedido/$orderId",
			params: { orderId: order.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "Pedido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-headline",
				children: "Tus datos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: "Al confirmar te damos un número de orden y los datos para transferir. Todavía no hay pago con tarjeta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]",
				noValidate: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nombre completo",
							error: errors.name,
							htmlFor: "name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								name: "name",
								autoComplete: "name",
								value: name,
								onChange: (e) => setName(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Correo",
							error: errors.email,
							htmlFor: "email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								name: "email",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Teléfono",
							error: errors.phone,
							htmlFor: "phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								name: "phone",
								type: "tel",
								autoComplete: "tel",
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dirección de envío",
							error: errors.address,
							htmlFor: "address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "address",
								name: "address",
								autoComplete: "street-address",
								placeholder: "Calle, número, colonia, ciudad, estado y C.P.",
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Notas (opcional)",
							htmlFor: "notes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "notes",
								name: "notes",
								placeholder: "Horario de entrega, empaque de regalo, aroma de recambio…",
								value: notes,
								onChange: (e) => setNotes(e.target.value)
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-xl border border-border bg-raised p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-title",
							children: "Tu mesa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										line.product.name,
										" × ",
										line.quantity
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatPrice(line.lineTotal)
								})]
							}, line.productId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-between border-t border-border pt-4 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatPrice(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							className: "mt-6 w-full",
							disabled: submitting,
							children: "Confirmar pedido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "mt-2 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/carrito",
								children: "Volver al carrito"
							})
						})
					]
				})]
			})
		]
	});
}
function Field({ label, htmlFor, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}),
		children,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-danger",
			children: error
		}) : null
	] });
}
//#endregion
export { CheckoutPage as component };
