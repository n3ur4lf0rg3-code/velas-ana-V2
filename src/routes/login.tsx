import { createFileRoute, Navigate } from "@tanstack/react-router";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Ornament } from "@/components/ornament";
import { isAdminEmail, useFirebaseUser } from "@/lib/firebase-auth";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useFirebaseUser();

  if (isPending) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-4">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-surface" />
      </main>
    );
  }

  if (user && isAdminEmail(user.email)) {
    return <Navigate to="/admin" />;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs tracking-[0.22em] uppercase text-gold">La casa</p>
      <h1 className="font-display mt-3 text-headline">Administración</h1>
      <Ornament className="mt-5" />
      <p className="mt-4 text-sm text-muted">
        Entra con la cuenta de Google de la casa para gestionar catálogo, stock y
        pedidos.
      </p>
      {user && !isAdminEmail(user.email) ? (
        <p className="mt-3 text-sm text-danger">
          Esta cuenta no tiene permiso de administración.
        </p>
      ) : null}
      <GoogleSignIn />
    </main>
  );
}

