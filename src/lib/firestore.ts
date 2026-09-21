import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// Colecciones
export const productsCol = collection(db, "products");
export const ordersCol = collection(db, "orders");

// Productos
export async function getProducts() {
  const snap = await getDocs(query(productsCol, orderBy("name")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id: string) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Órdenes
export async function createOrderInFirestore(order: DocumentData) {
  const ref = await addDoc(ordersCol, {
    ...order,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getOrders() {
  const snap = await getDocs(query(ordersCol, orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
