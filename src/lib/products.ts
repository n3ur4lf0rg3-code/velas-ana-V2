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
  id: string;
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
  /** Ids de colores que el cliente puede elegir. Vacío = todos. */
  availableColorIds: string[];
};

export function shapeLabel(id: string) {
  return SHAPES.find((s) => s.id === id)?.label ?? id;
}

export function isShapeId(value: string): value is ShapeId {
  return SHAPES.some((s) => s.id === value);
}
