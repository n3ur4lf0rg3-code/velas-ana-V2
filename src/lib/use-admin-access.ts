import { useEffect, useState } from "react";
import { checkAdminAccess } from "@/lib/catalog-api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function useAdminAccess() {
  const { user, isPending } = useCurrentUserState();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setAllowed(false);
      setChecking(false);
      return;
    }
    let cancelled = false;
    setChecking(true);
    void checkAdminAccess()
      .then((result) => {
        if (!cancelled) setAllowed(result.allowed);
      })
      .catch(() => {
        if (!cancelled) setAllowed(false);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isPending, user]);

  return { isAdmin: allowed, isPending: isPending || checking };
}
