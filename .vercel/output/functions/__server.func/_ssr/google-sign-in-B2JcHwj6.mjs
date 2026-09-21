import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Button } from "./ornament-BtZfPFdQ.mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-C_5aHzOR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/google-sign-in-B2JcHwj6.js
var import_jsx_runtime = require_jsx_runtime();
function GoogleSignIn({ callbackURL = "/admin", className }) {
	const google = GROK_PROVIDERS.find((provider) => provider.idp === "google");
	if (!google) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-8 text-sm text-muted",
		children: "El acceso no está disponible."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "lg",
		className: className ?? "mt-8 w-full",
		onClick: () => void signIn(google.providerId, { callbackURL }),
		children: "Continuar con Google"
	});
}
//#endregion
export { GoogleSignIn as t };
