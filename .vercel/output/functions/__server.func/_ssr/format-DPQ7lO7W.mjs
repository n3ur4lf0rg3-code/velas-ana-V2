//#region node_modules/.nitro/vite/services/ssr/assets/format-DPQ7lO7W.js
function formatPrice(amount) {
	return new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatDate(iso) {
	return new Intl.DateTimeFormat("es-MX", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(new Date(iso));
}
//#endregion
export { formatPrice as n, formatDate as t };
