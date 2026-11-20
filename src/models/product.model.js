import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productsCollection = collection(db, 'products');

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const snapshot = await getDoc(doc(productsCollection, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const createProduct = async (data) => {
  const ref = await addDoc(productsCollection, data);
  return { id: ref.id, ...data };
};

export const updateProduct = async (id, data) => {
  await updateDoc(doc(productsCollection, id), data);
  return { id, ...data };
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(productsCollection, id));
};
