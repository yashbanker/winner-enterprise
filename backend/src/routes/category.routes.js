import { Router } from 'express';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.get('/', listCategories);
r.post('/', protect, adminOnly, createCategory);
r.put('/:id', protect, adminOnly, updateCategory);
r.delete('/:id', protect, adminOnly, deleteCategory);
export default r;
