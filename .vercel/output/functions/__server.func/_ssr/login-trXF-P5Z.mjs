import { o as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as useCurrentUserState, n as checkAdminAccess, t as Ornament } from "./ornament-BtZfPFdQ.mjs";
import { t as GoogleSignIn } from "./google-sign-in-B2JcHwj6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-trXF-P5Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [access, setAccess] = (0, import_react.useState)("pending");
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setAccess("need-google");
			return;
		}
		let cancelled = false;
		checkAdminAccess().then((result) => {
			if (cancelled) return;
			if (result.allowed) setAccess("ok");
			else if (result.reason === "google") setAccess("need-google");
			else setAccess("other");
		}).catch(() => {
			if (!cancelled) setAccess("need-google");
		});
		return () => {
			cancelled = true;
		};
	}, [isPending, user]);
	if (isPending || access === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[60vh] place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-64 animate-pulse rounded-lg bg-surface" })
	});
	if (access === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] uppercase text-gold",
				children: "La casa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-headline",
				children: "Administración"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ornament, { className: "mt-5" }),
			access === "other" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Esta cuenta de Google no abre el atelier. Entra con la cuenta de la casa."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "El catálogo, los aromas, los colores y el stock solo se abren con una cuenta de Google. Una sesión de Grok no basta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignIn, {})
		]
	});
}
//#endregion
export { Login as component };
