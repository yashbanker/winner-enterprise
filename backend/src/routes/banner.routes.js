import { Router } from 'express';
import {
  listBanners,
  adminListBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/banner.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.get('/', listBanners);
r.get('/admin', protect, adminOnly, adminListBanners);
r.post('/', protect, adminOnly, createBanner);
r.put('/:id', protect, adminOnly, updateBanner);
r.delete('/:id', protect, adminOnly, deleteBanner);
export default r;
