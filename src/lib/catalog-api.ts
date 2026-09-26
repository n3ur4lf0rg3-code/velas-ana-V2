import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type { Product, Scent, WaxColor } from "@/lib/products";
import type { Order } from "@/lib/orders";

export class ForbiddenError extends Error {
  readonly status = 403;
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenError";
  }
}

type ProductRow = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  stock: number;
  shape: string;
  scent_id: string;
  scent_name: string;
  color_id: string;
  color_name: string;
  color_hex: string;
  notes: string;
  burn_hours: string;
  weight: string;
  featured: boolean;
  is_new: boolean;
  image: string;
  available_color_ids: string | null;
};

function parseNotes(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function parseIdList(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function mapProduct(row: ProductRow): Product {
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
    image: row.image,
    availableColorIds: parseIdList(row.available_color_ids),
  };
}

const PRODUCT_SELECT = `
  select p.id, p.name, p.tagline, p.description, p.care, p.price, p.stock, p.shape,
    p.scent_id, s.name as scent_name, p.color_id, c.name as color_name, c.hex as color_hex,
    p.notes, p.burn_hours, p.weight, p.featured, p.is_new, p.image,
    coalesce(p.available_color_ids, '[]') as available_color_ids
  from products p
  join scents s on s.id = p.scent_id
  join colors c on c.id = p.color_id
`;

async function fetchCatalog() {
  const sql = await getSql();
  const productRows = await sql.query<ProductRow>(
    `${PRODUCT_SELECT} order by p.featured desc, p.name`,
  );
  const scentRows = await sql.query<{ id: string; name: string }>(
    "select id, name from scents order by sort_order, name",
  );
  const colorRows = await sql.query<{ id: string; name: string; hex: string }>(
    "select id, name, hex from colors order by sort_order, name",
  );
  return {
    products: productRows.map(mapProduct),
    scents: scentRows as Scent[],
    colors: colorRows as WaxColor[],
  };
}

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base || "pieza"}-${suffix}`;
}

export type CatalogPayload = {
  products: Product[];
  scents: Scent[];
  colors: WaxColor[];
};

export const listCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogPayload> => fetchCatalog(),
);

export const getCatalogProduct = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }): Promise<Product | null> => {
    const sql = await getSql();
    const rows = await sql.query<ProductRow>(`${PRODUCT_SELECT} where p.id = $1`, [
      id,
    ]);
    const row = rows[0];
    return row ? mapProduct(row) : null;
  });

export type ProductInput = {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  stock: number;
  shape: string;
  scentId: string;
  colorId: string;
  notes: string[];
  burnHours: string;
  weight: string;
  featured: boolean;
  isNew: boolean;
  image: string;
  availableColorIds: string[];
};

function cleanProductInput(input: ProductInput): ProductInput {
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
    image: input.image.trim(),
    availableColorIds: (input.availableColorIds ?? []).filter(Boolean),
  };
}

/** Admin: acceso controlado en el cliente con Firebase Auth */
export const loadAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const catalog = await fetchCatalog();
  const sql = await getSql();
  const orderRows = await sql.query<{
    id: string;
    created_at: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    notes: string;
    total: number;
    status: string;
  }>(
    "select id, created_at, customer_name, customer_email, customer_phone, customer_address, notes, total, status from orders order by created_at desc",
  );
  const lineRows = await sql.query<{
    order_id: string;
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>("select order_id, product_id, name, price, quantity, image from order_lines");
  const orders: Order[] = orderRows.map((row) => ({
    id: row.id,
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : new Date(row.created_at).toISOString(),
    customer: {
      name: row.customer_name,
      email: row.customer_email,
      phone: row.customer_phone,
      address: row.customer_address,
      notes: row.notes,
    },
    lines: lineRows
      .filter((line) => line.order_id === row.id)
      .map((line) => ({
        productId: line.product_id,
        name: line.name,
        price: Number(line.price),
        quantity: Number(line.quantity),
        image: line.image,
      })),
    total: Number(row.total),
  }));
  return { ...catalog, orders };
});

export const saveProduct = createServerFn({ method: "POST" })
  .validator((input: ProductInput) => input)
  .handler(async ({ data }) => {
    const product = cleanProductInput(data);
    const sql = await getSql();
    const id = product.id?.trim() || slugify(product.name);
    const notes = JSON.stringify(product.notes);
    const availableColorIds = JSON.stringify(product.availableColorIds);
    const existing = await sql.query<{ id: string; image: string }>(
      "select id, image from products where id = $1",
      [id],
    );
    const image = product.image || existing[0]?.image || "";
    if (existing[0]) {
      await sql.query(
        `update products set
          name=$2, tagline=$3, description=$4, care=$5, price=$6, stock=$7, shape=$8,
          scent_id=$9, color_id=$10, notes=$11, burn_hours=$12, weight=$13,
          featured=$14, is_new=$15, image=$16, available_color_ids=$17
         where id=$1`,
        [
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
          image,
          availableColorIds,
        ],
      );
    } else {
      await sql.query(
        `insert into products (
          id, name, tagline, description, care, price, stock, shape, scent_id, color_id,
          notes, burn_hours, weight, featured, is_new, image, available_color_ids
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [
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
          image,
          availableColorIds,
        ],
      );
    }
    return { id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql.query("delete from products where id = $1", [id]);
  });

export const saveScent = createServerFn({ method: "POST" })
  .validator((input: { id?: string; name: string }) => input)
  .handler(async ({ data }) => {
    const name = data.name.trim();
    if (name.length < 2) throw new Error("Escribe el nombre del aroma");
    const sql = await getSql();
    const id = data.id?.trim() || slugify(name);
    await sql.query(
      `insert into scents (id, name, sort_order) values ($1, $2, 50)
       on conflict (id) do update set name = excluded.name`,
      [id, name],
    );
    return { id };
  });

export const deleteScent = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const used = await sql.query<{ n: number }>(
      "select count(*)::int as n from products where scent_id = $1",
      [id],
    );
    if ((used[0]?.n ?? 0) > 0) {
      throw new Error("Hay velas con este aroma. Cámbialas antes de borrar.");
    }
    await sql.query("delete from scents where id = $1", [id]);
  });

export const saveColor = createServerFn({ method: "POST" })
  .validator((input: { id?: string; name: string; hex: string }) => input)
  .handler(async ({ data }) => {
    const name = data.name.trim();
    let hex = data.hex.trim().toUpperCase();
    if (!hex.startsWith("#")) hex = `#${hex}`;
    if (name.length < 2) throw new Error("Escribe el nombre del color");
    if (!/^#[0-9A-F]{6}$/.test(hex)) throw new Error("Usa un color en formato #RRGGBB");
    const sql = await getSql();
    const id = data.id?.trim() || slugify(name);
    await sql.query(
      `insert into colors (id, name, hex, sort_order) values ($1, $2, $3, 50)
       on conflict (id) do update set name = excluded.name, hex = excluded.hex`,
      [id, name, hex],
    );
    return { id };
  });

export const deleteColor = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const used = await sql.query<{ n: number }>(
      "select count(*)::int as n from products where color_id = $1",
      [id],
    );
    if ((used[0]?.n ?? 0) > 0) {
      throw new Error("Hay velas con este color. Cámbialas antes de borrar.");
    }
    await sql.query("delete from colors where id = $1", [id]);
  });

export type CheckoutPayload = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };
  items: {
    productId: string;
    quantity: number;
    scentId?: string;
    scentName?: string;
    colorId?: string;
    colorName?: string;
  }[];
};

export const placeOrder = createServerFn({ method: "POST" })
  .validator((input: CheckoutPayload) => input)
  .handler(async ({ data }): Promise<Order> => {
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
    const lines: Order["lines"] = [];
    let total = 0;

    for (const item of data.items) {
      const qty = Math.max(1, Math.round(item.quantity));
      const rows = await sql.query<{
        id: string;
        name: string;
        price: number;
        stock: number;
        image: string;
      }>("select id, name, price, stock, image from products where id = $1", [
        item.productId,
      ]);
      const product = rows[0];
      if (!product) throw new Error("Una pieza del carrito ya no está en el catálogo");

      const inStock = Number(product.stock);
      const madeToOrder = inStock < qty;

      // Si hay stock, se descuenta. Si no, se pide bajo pedido (2–3 días).
      if (!madeToOrder) {
        const updated = await sql.query<{ id: string }>(
          "update products set stock = stock - $2 where id = $1 and stock >= $2 returning id",
          [product.id, qty],
        );
        if (!updated[0]) {
          throw new Error(`No hay suficiente ${product.name}.`);
        }
      }

      const price = Number(product.price);
      const labelParts = [product.name];
      if (item.scentName) labelParts.push(item.scentName);
      if (item.colorName) labelParts.push(item.colorName);
      if (madeToOrder) labelParts.push("bajo pedido 2–3 días");
      const label = labelParts.join(" · ");

      lines.push({
        productId: product.id,
        name: label,
        price,
        quantity: qty,
        image: product.image,
      });
      total += price * qty;
    }

    const id = `VA-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAt = new Date().toISOString();
    await sql.query(
      `insert into orders (id, created_at, customer_name, customer_email, customer_phone, customer_address, notes, total)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, createdAt, name, email, phone, address, notes, total],
    );
    for (const line of lines) {
      await sql.query(
        `insert into order_lines (order_id, product_id, name, price, quantity, image)
         values ($1, $2, $3, $4, $5, $6)`,
        [id, line.productId, line.name, line.price, line.quantity, line.image],
      );
    }

    return {
      id,
      createdAt,
      customer: { name, email, phone, address, notes },
      lines,
      total,
    };
  });
