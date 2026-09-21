import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as cn } from "./ornament-BtZfPFdQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-DzygO-4r.js
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
//#endregion
export { Label as n, Textarea as r, Input as t };
