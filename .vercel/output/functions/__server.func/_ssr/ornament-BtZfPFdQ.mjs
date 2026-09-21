import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { t as authMiddleware } from "./middleware-DXwfb4QQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-B0F86nbd.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide transition-[background-color,color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:bg-primary-hover",
			gold: "bg-gold text-gold-fg hover:bg-gold-hover",
			outline: "border border-border-strong bg-transparent text-fg hover:bg-surface",
			ghost: "bg-transparent text-fg hover:bg-surface"
		},
		size: {
			sm: "h-11 px-4 text-sm rounded-md",
			md: "h-11 px-5 text-sm rounded-lg",
			lg: "h-12 px-7 text-sm rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-DG6UNzh9.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-api-D92IxiXV.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var checkAdminAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a931c7c111fb6ea7d3d140b8071680e6212a1e3357df50b8d5afd7ef5eef52f4"));
var listCatalog = createServerFn({ method: "GET" }).handler(createSsrRpc("4044a1f5995b7c1569ee4628878864346271100fdb209a41505991c8122d320b"));
var getCatalogProduct = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("e65ce1495d82a47b8123b1bf5eb4cf708cdd2c3bc57538185774ce657fc71708"));
var loadAdmin = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d496174311adb0ca8966038438c5f4f035cbcd66fd1c4e07e85ced86d5acf91c"));
var saveProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fc7dfc3b8fb495dd0e1d0374050cf78f54e839db00aa826343c10dce1e62f555"));
var deleteProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("dcc17cec3e8a122fdb87c657b631b012e66361cf4650c7dc39f1e1ff59c52434"));
var saveScent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fb7498ea89ad4495508b9db11de2bd823fb2299b62cb8fc3b869109f8fed29f7"));
var deleteScent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("5edf3b3c7ec4f92c946bab7a627532ebad06a7a6a3a45b9151a3c4d9a2e048ee"));
var saveColor = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("39efeb466a88716270e11952d5d6f12c48132b34568a4d192bb0eb4ac8c57a0b"));
var deleteColor = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("0fbd961fe8b8ef2b3aa8e6a66b4db1256af69898c327425ed60ff64212f0c8f1"));
var placeOrder = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7cb74a741bd6380275b9d45c48e74052ea5a52499424f308eac670f46de18b06"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ornament-BtZfPFdQ.js
function CandleMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 16 20",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-gold", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 1.4c.8 1.1.9 2.1 0 3.2-.9-1.1-.8-2.1 0-3.2Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 4.6v1.8M4.2 8.2h7.6v8.2c0 .9-.8 1.6-1.7 1.6H5.9c-.9 0-1.7-.7-1.7-1.6V8.2Z",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.6 10.2h4.8v5.4c0 .4-.4.8-.8.8H6.4c-.4 0-.8-.4-.8-.8v-5.4Z",
				fill: "currentColor",
				opacity: "0.35"
			})
		]
	});
}
function Ornament({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-center gap-3 text-gold", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleMark, { className: "h-4 w-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/70" })
		]
	});
}
//#endregion
export { deleteScent as a, loadAdmin as c, saveProduct as d, saveScent as f, cn as g, Button as h, deleteProduct as i, placeOrder as l, useCurrentUserState as m, checkAdminAccess as n, getCatalogProduct as o, useCurrentUser as p, deleteColor as r, listCatalog as s, Ornament as t, saveColor as u };
