create table if not exists campaigns (
  id text primary key,
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  theme text not null default 'muertos',
  active boolean not null default false,
  show_popup boolean not null default true,
  show_banner boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  product_ids text not null default '[]',
  cta_label text not null default 'Ver colección',
  cta_href text not null default '/catalogo',
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_active_idx on campaigns (active) where active = true;
