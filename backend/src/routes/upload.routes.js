import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { uploadSingle, uploadMultiple } from '../controllers/upload.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.post('/single', protect, adminOnly, upload.single('image'), uploadSingle);
r.post('/multiple', protect, adminOnly, upload.array('images', 10), uploadMultiple);
export default r;
