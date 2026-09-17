import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-raised px-3.5 text-sm text-fg",
        "placeholder:text-subtle transition-[border-color,box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-rose/50",
        className,
      )}
      {...props}
    />
  );
}
