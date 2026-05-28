import { buildImageUrl } from '../middleware/upload.middleware.js';

export const uploadSingle = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: buildImageUrl(req, req.file) });
};

export const uploadMultiple = (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
  const urls = req.files.map((f) => buildImageUrl(req, f));
  res.json({ urls });
};
