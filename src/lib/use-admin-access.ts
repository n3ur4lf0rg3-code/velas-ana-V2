import { isAdminEmail, useFirebaseUser } from "@/lib/firebase-auth";

/** Acceso admin basado en Firebase Auth (no Grok). */
export function useAdminAccess() {
  const { user, isPending } = useFirebaseUser();
  const isAdmin = Boolean(user && isAdminEmail(user.email));

  return { isAdmin, isPending };
}
