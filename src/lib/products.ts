export const SHAPES = [
  { id: "rosa", label: "Rosas" },
  { id: "frappe", label: "Frappés y café" },
  { id: "wax-melt", label: "Wax melts" },
  { id: "decorativa", label: "Decorativas" },
] as const;

export type ShapeId = (typeof SHAPES)[number]["id"];

export type Scent = {
  id: string;
  name: string;
};

export type WaxColor = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  /** Igual al SKU (id en BD). */
  id: string;
  /** Código de producto generado del nombre. */
  sku: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  stock: number;
  shape: string;
  scentId: string;
  scentName: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  notes: string[];
  burnHours: string;
  weight: string;
  featured: boolean;
  isNew: boolean;
  image: string;
  availableColorIds: string[];
};

/** Genera SKU a partir del nombre. Ej: "Boo-ñuelo" -> "boo-nuelo-a3k2" */
export function generateSku(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 6);
  return (base || "pieza") + "-" + suffix;
}

export function shapeLabel(id: string) {
  return SHAPES.find((s) => s.id === id)?.label ?? id;
}

export function isShapeId(value: string): value is ShapeId {
  return SHAPES.some((s) => s.id === value);
}
