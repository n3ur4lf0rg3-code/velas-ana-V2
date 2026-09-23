import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";

/** Pon aquí TU correo de Google del admin */
export const ADMIN_EMAILS = [
  "n3ur4l.f0rg3@gmail.com",
];

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin() {
  await firebaseSignOut(auth);
}

export function useFirebaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setIsPending(false);
    });
    return unsub;
  }, []);

  return { user, isPending };
}
