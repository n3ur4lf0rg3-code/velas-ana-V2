import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type { Product } from "@/lib/products";

export type CampaignTheme =
  | "muertos"
  | "halloween"
  | "navidad"
  | "madres"
  | "custom";

export type Campaign = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  theme: CampaignTheme;
  active: boolean;
  showPopup: boolean;
  showBanner: boolean;
  startsAt: string | null;
  endsAt: string | null;
  productIds: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type ActiveCampaignPayload = {
  campaign: Campaign | null;
  products: Product[];
};

type CampaignRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  theme: string;
  active: boolean;
  show_popup: boolean;
  show_banner: boolean;
  starts_at: string | null;
  ends_at: string | null;
  product_ids: string;
  cta_label: string;
  cta_href: string;
};

function parseIds(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function mapCampaign(row: CampaignRow): Campaign {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    theme: (row.theme as CampaignTheme) || "custom",
    active: Boolean(row.active),
    showPopup: Boolean(row.show_popup),
    showBanner: Boolean(row.show_banner),
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    productIds: parseIds(row.product_ids),
    ctaLabel: row.cta_label,
    ctaHref: row.cta_href,
  };
}

function isInWindow(c: Campaign): boolean {
  const now = Date.now();
  if (c.startsAt && new Date(c.startsAt).getTime() > now) return false;
  if (c.endsAt && new Date(c.endsAt).getTime() < now) return false;
  return true;
}

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || "campana";
}

export const getActiveCampaign = createServerFn({ method: "GET" }).handler(
  async (): Promise<ActiveCampaignPayload> => {
    const sql = await getSql();
    const rows = await sql.query<CampaignRow>(
      `select * from campaigns where active = true order by updated_at desc limit 1`,
    );
    const row = rows[0];
    if (!row) return { campaign: null, products: [] };

    const campaign = mapCampaign(row);
    if (!isInWindow(campaign)) return { campaign: null, products: [] };

    if (campaign.productIds.length === 0) {
      return { campaign, products: [] };
    }

    const placeholders = campaign.productIds.map((_, i) => `$${i + 1}`).join(", ");
    const products = await sql.query<{
      id: string;
      name: string;
      tagline: string;
      price: number;
      stock: number;
      image: string;
      scent_name: string;
    }>(
      `select p.id, p.name, p.tagline, p.price, p.stock, p.image, s.name as scent_name
       from products p
       join scents s on s.id = p.scent_id
       where p.id in (${placeholders})`,
      campaign.productIds,
    );

    const byId = new Map(products.map((p) => [p.id, p]));
    const ordered: Product[] = campaign.productIds
      .map((id) => byId.get(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        description: "",
        care: "",
        price: Number(p.price),
        stock: Number(p.stock),
        shape: "",
        scentId: "",
        scentName: p.scent_name,
        colorId: "",
        colorName: "",
        colorHex: "",
        notes: [],
        burnHours: "",
        weight: "",
        featured: false,
        isNew: false,
        image: p.image,
        availableColorIds: [],
      }));

    return { campaign, products: ordered };
  },
);

export const listCampaigns = createServerFn({ method: "GET" }).handler(
  async (): Promise<Campaign[]> => {
    const sql = await getSql();
    const rows = await sql.query<CampaignRow>(
      `select * from campaigns order by updated_at desc`,
    );
    return rows.map(mapCampaign);
  },
);

export type CampaignInput = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  theme: CampaignTheme;
  active: boolean;
  showPopup: boolean;
  showBanner: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  productIds: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const saveCampaign = createServerFn({ method: "POST" })
  .validator((input: CampaignInput) => input)
  .handler(async ({ data }) => {
    const title = data.title.trim();
    if (title.length < 2) throw new Error("Escribe un título de campaña");

    const sql = await getSql();
    const id = data.id?.trim() || slugify(data.slug || title);

    if (data.active) {
      await sql.query(`update campaigns set active = false where active = true`);
    }

    await sql.query(
      `insert into campaigns (
        id, slug, title, subtitle, theme, active, show_popup, show_banner,
        starts_at, ends_at, product_ids, cta_label, cta_href, updated_at
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, now())
      on conflict (id) do update set
        slug = excluded.slug,
        title = excluded.title,
        subtitle = excluded.subtitle,
        theme = excluded.theme,
        active = excluded.active,
        show_popup = excluded.show_popup,
        show_banner = excluded.show_banner,
        starts_at = excluded.starts_at,
        ends_at = excluded.ends_at,
        product_ids = excluded.product_ids,
        cta_label = excluded.cta_label,
        cta_href = excluded.cta_href,
        updated_at = now()`,
      [
        id,
        (data.slug || title).trim().toLowerCase().replace(/\s+/g, "-"),
        title,
        data.subtitle.trim(),
        data.theme,
        data.active,
        data.showPopup,
        data.showBanner,
        data.startsAt || null,
        data.endsAt || null,
        JSON.stringify(data.productIds ?? []),
        data.ctaLabel.trim() || "Ver colección",
        data.ctaHref.trim() || "/catalogo",
      ],
    );
    return { id };
  });

export const deleteCampaign = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql.query(`delete from campaigns where id = $1`, [id]);
  });
