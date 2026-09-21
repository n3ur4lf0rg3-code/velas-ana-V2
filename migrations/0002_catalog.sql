create table if not exists scents (
  id text primary key,
  name text not null,
  sort_order integer not null default 0
);

create table if not exists colors (
  id text primary key,
  name text not null,
  hex text not null default '#C9A3A8',
  sort_order integer not null default 0
);

create table if not exists products (
  id text primary key,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  care text not null default '',
  price integer not null,
  stock integer not null default 0,
  shape text not null,
  scent_id text not null references scents(id),
  color_id text not null references colors(id),
  notes text not null default '[]',
  burn_hours text not null default '',
  weight text not null default '',
  featured boolean not null default false,
  is_new boolean not null default false,
  image text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists store_admins (
  user_id text primary key,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_address text not null,
  notes text not null default '',
  total integer not null,
  status text not null default 'pending_transfer'
);

create table if not exists order_lines (
  id serial primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null,
  name text not null,
  price integer not null,
  quantity integer not null,
  image text not null default ''
);

create index if not exists products_scent_idx on products (scent_id);
create index if not exists products_color_idx on products (color_id);
create index if not exists order_lines_order_idx on order_lines (order_id);

insert into scents (id, name, sort_order) values
  ('rosa', 'Rosa búlgara', 1),
  ('vainilla', 'Vainilla', 2),
  ('peonia', 'Peonía', 3),
  ('ambar', 'Ámbar', 4),
  ('cafe', 'Café', 5),
  ('chocolate', 'Chocolate', 6),
  ('lavanda', 'Lavanda', 7),
  ('jazmin', 'Jazmín', 8),
  ('bouquet', 'Bouquet de la casa', 9)
on conflict (id) do nothing;

insert into colors (id, name, hex, sort_order) values
  ('blush', 'Rosa polvo', '#E8C4C4', 1),
  ('burgundy', 'Burgundy', '#6B2B3A', 2),
  ('champagne', 'Champagne', '#E8D5B5', 3),
  ('vanilla-cream', 'Crema vainilla', '#F3E6C8', 4),
  ('caramel', 'Caramelo', '#C4A070', 5),
  ('mocha', 'Mocha', '#6B4A3A', 6),
  ('cocoa-mix', 'Mix cacao', '#8B5E3C', 7),
  ('lilac', 'Lila', '#C4B0D0', 8),
  ('rose-dust', 'Rosa satín', '#D4A5A9', 9)
on conflict (id) do nothing;

insert into products (
  id, name, tagline, description, care, price, stock, shape, scent_id, color_id,
  notes, burn_hours, weight, featured, is_new, image
) values
(
  'rosa-encantada',
  'Rosa Encantada',
  'Pétalos de cera en rosa de jardín',
  'Cada pétalo se vierte y se coloca a mano, como si se abriera una rosa al amanecer. Al encenderla, el aroma de rosa búlgara llena la habitación con una calidez serena, floral y limpia. Pensada para el tocador, la mesa de noche o un regalo que se guarda.',
  'Primera quema de dos horas para que la cera se derrita de orilla a orilla. Recorta la mecha a 5 mm antes de cada uso.',
  390, 12, 'rosa', 'rosa', 'blush',
  '["Rosa de Damasco","Geranio suave","Madera húmeda"]',
  '22–25 h', '180 g', true, false, '/products/rosa-encantada.jpg'
),
(
  'rosa-medianoche',
  'Rosa de Medianoche',
  'Vino, ámbar y pétalos oscuros',
  'Una rosa esculpida en cera burgundy, más introspectiva. El ámbar y la vainilla envuelven la flor sin endulzarla de más. Ideal para noches lentas, bibliotecas y rincones con luz baja.',
  'Colócala sobre un plato de cerámica. No la dejes arder más de cuatro horas seguidas.',
  390, 8, 'rosa', 'ambar', 'burgundy',
  '["Ámbar","Vainilla ahumada","Rosa oscura"]',
  '22–25 h', '180 g', false, false, '/products/rosa-medianoche.jpg'
),
(
  'rosa-champagne',
  'Rosa Champagne',
  'Marfil, peonía y un brillo suave',
  'Pétalos de cera ivory con un destello champagne. La peonía entra primero, luego un fondo de té blanco. Es la rosa más luminosa de la casa: para mesas, bautizos y sobremesas claras.',
  'Aléjala de corrientes de aire para que los pétalos se derritan de forma pareja.',
  410, 10, 'rosa', 'peonia', 'champagne',
  '["Peonía","Té blanco","Bergamota suave"]',
  '22–25 h', '185 g', false, true, '/products/rosa-champagne.jpg'
),
(
  'frappe-vainilla',
  'Frappé de Vainilla',
  'Un vaso de café, hecho vela',
  'Vela en forma de frappé: cera de vainilla en capas dentro de un vaso, coronada con un swirl de crema. Parece un postre y huele a vainilla de Madagascar con leche caliente. Pieza de conversación para la cocina o el escritorio.',
  'Quema dentro del vaso. No retires la crema de cera: es parte de la vela.',
  450, 9, 'frappe', 'vainilla', 'vanilla-cream',
  '["Vainilla de Madagascar","Leche","Azúcar tostada"]',
  '35–40 h', '280 g', true, false, '/products/frappe-vainilla.jpg'
),
(
  'cafe-caramelo',
  'Café Caramelo',
  'Taza de latte con cera de café',
  'Una taza de cerámica llena de cera color caramelo, con el aroma de espresso recién servido y un hilo de caramelo salado. Se queda como objeto cuando se termina: la taza se puede reutilizar.',
  'Deja que la superficie se derrita por completo en la primera quema. La taza puede calentarse: usa un posavasos.',
  450, 7, 'frappe', 'cafe', 'caramel',
  '["Espresso","Caramelo salado","Canela"]',
  '35–40 h', '260 g', false, false, '/products/cafe-caramelo.jpg'
),
(
  'mocha-dulce',
  'Mocha Dulce',
  'Chocolate, café y crema de cera',
  'Frappé de mocha en cera: capas de chocolate y café, crema en la cima y un polvo que recuerda al cacao. Dulce sin ser empalagoso. Para quienes quieren el ritual del postre sin encender la cocina.',
  'No muevas el vaso mientras la cera está líquida. Recorta la mecha cada vez.',
  470, 6, 'frappe', 'chocolate', 'mocha',
  '["Cacao","Café","Crema"]',
  '35–40 h', '290 g', false, true, '/products/mocha-dulce.jpg'
),
(
  'bombones-cera',
  'Bombones de Cera',
  'Wax melts con forma de chocolates',
  'Una caja de bombones que no se comen: trufas, pralinés y tabletas de cera de soya para el quemador. Cada pieza suelta un bouquet distinto — vainilla, rosa y cacao — y dura varias sesiones. El regalo más fácil de la casa.',
  'Coloca una pieza en el quemador. Nunca uses llama directa sobre el melt. Una trufa alcanza 8 a 12 horas de aroma.',
  240, 20, 'wax-melt', 'bouquet', 'cocoa-mix',
  '["Cacao","Vainilla","Rosa suave"]',
  '8–12 h c/u', '6 piezas · 120 g', true, false, '/products/bombones-cera.jpg'
),
(
  'trufas-lavanda',
  'Trufas de Lavanda',
  'Melt de noche, en forma de trufa',
  'Trufas de cera en lila, espolvoreadas como un bombón de chocolate blanco. La lavanda de Provenza se abre despacio, con un fondo de algodón limpio. Para el dormitorio y las horas en que se baja la luz.',
  'Una trufa por sesión. Deja enfriar el quemador antes de retirar la cera.',
  240, 16, 'wax-melt', 'lavanda', 'lilac',
  '["Lavanda","Algodón","Madera clara"]',
  '8–12 h c/u', '6 piezas · 120 g', false, false, '/products/trufas-lavanda.jpg'
),
(
  'corazon-jazmin',
  'Corazón de Jazmín',
  'Forma de corazón, aroma de noche',
  'Un corazón de cera satinada en rosa polvo, con mecha de algodón al centro. El jazmín sambac es el aroma: blanco, un poco verde, inolvidable. Se encarga de aniversarios, mesas de bienvenida y cartas que no se escriben.',
  'Apóyala en un plato hondo. El corazón se abre desde el centro: deja que el vaso de cera se forme solo.',
  360, 11, 'decorativa', 'jazmin', 'rose-dust',
  '["Jazmín sambac","Neroli","Madera de sándalo"]',
  '18–22 h', '160 g', true, true, '/products/corazon-jazmin.jpg'
)
on conflict (id) do nothing;
