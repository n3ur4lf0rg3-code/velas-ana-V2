import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 12,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center rounded-md border border-border bg-raised",
        className,
      )}
    >
      <button
        type="button"
        className="flex size-11 items-center justify-center text-fg hover:text-primary"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Quitar una"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="flex size-11 items-center justify-center text-fg hover:text-primary"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Agregar una"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
