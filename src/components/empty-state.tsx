import type { ReactNode } from "react";
import { Ornament } from "@/components/ornament";

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <Ornament />
      <h1 className="font-display mt-6 text-headline">{title}</h1>
      <p className="mt-3 text-muted">{children}</p>
      {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
    </div>
  );
}
