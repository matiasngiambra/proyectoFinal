import * as productModel from '../models/product.model.js';

// Error con status HTTP, para que el controller sepa qué devolver
const httpError = (status, message) => Object.assign(new Error(message), { status });

// Estructura del producto (según el documento creado en Firestore):
// title: string (requerido), price: number >= 0 (opcional), stock: entero >= 0 (opcional)
const validateProduct = (data, { partial = false } = {}) => {
  if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).length === 0) {
    throw httpError(400, 'El body debe ser un objeto con los datos del producto');
  }
  const { title, price, stock } = data;

  if (!partial || title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) throw httpError(400, 'title es requerido y debe ser texto');
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    throw httpError(400, 'price debe ser un número >= 0');
  }
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    throw httpError(400, 'stock debe ser un entero >= 0');
  }
};

export const listProducts = async () => {
  return await productModel.getAllProducts();
};

export const getProduct = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) throw httpError(404, 'Producto no encontrado');
  return product;
};

export const addProduct = async (data) => {
  validateProduct(data);
  return await productModel.createProduct(data);
};

export const editProduct = async (id, data) => {
  validateProduct(data, { partial: true });
  await getProduct(id); // 404 si no existe
  return await productModel.updateProduct(id, data);
};

export const removeProduct = async (id) => {
  await getProduct(id); // 404 si no existe
  await productModel.deleteProduct(id);
};
