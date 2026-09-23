import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { isAdminEmail, signInWithGoogle } from "@/lib/firebase-auth";

export function GoogleSignIn({
  callbackURL = "/admin",
  className,
}: {
  callbackURL?: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={className ?? "mt-8 w-full"}>
      <Button
        type="button"
        size="lg"
        className="w-full"
        disabled={loading}
        onClick={() => {
          setError(null);
          setLoading(true);
          void signInWithGoogle()
            .then((user) => {
              if (!isAdminEmail(user.email)) {
                setError("Esta cuenta de Google no tiene acceso al panel.");
                return;
              }
              void navigate({ to: callbackURL });
            })
            .catch((err: Error) => {
              setError(err.message || "No se pudo iniciar sesión");
            })
            .finally(() => setLoading(false));
        }}
      >
        {loading ? "Conectando…" : "Continuar con Google"}
      </Button>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </div>
  );
}

