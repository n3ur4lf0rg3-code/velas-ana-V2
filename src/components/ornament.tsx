import { cn } from "@/lib/utils";

function CandleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path
        d="M8 1.4c.8 1.1.9 2.1 0 3.2-.9-1.1-.8-2.1 0-3.2Z"
        fill="currentColor"
      />
      <path
        d="M8 4.6v1.8M4.2 8.2h7.6v8.2c0 .9-.8 1.6-1.7 1.6H5.9c-.9 0-1.7-.7-1.7-1.6V8.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5.6 10.2h4.8v5.4c0 .4-.4.8-.8.8H6.4c-.4 0-.8-.4-.8-.8v-5.4Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-gold", className)}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gold/70" />
      <CandleMark className="h-4 w-3.5" />
      <span className="h-px w-10 bg-gold/70" />
    </div>
  );
}
