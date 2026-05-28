import { Router } from 'express';
import {
  listGallery,
  adminListGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/gallery.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.get('/', listGallery);
r.get('/admin', protect, adminOnly, adminListGallery);
r.post('/', protect, adminOnly, createGallery);
r.put('/:id', protect, adminOnly, updateGallery);
r.delete('/:id', protect, adminOnly, deleteGallery);
export default r;
