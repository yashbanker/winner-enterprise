import { Router } from 'express';
import {
  createInquiry,
  listInquiries,
  updateInquiry,
  deleteInquiry,
  exportInquiries,
  inquiryStats,
} from '../controllers/inquiry.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const r = Router();
r.post('/', createInquiry);
r.get('/', protect, adminOnly, listInquiries);
r.get('/stats', protect, adminOnly, inquiryStats);
r.get('/export', protect, adminOnly, exportInquiries);
r.put('/:id', protect, adminOnly, updateInquiry);
r.delete('/:id', protect, adminOnly, deleteInquiry);
export default r;
