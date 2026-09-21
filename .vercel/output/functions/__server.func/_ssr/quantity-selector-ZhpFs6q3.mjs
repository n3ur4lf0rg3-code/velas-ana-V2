import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as cn } from "./ornament-BtZfPFdQ.mjs";
import { o as Plus, s as Minus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quantity-selector-ZhpFs6q3.js
var import_jsx_runtime = require_jsx_runtime();
function QuantitySelector({ value, onChange, min = 1, max = 12, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex h-11 items-center rounded-md border border-border bg-raised", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-11 items-center justify-center text-fg hover:text-primary",
				onClick: () => onChange(Math.max(min, value - 1)),
				"aria-label": "Quitar una",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-center text-sm tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-11 items-center justify-center text-fg hover:text-primary",
				onClick: () => onChange(Math.min(max, value + 1)),
				"aria-label": "Agregar una",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
//#endregion
export { QuantitySelector as t };
