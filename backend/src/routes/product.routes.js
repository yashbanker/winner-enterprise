import { Router } from 'express';
import {
  listProducts,
  featuredProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
} from '../controllers/product.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.get('/', listProducts);
r.get('/featured', featuredProducts);
r.get('/:id', getProduct);
r.post('/', protect, adminOnly, createProduct);
r.put('/:id', protect, adminOnly, updateProduct);
r.patch('/:id/featured', protect, adminOnly, toggleFeatured);
r.delete('/:id', protect, adminOnly, deleteProduct);
export default r;
