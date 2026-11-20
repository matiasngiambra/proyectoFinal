import {
  listProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
} from '../services/product.service.js';

// 400/404 vienen del service con su status; cualquier otro error (ej. Firestore caído) es 500
const handleError = (res, error, message) => {
  const status = error.status || 500;
  res.status(status).json({
    message: status === 500 ? message : error.message,
    ...(status === 500 && { error: error.message }),
  });
};

export const getProducts = async (req, res) => {
  try {
    const products = await listProducts();
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Error al obtener los productos');
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error, 'Error al obtener el producto');
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error, 'Error al crear el producto');
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await editProduct(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error, 'Error al actualizar el producto');
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await removeProduct(id);
    res.status(200).json({ message: 'Producto eliminado', id });
  } catch (error) {
    handleError(res, error, 'Error al eliminar el producto');
  }
};
