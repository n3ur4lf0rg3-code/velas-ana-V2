//#region node_modules/.nitro/vite/services/ssr/assets/products-BBFMn6GJ.js
var SHAPES = [
	{
		id: "rosa",
		label: "Rosas"
	},
	{
		id: "frappe",
		label: "Frappés y café"
	},
	{
		id: "wax-melt",
		label: "Wax melts"
	},
	{
		id: "decorativa",
		label: "Decorativas"
	}
];
function shapeLabel(id) {
	return SHAPES.find((s) => s.id === id)?.label ?? id;
}
//#endregion
export { shapeLabel as n, SHAPES as t };
