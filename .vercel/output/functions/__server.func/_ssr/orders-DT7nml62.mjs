import { s as cartLines } from "./ornament-S6k_KUws.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DT7nml62.js
var KEY = "velas-ana-orders";
function makeOrderId() {
	return `VA-${Math.floor(1e3 + Math.random() * 9e3)}`;
}
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
function createOrder(customer, items) {
	const lines = cartLines(items).map((line) => ({
		productId: line.product.id,
		name: line.product.name,
		price: line.product.price,
		quantity: line.quantity,
		image: line.product.image
	}));
	const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
	return {
		id: makeOrderId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		customer,
		lines,
		total
	};
}
//#endregion
export { getOrder as n, saveOrder as r, createOrder as t };
