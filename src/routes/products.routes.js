import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { authentication } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas que modifican datos: requieren token
router.post('/create', authentication, createProduct);
router.put('/:id', authentication, updateProduct);
router.delete('/:id', authentication, deleteProduct);

export default router;
