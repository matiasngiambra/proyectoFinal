import * as productModel from '../models/product.model.js';

// Error con status HTTP, para que el controller sepa qué devolver
const httpError = (status, message) => Object.assign(new Error(message), { status });

// TODO: ajustar a los campos reales de tu documento en Firestore
const validateProduct = (data, { partial = false } = {}) => {
  if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).length === 0) {
    throw httpError(400, 'El body debe ser un objeto con los datos del producto');
  }
  const { name, price, stock } = data;

  if (!partial || name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) throw httpError(400, 'name es requerido y debe ser texto');
  }
  if (!partial || price !== undefined) {
    if (typeof price !== 'number' || price < 0) throw httpError(400, 'price es requerido y debe ser un número >= 0');
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
