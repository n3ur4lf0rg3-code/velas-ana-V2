import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { AdminProductForm } from "@/components/admin-product-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  isAdminEmail,
  signOutAdmin,
  useFirebaseUser,
} from "@/lib/firebase-auth";
import {
  deleteColor,
  deleteProduct,
  deleteScent,
  loadAdmin,
  saveColor,
  saveProduct,
  saveScent,
  type ProductInput,
} from "@/lib/catalog-api";
import { formatDate, formatPrice } from "@/lib/format";
import type { Order } from "@/lib/orders";
import { shapeLabel, type Product, type Scent, type WaxColor } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Tab = "productos" | "aromas" | "colores" | "pedidos";

function AdminPage() {
  const { user, isPending } = useFirebaseUser();
  const [tab, setTab] = useState<Tab>("productos");
  const [products, setProducts] = useState<Product[]>([]);
  const [scents, setScents] = useState<Scent[]>([]);
  const [colors, setColors] = useState<WaxColor[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "forbidden">("loading");
  const [editing, setEditing] = useState<Product | "new" | null>(null);

  const refresh = useCallback(async () => {
    const data = await loadAdmin();
    setProducts(data.products);
    setScents(data.scents);
    setColors(data.colors);
    setOrders(data.orders);
    setStatus("ready");
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!user || !isAdminEmail(user.email)) {
      setStatus("forbidden");
      return;
    }
    void refresh().catch(() => setStatus("forbidden"));
  }, [isPending, user, refresh]);

  if (isPending || (user && isAdminEmail(user.email) && status === "loading")) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="h-10 w-48 animate-pulse rounded-md bg-surface" />
        <div className="mt-8 h-64 animate-pulse rounded-xl bg-surface" />
      </main>
    );
  }

  if (!user || !isAdminEmail(user.email) || status === "forbidden") {
    return <Navigate to="/login" />;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">Atelier</p>
      <h1 className="font-display mt-2 text-headline">Administración</h1>
      <p className="mt-2 text-sm text-muted">
        Productos, aromas, colores, stock, precios e imágenes. Los cambios se
        ven en la tienda al momento.
      </p>
      <p className="mt-1 text-xs text-subtle">{user.email}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            void signOutAdmin().then(() => window.location.assign("/login"))
          }
        >
          Cerrar sesión
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/">Ver tienda</Link>
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["productos", "Productos"],
            ["aromas", "Aromas"],
            ["colores", "Colores"],
            ["pedidos", "Pedidos"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              setEditing(null);
            }}
            className={cn(
              "h-11 rounded-full px-4 text-sm",
              tab === id
                ? "bg-primary text-primary-fg"
                : "border border-border bg-raised text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "productos" ? (
          editing ? (
            <AdminProductForm
              product={editing === "new" ? null : editing}
              scents={scents}
              colors={colors}
              onCancel={() => setEditing(null)}
              onSave={async (input: ProductInput) => {
                await saveProduct({ data: input });
                setEditing(null);
                await refresh();
              }}
            />
          ) : (
            <ProductsTab
              products={products}
              onNew={() => setEditing("new")}
              onEdit={setEditing}
              onDelete={async (id) => {
                if (!window.confirm("¿Quitar esta pieza del catálogo?")) return;
                await deleteProduct({ data: id });
                await refresh();
              }}
            />
          )
        ) : null}
        {tab === "aromas" ? (
          <ScentTab
            scents={scents}
            onSave={async (input) => {
              await saveScent({ data: input });
              await refresh();
            }}
            onDelete={async (id) => {
              await deleteScent({ data: id });
              await refresh();
            }}
          />
        ) : null}
        {tab === "colores" ? (
          <ColorTab
            colors={colors}
            onSave={async (input) => {
              await saveColor({ data: input });
              await refresh();
            }}
            onDelete={async (id) => {
              await deleteColor({ data: id });
              await refresh();
            }}
          />
        ) : null}
        {tab === "pedidos" ? <OrdersTab orders={orders} /> : null}
      </div>
    </main>
  );
}

function ProductsTab({
  products,
  onNew,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-title">Piezas</h2>
        <Button onClick={onNew}>Nueva pieza</Button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-subtle">
              <th className="py-3 pr-3 font-medium">Pieza</th>
              <th className="py-3 pr-3 font-medium">Aroma</th>
              <th className="py-3 pr-3 font-medium">Color</th>
              <th className="py-3 pr-3 font-medium">Precio</th>
              <th className="py-3 pr-3 font-medium">Stock</th>
              <th className="py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt=""
                        className="size-12 rounded-md object-cover"
                      />
                    ) : (
                      <span className="size-12 rounded-md bg-surface" />
                    )}
                    <div>
                      <p>{product.name}</p>
                      <p className="text-xs text-subtle">{shapeLabel(product.shape)}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-3">{product.scentName}</td>
                <td className="py-3 pr-3">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-3 rounded-full border border-border"
                      style={{ backgroundColor: product.colorHex }}
                    />
                    {product.colorName}
                  </span>
                </td>
                <td className="py-3 pr-3 tabular-nums">{formatPrice(product.price)}</td>
                <td className="py-3 pr-3 tabular-nums">{product.stock}</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => onEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="ml-3 text-sm text-muted hover:text-danger"
                    onClick={() => void onDelete(product.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScentTab({
  scents,
  onSave,
  onDelete,
}: {
  scents: Scent[];
  onSave: (input: { id?: string; name: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Scent | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="max-w-lg">
      <h2 className="font-display text-title">Aromas</h2>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          void onSave({ id: editing?.id, name })
            .then(() => {
              setName("");
              setEditing(null);
            })
            .catch((err: Error) => setError(err.message));
        }}
      >
        <Input
          value={name}
          placeholder={editing ? "Nuevo nombre" : "Nombre del aroma"}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">{editing ? "Actualizar" : "Agregar"}</Button>
      </form>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {scents.map((scent) => (
          <li key={scent.id} className="flex h-14 items-center justify-between gap-3">
            <span>{scent.name}</span>
            <span className="flex gap-3">
              <button
                type="button"
                className="text-sm text-primary"
                onClick={() => {
                  setEditing(scent);
                  setName(scent.name);
                }}
              >
                Editar
              </button>
              <button
                type="button"
                className="text-sm text-muted hover:text-danger"
                onClick={() =>
                  void onDelete(scent.id).catch((err: Error) => setError(err.message))
                }
              >
                Borrar
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ColorTab({
  colors,
  onSave,
  onDelete,
}: {
  colors: WaxColor[];
  onSave: (input: { id?: string; name: string; hex: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#C9A3A8");
  const [editing, setEditing] = useState<WaxColor | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="max-w-lg">
      <h2 className="font-display text-title">Colores de cera</h2>
      <form
        className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          void onSave({ id: editing?.id, name, hex })
            .then(() => {
              setName("");
              setHex("#C9A3A8");
              setEditing(null);
            })
            .catch((err: Error) => setError(err.message));
        }}
      >
        <Input
          value={name}
          placeholder="Nombre del color"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="color"
          value={hex}
          className="h-11 w-16 cursor-pointer p-1"
          onChange={(e) => setHex(e.target.value)}
          aria-label="Tono"
        />
        <Button type="submit">{editing ? "Actualizar" : "Agregar"}</Button>
      </form>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {colors.map((color) => (
          <li key={color.id} className="flex h-14 items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <span
                className="size-6 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </span>
            <span className="flex gap-3">
              <button
                type="button"
                className="text-sm text-primary"
                onClick={() => {
                  setEditing(color);
                  setName(color.name);
                  setHex(color.hex);
                }}
              >
                Editar
              </button>
              <button
                type="button"
                className="text-sm text-muted hover:text-danger"
                onClick={() =>
                  void onDelete(color.id).catch((err: Error) => setError(err.message))
                }
              >
                Borrar
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="text-muted">Todavía no hay pedidos.</p>;
  }
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article key={order.id} className="rounded-xl border border-border bg-raised p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-title">{order.id}</h2>
            <p className="text-sm tabular-nums">{formatPrice(order.total)}</p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {order.customer.name} · {order.customer.email} · {order.customer.phone}
          </p>
          <p className="mt-1 text-sm text-subtle">{order.customer.address}</p>
          <p className="mt-1 text-xs text-subtle">{formatDate(order.createdAt)}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {order.lines.map((line) => (
              <li key={`${order.id}-${line.productId}`}>
                {line.name} × {line.quantity}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
