export const SHAPES = [
  { id: "rosa", label: "Rosas" },
  { id: "frappe", label: "Frappés y café" },
  { id: "wax-melt", label: "Wax melts" },
  { id: "decorativa", label: "Decorativas" },
] as const;

export type ShapeId = (typeof SHAPES)[number]["id"];

export const SCENTS = [
  { id: "rosa", label: "Rosa búlgara" },
  { id: "vainilla", label: "Vainilla" },
  { id: "peonia", label: "Peonía" },
  { id: "ambar", label: "Ámbar" },
  { id: "cafe", label: "Café" },
  { id: "chocolate", label: "Chocolate" },
  { id: "lavanda", label: "Lavanda" },
  { id: "jazmin", label: "Jazmín" },
  { id: "bouquet", label: "Bouquet de la casa" },
] as const;

export type ScentId = (typeof SCENTS)[number]["id"];

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  care: string;
  price: number;
  shape: ShapeId;
  scent: ScentId;
  notes: string[];
  burnHours: string;
  weight: string;
  featured: boolean;
  isNew?: boolean;
  image: string;
};

export const products: Product[] = [
  {
    id: "rosa-encantada",
    name: "Rosa Encantada",
    tagline: "Pétalos de cera en rosa de jardín",
    description:
      "Cada pétalo se vierte y se coloca a mano, como si se abriera una rosa al amanecer. Al encenderla, el aroma de rosa búlgara llena la habitación con una calidez serena, floral y limpia. Pensada para el tocador, la mesa de noche o un regalo que se guarda.",
    care: "Primera quema de dos horas para que la cera se derrita de orilla a orilla. Recorta la mecha a 5 mm antes de cada uso.",
    price: 390,
    shape: "rosa",
    scent: "rosa",
    notes: ["Rosa de Damasco", "Geranio suave", "Madera húmeda"],
    burnHours: "22–25 h",
    weight: "180 g",
    featured: true,
    image: "/products/rosa-encantada.jpg",
  },
  {
    id: "rosa-medianoche",
    name: "Rosa de Medianoche",
    tagline: "Vino, ámbar y pétalos oscuros",
    description:
      "Una rosa esculpida en cera burgundy, más introspectiva. El ámbar y la vainilla envuelven la flor sin endulzarla de más. Ideal para noches lentas, bibliotecas y rincones con luz baja.",
    care: "Colócala sobre un plato de cerámica. No la dejes arder más de cuatro horas seguidas.",
    price: 390,
    shape: "rosa",
    scent: "ambar",
    notes: ["Ámbar", "Vainilla ahumada", "Rosa oscura"],
    burnHours: "22–25 h",
    weight: "180 g",
    featured: false,
    image: "/products/rosa-medianoche.jpg",
  },
  {
    id: "rosa-champagne",
    name: "Rosa Champagne",
    tagline: "Marfil, peonía y un brillo suave",
    description:
      "Pétalos de cera ivory con un destello champagne. La peonía entra primero, luego un fondo de té blanco. Es la rosa más luminosa de la casa: para mesas, bautizos y sobremesas claras.",
    care: "Aléjala de corrientes de aire para que los pétalos se derritan de forma pareja.",
    price: 410,
    shape: "rosa",
    scent: "peonia",
    notes: ["Peonía", "Té blanco", "Bergamota suave"],
    burnHours: "22–25 h",
    weight: "185 g",
    featured: false,
    isNew: true,
    image: "/products/rosa-champagne.jpg",
  },
  {
    id: "frappe-vainilla",
    name: "Frappé de Vainilla",
    tagline: "Un vaso de café, hecho vela",
    description:
      "Vela en forma de frappé: cera de vainilla en capas dentro de un vaso, coronada con un swirl de crema. Parece un postre y huele a vainilla de Madagascar con leche caliente. Pieza de conversación para la cocina o el escritorio.",
    care: "Quema dentro del vaso. No retires la crema de cera: es parte de la vela.",
    price: 450,
    shape: "frappe",
    scent: "vainilla",
    notes: ["Vainilla de Madagascar", "Leche", "Azúcar tostada"],
    burnHours: "35–40 h",
    weight: "280 g",
    featured: true,
    image: "/products/frappe-vainilla.jpg",
  },
  {
    id: "cafe-caramelo",
    name: "Café Caramelo",
    tagline: "Taza de latte con cera de café",
    description:
      "Una taza de cerámica llena de cera color caramelo, con el aroma de espresso recién servido y un hilo de caramelo salado. Se queda como objeto cuando se termina: la taza se puede reutilizar.",
    care: "Deja que la superficie se derrita por completo en la primera quema. La taza puede calentarse: usa un posavasos.",
    price: 450,
    shape: "frappe",
    scent: "cafe",
    notes: ["Espresso", "Caramelo salado", "Canela"],
    burnHours: "35–40 h",
    weight: "260 g",
    featured: false,
    image: "/products/cafe-caramelo.jpg",
  },
  {
    id: "mocha-dulce",
    name: "Mocha Dulce",
    tagline: "Chocolate, café y crema de cera",
    description:
      "Frappé de mocha en cera: capas de chocolate y café, crema en la cima y un polvo que recuerda al cacao. Dulce sin ser empalagoso. Para quienes quieren el ritual del postre sin encender la cocina.",
    care: "No muevas el vaso mientras la cera está líquida. Recorta la mecha cada vez.",
    price: 470,
    shape: "frappe",
    scent: "chocolate",
    notes: ["Cacao", "Café", "Crema"],
    burnHours: "35–40 h",
    weight: "290 g",
    featured: false,
    isNew: true,
    image: "/products/mocha-dulce.jpg",
  },
  {
    id: "bombones-cera",
    name: "Bombones de Cera",
    tagline: "Wax melts con forma de chocolates",
    description:
      "Una caja de bombones que no se comen: trufas, pralinés y tabletas de cera de soya para el quemador. Cada pieza suelta un bouquet distinto — vainilla, rosa y cacao — y dura varias sesiones. El regalo más fácil de la casa.",
    care: "Coloca una pieza en el quemador. Nunca uses llama directa sobre el melt. Una trufa alcanza 8 a 12 horas de aroma.",
    price: 240,
    shape: "wax-melt",
    scent: "bouquet",
    notes: ["Cacao", "Vainilla", "Rosa suave"],
    burnHours: "8–12 h c/u",
    weight: "6 piezas · 120 g",
    featured: true,
    image: "/products/bombones-cera.jpg",
  },
  {
    id: "trufas-lavanda",
    name: "Trufas de Lavanda",
    tagline: "Melt de noche, en forma de trufa",
    description:
      "Trufas de cera en lila, espolvoreadas como un bombón de chocolate blanco. La lavanda de Provenza se abre despacio, con un fondo de algodón limpio. Para el dormitorio y las horas en que se baja la luz.",
    care: "Una trufa por sesión. Deja enfriar el quemador antes de retirar la cera.",
    price: 240,
    shape: "wax-melt",
    scent: "lavanda",
    notes: ["Lavanda", "Algodón", "Madera clara"],
    burnHours: "8–12 h c/u",
    weight: "6 piezas · 120 g",
    featured: false,
    image: "/products/trufas-lavanda.jpg",
  },
  {
    id: "corazon-jazmin",
    name: "Corazón de Jazmín",
    tagline: "Forma de corazón, aroma de noche",
    description:
      "Un corazón de cera satinada en rosa polvo, con mecha de algodón al centro. El jazmín sambac es el aroma: blanco, un poco verde, inolvidable. Se encarga de aniversarios, mesas de bienvenida y cartas que no se escriben.",
    care: "Apóyala en un plato hondo. El corazón se abre desde el centro: deja que el vaso de cera se forme solo.",
    price: 360,
    shape: "decorativa",
    scent: "jazmin",
    notes: ["Jazmín sambac", "Neroli", "Madera de sándalo"],
    burnHours: "18–22 h",
    weight: "160 g",
    featured: true,
    isNew: true,
    image: "/products/corazon-jazmin.jpg",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function shapeLabel(id: ShapeId) {
  return SHAPES.find((s) => s.id === id)?.label ?? id;
}

export function scentLabel(id: ScentId) {
  return SCENTS.find((s) => s.id === id)?.label ?? id;
}

export function productsByShape(shape: ShapeId) {
  return products.filter((p) => p.shape === shape);
}
