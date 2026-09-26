import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { readImageFile } from "@/lib/image-file";
import type { ProductInput } from "@/lib/catalog-api";
import { SHAPES, type Product, type Scent, type WaxColor } from "@/lib/products";

export function AdminProductForm({
  product,
  scents,
  colors,
  onCancel,
  onSave,
}: {
  product: Product | null;
  scents: Scent[];
  colors: WaxColor[];
  onCancel: () => void;
  onSave: (input: ProductInput) => Promise<void>;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [tagline, setTagline] = useState(product?.tagline ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [care, setCare] = useState(product?.care ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [stock, setStock] = useState(String(product?.stock ?? "0"));
  const [shape, setShape] = useState(product?.shape ?? "rosa");
  const [scentId, setScentId] = useState(product?.scentId ?? scents[0]?.id ?? "");
  const [colorId, setColorId] = useState(product?.colorId ?? colors[0]?.id ?? "");
  const [notes, setNotes] = useState(product?.notes.join(", ") ?? "");
  const [burnHours, setBurnHours] = useState(product?.burnHours ?? "");
  const [weight, setWeight] = useState(product?.weight ?? "");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [image, setImage] = useState(product?.image ?? "");
  const [availableColorIds, setAvailableColorIds] = useState<string[]>(
    product?.availableColorIds?.length
      ? product.availableColorIds
      : colors.map((c) => c.id),
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        id: product?.id,
        name,
        tagline,
        description,
        care,
        price: Number(price),
        stock: Number(stock),
        shape,
        scentId,
        colorId,
        notes: notes
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean),
        burnHours,
        weight,
        featured,
        isNew,
        image,
        availableColorIds,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="p-name">
          <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Frase corta" htmlFor="p-tag">
          <Input id="p-tag" value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
      </div>
      <Field label="Descripción" htmlFor="p-desc">
        <Textarea
          id="p-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <Field label="Cuidado" htmlFor="p-care">
        <Textarea id="p-care" value={care} onChange={(e) => setCare(e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Precio (MXN)" htmlFor="p-price">
          <Input
            id="p-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>
        <Field label="Stock" htmlFor="p-stock">
          <Input
            id="p-stock"
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Field>
        <Field label="Quema" htmlFor="p-burn">
          <Input
            id="p-burn"
            value={burnHours}
            onChange={(e) => setBurnHours(e.target.value)}
          />
        </Field>
        <Field label="Peso" htmlFor="p-weight">
          <Input id="p-weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Forma" htmlFor="p-shape">
          <select
            id="p-shape"
            className="h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          >
            {SHAPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Aroma (por defecto)" htmlFor="p-scent">
          <select
            id="p-scent"
            className="h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm"
            value={scentId}
            onChange={(e) => setScentId(e.target.value)}
          >
            {scents.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Color (por defecto / imagen)" htmlFor="p-color">
          <select
            id="p-color"
            className="h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm"
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
          >
            {colors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Colores disponibles para el cliente</p>
        <p className="mb-3 text-xs text-subtle">
          Solo los marcados aparecerán en la ficha del producto.
        </p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const checked = availableColorIds.includes(color.id);
            return (
              <label
                key={color.id}
                className="flex h-11 items-center gap-2 rounded-full border border-border bg-raised px-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    setAvailableColorIds((prev) =>
                      e.target.checked
                        ? [...prev, color.id]
                        : prev.filter((id) => id !== color.id),
                    );
                  }}
                />
                <span
                  className="size-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </label>
            );
          })}
        </div>
      </div>

      <Field label="Notas de aroma (separadas por coma)" htmlFor="p-notes">
        <Input id="p-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>
      <div>
        <Label htmlFor="p-image">Imagen</Label>
        {image ? (
          <img
            src={image}
            alt=""
            className="mt-2 h-40 w-32 rounded-lg object-cover bg-surface"
          />
        ) : null}
        <Input
          id="p-image"
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            void readImageFile(file)
              .then(setImage)
              .catch((err: Error) => setError(err.message));
          }}
        />
        <p className="mt-1 text-xs text-subtle">JPG o PNG. Se guarda con la pieza.</p>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        <label className="flex h-11 items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Destacada en inicio
        </label>
        <label className="flex h-11 items-center gap-2">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
          Marcar como nueva
        </label>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando…" : "Guardar pieza"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
