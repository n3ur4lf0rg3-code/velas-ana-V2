import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DXwfb4QQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-api-C5qRZPoj.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ForbiddenError = class extends Error {
	status = 403;
	constructor() {
		super("Forbidden");
		this.name = "ForbiddenError";
	}
};
function parseNotes(raw) {
	try {
		const value = JSON.parse(raw);
		if (!Array.isArray(value)) return [];
		return value.filter((item) => typeof item === "string");
	} catch {
		return [];
	}
}
function mapProduct(row) {
	return {
		id: row.id,
		name: row.name,
		tagline: row.tagline,
		description: row.description,
		care: row.care,
		price: Number(row.price),
		stock: Number(row.stock),
		shape: row.shape,
		scentId: row.scent_id,
		scentName: row.scent_name,
		colorId: row.color_id,
		colorName: row.color_name,
		colorHex: row.color_hex,
		notes: parseNotes(row.notes),
		burnHours: row.burn_hours,
		weight: row.weight,
		featured: Boolean(row.featured),
		isNew: Boolean(row.is_new),
		image: row.image
	};
}
var PRODUCT_SELECT = `
  select p.id, p.name, p.tagline, p.description, p.care, p.price, p.stock, p.shape,
    p.scent_id, s.name as scent_name, p.color_id, c.name as color_name, c.hex as color_hex,
    p.notes, p.burn_hours, p.weight, p.featured, p.is_new, p.image
  from products p
  join scents s on s.id = p.scent_id
  join colors c on c.id = p.color_id
`;
async function fetchCatalog() {
	const sql = await getSql();
	const productRows = await sql.query(`${PRODUCT_SELECT} order by p.featured desc, p.name`);
	const scentRows = await sql.query("select id, name from scents order by sort_order, name");
	const colorRows = await sql.query("select id, name, hex from colors order by sort_order, name");
	return {
		products: productRows.map(mapProduct),
		scents: scentRows,
		colors: colorRows
	};
}
var GOOGLE_PROVIDER = "grok-google";
async function hasGoogleAccount(userId) {
	return ((await (await getSql()).query(`select count(*)::int as n from account where "userId" = $1 and "providerId" = $2`, [userId, GOOGLE_PROVIDER]))[0]?.n ?? 0) > 0;
}
async function ensureAdmin(userId) {
	if (!await hasGoogleAccount(userId)) throw new ForbiddenError();
	const sql = await getSql();
	if ((await sql.query("select user_id from store_admins limit 1")).length === 0) {
		await sql.query("insert into store_admins (user_id) values ($1)", [userId]);
		return;
	}
	if ((await sql.query("select user_id from store_admins where user_id = $1", [userId])).length === 0) throw new ForbiddenError();
}
var checkAdminAccess_createServerFn_handler = createServerRpc({
	id: "a931c7c111fb6ea7d3d140b8071680e6212a1e3357df50b8d5afd7ef5eef52f4",
	name: "checkAdminAccess",
	filename: "src/lib/catalog-api.ts"
}, (opts) => checkAdminAccess.__executeServer(opts));
var checkAdminAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(checkAdminAccess_createServerFn_handler, async ({ context }) => {
	if (!await hasGoogleAccount(context.userId)) return {
		allowed: false,
		reason: "google"
	};
	const sql = await getSql();
	if ((await sql.query("select user_id from store_admins limit 1")).length === 0) return {
		allowed: true,
		reason: "ok"
	};
	if ((await sql.query("select user_id from store_admins where user_id = $1", [context.userId])).length === 0) return {
		allowed: false,
		reason: "admin"
	};
	return {
		allowed: true,
		reason: "ok"
	};
});
function slugify(name) {
	const base = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
	const suffix = Math.random().toString(36).slice(2, 6);
	return `${base || "pieza"}-${suffix}`;
}
var listCatalog_createServerFn_handler = createServerRpc({
	id: "4044a1f5995b7c1569ee4628878864346271100fdb209a41505991c8122d320b",
	name: "listCatalog",
	filename: "src/lib/catalog-api.ts"
}, (opts) => listCatalog.__executeServer(opts));
var listCatalog = createServerFn({ method: "GET" }).handler(listCatalog_createServerFn_handler, async () => fetchCatalog());
var getCatalogProduct_createServerFn_handler = createServerRpc({
	id: "e65ce1495d82a47b8123b1bf5eb4cf708cdd2c3bc57538185774ce657fc71708",
	name: "getCatalogProduct",
	filename: "src/lib/catalog-api.ts"
}, (opts) => getCatalogProduct.__executeServer(opts));
var getCatalogProduct = createServerFn({ method: "GET" }).validator((id) => id).handler(getCatalogProduct_createServerFn_handler, async ({ data: id }) => {
	const row = (await (await getSql()).query(`${PRODUCT_SELECT} where p.id = $1`, [id]))[0];
	return row ? mapProduct(row) : null;
});
function cleanProductInput(input) {
	const name = input.name.trim();
	const price = Math.max(0, Math.round(Number(input.price) || 0));
	const stock = Math.max(0, Math.round(Number(input.stock) || 0));
	if (name.length < 2) throw new Error("Escribe el nombre de la pieza");
	if (!input.scentId) throw new Error("Elige un aroma");
	if (!input.colorId) throw new Error("Elige un color");
	if (!input.shape) throw new Error("Elige una forma");
	return {
		...input,
		name,
		tagline: input.tagline.trim(),
		description: input.description.trim(),
		care: input.care.trim(),
		price,
		stock,
		notes: input.notes.map((n) => n.trim()).filter(Boolean),
		burnHours: input.burnHours.trim(),
		weight: input.weight.trim(),
		image: input.image.trim()
	};
}
var loadAdmin_createServerFn_handler = createServerRpc({
	id: "d496174311adb0ca8966038438c5f4f035cbcd66fd1c4e07e85ced86d5acf91c",
	name: "loadAdmin",
	filename: "src/lib/catalog-api.ts"
}, (opts) => loadAdmin.__executeServer(opts));
var loadAdmin = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadAdmin_createServerFn_handler, async ({ context }) => {
	await ensureAdmin(context.userId);
	const catalog = await fetchCatalog();
	const sql = await getSql();
	const orderRows = await sql.query("select id, created_at, customer_name, customer_email, customer_phone, customer_address, notes, total, status from orders order by created_at desc");
	const lineRows = await sql.query("select order_id, product_id, name, price, quantity, image from order_lines");
	const orders = orderRows.map((row) => ({
		id: row.id,
		createdAt: typeof row.created_at === "string" ? row.created_at : new Date(row.created_at).toISOString(),
		customer: {
			name: row.customer_name,
			email: row.customer_email,
			phone: row.customer_phone,
			address: row.customer_address,
			notes: row.notes
		},
		lines: lineRows.filter((line) => line.order_id === row.id).map((line) => ({
			productId: line.product_id,
			name: line.name,
			price: Number(line.price),
			quantity: Number(line.quantity),
			image: line.image
		})),
		total: Number(row.total)
	}));
	return {
		...catalog,
		orders
	};
});
var saveProduct_createServerFn_handler = createServerRpc({
	id: "fc7dfc3b8fb495dd0e1d0374050cf78f54e839db00aa826343c10dce1e62f555",
	name: "saveProduct",
	filename: "src/lib/catalog-api.ts"
}, (opts) => saveProduct.__executeServer(opts));
var saveProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveProduct_createServerFn_handler, async ({ context, data }) => {
	await ensureAdmin(context.userId);
	const product = cleanProductInput(data);
	const sql = await getSql();
	const id = product.id?.trim() || slugify(product.name);
	const notes = JSON.stringify(product.notes);
	const existing = await sql.query("select id, image from products where id = $1", [id]);
	const image = product.image || existing[0]?.image || "";
	if (existing[0]) await sql.query(`update products set
          name=$2, tagline=$3, description=$4, care=$5, price=$6, stock=$7, shape=$8,
          scent_id=$9, color_id=$10, notes=$11, burn_hours=$12, weight=$13,
          featured=$14, is_new=$15, image=$16
         where id=$1`, [
		id,
		product.name,
		product.tagline,
		product.description,
		product.care,
		product.price,
		product.stock,
		product.shape,
		product.scentId,
		product.colorId,
		notes,
		product.burnHours,
		product.weight,
		product.featured,
		product.isNew,
		image
	]);
	else await sql.query(`insert into products (
          id, name, tagline, description, care, price, stock, shape, scent_id, color_id,
          notes, burn_hours, weight, featured, is_new, image
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`, [
		id,
		product.name,
		product.tagline,
		product.description,
		product.care,
		product.price,
		product.stock,
		product.shape,
		product.scentId,
		product.colorId,
		notes,
		product.burnHours,
		product.weight,
		product.featured,
		product.isNew,
		image
	]);
	return { id };
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "dcc17cec3e8a122fdb87c657b631b012e66361cf4650c7dc39f1e1ff59c52434",
	name: "deleteProduct",
	filename: "src/lib/catalog-api.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteProduct_createServerFn_handler, async ({ context, data: id }) => {
	await ensureAdmin(context.userId);
	await (await getSql()).query("delete from products where id = $1", [id]);
});
var saveScent_createServerFn_handler = createServerRpc({
	id: "fb7498ea89ad4495508b9db11de2bd823fb2299b62cb8fc3b869109f8fed29f7",
	name: "saveScent",
	filename: "src/lib/catalog-api.ts"
}, (opts) => saveScent.__executeServer(opts));
var saveScent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveScent_createServerFn_handler, async ({ context, data }) => {
	await ensureAdmin(context.userId);
	const name = data.name.trim();
	if (name.length < 2) throw new Error("Escribe el nombre del aroma");
	const sql = await getSql();
	const id = data.id?.trim() || slugify(name);
	await sql.query(`insert into scents (id, name, sort_order) values ($1, $2, 50)
       on conflict (id) do update set name = excluded.name`, [id, name]);
	return { id };
});
var deleteScent_createServerFn_handler = createServerRpc({
	id: "5edf3b3c7ec4f92c946bab7a627532ebad06a7a6a3a45b9151a3c4d9a2e048ee",
	name: "deleteScent",
	filename: "src/lib/catalog-api.ts"
}, (opts) => deleteScent.__executeServer(opts));
var deleteScent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteScent_createServerFn_handler, async ({ context, data: id }) => {
	await ensureAdmin(context.userId);
	const sql = await getSql();
	if (((await sql.query("select count(*)::int as n from products where scent_id = $1", [id]))[0]?.n ?? 0) > 0) throw new Error("Hay velas con este aroma. Cámbialas antes de borrar.");
	await sql.query("delete from scents where id = $1", [id]);
});
var saveColor_createServerFn_handler = createServerRpc({
	id: "39efeb466a88716270e11952d5d6f12c48132b34568a4d192bb0eb4ac8c57a0b",
	name: "saveColor",
	filename: "src/lib/catalog-api.ts"
}, (opts) => saveColor.__executeServer(opts));
var saveColor = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveColor_createServerFn_handler, async ({ context, data }) => {
	await ensureAdmin(context.userId);
	const name = data.name.trim();
	let hex = data.hex.trim().toUpperCase();
	if (!hex.startsWith("#")) hex = `#${hex}`;
	if (name.length < 2) throw new Error("Escribe el nombre del color");
	if (!/^#[0-9A-F]{6}$/.test(hex)) throw new Error("Usa un color en formato #RRGGBB");
	const sql = await getSql();
	const id = data.id?.trim() || slugify(name);
	await sql.query(`insert into colors (id, name, hex, sort_order) values ($1, $2, $3, 50)
       on conflict (id) do update set name = excluded.name, hex = excluded.hex`, [
		id,
		name,
		hex
	]);
	return { id };
});
var deleteColor_createServerFn_handler = createServerRpc({
	id: "0fbd961fe8b8ef2b3aa8e6a66b4db1256af69898c327425ed60ff64212f0c8f1",
	name: "deleteColor",
	filename: "src/lib/catalog-api.ts"
}, (opts) => deleteColor.__executeServer(opts));
var deleteColor = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteColor_createServerFn_handler, async ({ context, data: id }) => {
	await ensureAdmin(context.userId);
	const sql = await getSql();
	if (((await sql.query("select count(*)::int as n from products where color_id = $1", [id]))[0]?.n ?? 0) > 0) throw new Error("Hay velas con este color. Cámbialas antes de borrar.");
	await sql.query("delete from colors where id = $1", [id]);
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "7cb74a741bd6380275b9d45c48e74052ea5a52499424f308eac670f46de18b06",
	name: "placeOrder",
	filename: "src/lib/catalog-api.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).validator((input) => input).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	const name = data.customer.name.trim();
	const email = data.customer.email.trim();
	const phone = data.customer.phone.trim();
	const address = data.customer.address.trim();
	const notes = data.customer.notes.trim();
	if (name.length < 2) throw new Error("Escribe tu nombre completo");
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Escribe un correo válido");
	if (phone.replace(/\D/g, "").length < 10) throw new Error("Escribe un teléfono a 10 dígitos");
	if (address.length < 12) throw new Error("Incluye calle, colonia, ciudad y código postal");
	if (data.items.length === 0) throw new Error("El carrito está vacío");
	const sql = await getSql();
	const lines = [];
	let total = 0;
	for (const item of data.items) {
		const qty = Math.max(1, Math.round(item.quantity));
		const product = (await sql.query("select id, name, price, stock, image from products where id = $1", [item.productId]))[0];
		if (!product) throw new Error("Una pieza del carrito ya no está en el catálogo");
		if (Number(product.stock) < qty) throw new Error(`No hay suficiente ${product.name}. Quedan ${product.stock}.`);
		if (!(await sql.query("update products set stock = stock - $2 where id = $1 and stock >= $2 returning id", [product.id, qty]))[0]) throw new Error(`No hay suficiente ${product.name}.`);
		const price = Number(product.price);
		lines.push({
			productId: product.id,
			name: product.name,
			price,
			quantity: qty,
			image: product.image
		});
		total += price * qty;
	}
	const id = `VA-${Math.floor(1e3 + Math.random() * 9e3)}`;
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	await sql.query(`insert into orders (id, created_at, customer_name, customer_email, customer_phone, customer_address, notes, total)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`, [
		id,
		createdAt,
		name,
		email,
		phone,
		address,
		notes,
		total
	]);
	for (const line of lines) await sql.query(`insert into order_lines (order_id, product_id, name, price, quantity, image)
         values ($1, $2, $3, $4, $5, $6)`, [
		id,
		line.productId,
		line.name,
		line.price,
		line.quantity,
		line.image
	]);
	return {
		id,
		createdAt,
		customer: {
			name,
			email,
			phone,
			address,
			notes
		},
		lines,
		total
	};
});
//#endregion
export { checkAdminAccess_createServerFn_handler, deleteColor_createServerFn_handler, deleteProduct_createServerFn_handler, deleteScent_createServerFn_handler, getCatalogProduct_createServerFn_handler, listCatalog_createServerFn_handler, loadAdmin_createServerFn_handler, placeOrder_createServerFn_handler, saveColor_createServerFn_handler, saveProduct_createServerFn_handler, saveScent_createServerFn_handler };
