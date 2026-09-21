//#region node_modules/.nitro/vite/services/ssr/assets/orders-BESXPY0n.js
var KEY = "velas-ana-orders";
function listOrders() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function getOrder(id) {
	return listOrders().find((order) => order.id === id);
}
function saveOrder(order) {
	const all = listOrders().filter((existing) => existing.id !== order.id);
	all.unshift(order);
	window.localStorage.setItem(KEY, JSON.stringify(all));
}
//#endregion
export { saveOrder as n, getOrder as t };
