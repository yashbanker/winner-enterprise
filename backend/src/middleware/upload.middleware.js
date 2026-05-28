import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary, cloudinaryEnabled } from '../config/cloudinary.js';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

const cloudStorage = cloudinaryEnabled
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'winner-enterprise',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1600, height: 1600, crop: 'limit' }],
      },
    })
  : null;

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only JPG, PNG, WEBP images are allowed'));
};

export const upload = multer({
  storage: cloudStorage || localStorage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter,
});

export const buildImageUrl = (req, file) => {
  if (!file) return '';
  if (cloudinaryEnabled) return file.path; // Cloudinary returns full URL in .path
  const host = `${req.protocol}://${req.get('host')}`;
  return `${host}/uploads/${file.filename}`;
};
