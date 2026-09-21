import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { listCatalog, placeOrder } from "@/lib/catalog-api";
import { cartLines, cartSubtotal, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { saveOrder } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  loader: () => listCatalog(),
  component: CheckoutPage,
});

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "address" | "form", string>
>;

function validate(values: {
  name: string;
  email: string;
  phone: string;
  address: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Escribe tu nombre completo";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Escribe un correo válido";
  }
  if (values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Escribe un teléfono a 10 dígitos";
  }
  if (values.address.trim().length < 12) {
    errors.address = "Incluye calle, colonia, ciudad y código postal";
  }
  return errors;
}

function CheckoutPage() {
  const { products } = Route.useLoaderData();
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const lines = cartLines(items, products);
  const total = cartSubtotal(items, products);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) {
    return <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6" />;
  }

  if (lines.length === 0) {
    return (
      <main className="px-4">
        <EmptyState
          title="No hay piezas para pedir"
          action={
            <Button asChild>
              <Link to="/catalogo">Ir al catálogo</Link>
            </Button>
          }
        >
          Agrega una vela al carrito antes de completar tus datos.
        </EmptyState>
      </main>
    );
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate({ name, email, phone, address });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const order = await placeOrder({
        data: {
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            notes: notes.trim(),
          },
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      });
      saveOrder(order);
      clear();
      await navigate({ to: "/pedido/$orderId", params: { orderId: order.id } });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo confirmar el pedido";
      setErrors({ form: message });
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">Pedido</p>
      <h1 className="font-display mt-2 text-headline">Tus datos</h1>
      <p className="mt-3 max-w-xl text-muted">
        Al confirmar te damos un número de orden y los datos para transferir.
        Todavía no hay pago con tarjeta.
      </p>

      <form
        onSubmit={(event) => void onSubmit(event)}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]"
        noValidate
      >
        <div className="space-y-5">
          <Field label="Nombre completo" error={errors.name} htmlFor="name">
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Correo" error={errors.email} htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Teléfono" error={errors.phone} htmlFor="phone">
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
          <Field label="Dirección de envío" error={errors.address} htmlFor="address">
            <Textarea
              id="address"
              name="address"
              autoComplete="street-address"
              placeholder="Calle, número, colonia, ciudad, estado y C.P."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Field>
          <Field label="Notas (opcional)" htmlFor="notes">
            <Textarea
              id="notes"
              name="notes"
              placeholder="Horario de entrega, empaque de regalo, aroma de recambio…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
          {errors.form ? <p className="text-sm text-danger">{errors.form}</p> : null}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-raised p-6">
          <h2 className="font-display text-title">Tu mesa</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-3 text-sm">
                <span className="text-muted">
                  {line.product.name} × {line.quantity}
                </span>
                <span className="tabular-nums">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm font-medium">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            Confirmar pedido
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
            <Link to="/carrito">Volver al carrito</Link>
          </Button>
        </aside>
      </form>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
