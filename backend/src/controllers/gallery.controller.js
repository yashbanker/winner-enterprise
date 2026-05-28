import Gallery from '../models/Gallery.js';

export const listGallery = async (req, res) => {
  const { category } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;
  const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
  res.json(items);
};
export const adminListGallery = async (req, res) => {
  const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
  res.json(items);
};
export const createGallery = async (req, res) => {
  const g = await Gallery.create(req.body);
  res.status(201).json(g);
};
export const updateGallery = async (req, res) => {
  const g = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!g) return res.status(404).json({ message: 'Item not found' });
  res.json(g);
};
export const deleteGallery = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Gallery item deleted' });
};
