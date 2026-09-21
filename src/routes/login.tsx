import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Ornament } from "@/components/ornament";
import { checkAdminAccess } from "@/lib/catalog-api";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [access, setAccess] = useState<"pending" | "ok" | "need-google" | "other">(
    "pending",
  );

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setAccess("need-google");
      return;
    }
    let cancelled = false;
    void checkAdminAccess()
      .then((result) => {
        if (cancelled) return;
        if (result.allowed) setAccess("ok");
        else if (result.reason === "google") setAccess("need-google");
        else setAccess("other");
      })
      .catch(() => {
        if (!cancelled) setAccess("need-google");
      });
    return () => {
      cancelled = true;
    };
  }, [isPending, user]);

  if (isPending || access === "pending") {
    return (
      <main className="grid min-h-[60vh] place-items-center px-4">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-surface" />
      </main>
    );
  }

  if (access === "ok") return <Navigate to="/admin" />;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">La casa</p>
      <h1 className="font-display mt-3 text-headline">Administración</h1>
      <Ornament className="mt-5" />
      {access === "other" ? (
        <p className="mt-4 text-sm text-muted">
          Esta cuenta de Google no abre el atelier. Entra con la cuenta de la
          casa.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">
          El catálogo, los aromas, los colores y el stock solo se abren con una
          cuenta de Google. Una sesión de Grok no basta.
        </p>
      )}
      <GoogleSignIn />
    </main>
  );
}
