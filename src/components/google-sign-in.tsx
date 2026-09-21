import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export function GoogleSignIn({
  callbackURL = "/admin",
  className,
}: {
  callbackURL?: string;
  className?: string;
}) {
  const google = GROK_PROVIDERS.find((provider) => provider.idp === "google");

  if (!authEnabled || !google) {
    return <p className="mt-8 text-sm text-muted">El acceso no está disponible.</p>;
  }

  return (
    <Button
      type="button"
      size="lg"
      className={className ?? "mt-8 w-full"}
      onClick={() => void signIn(google.providerId, { callbackURL })}
    >
      Continuar con Google
    </Button>
  );
}
