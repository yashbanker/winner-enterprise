import Banner from '../models/Banner.js';

export const listBanners = async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.json(banners);
};
export const adminListBanners = async (req, res) => {
  const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
  res.json(banners);
};
export const createBanner = async (req, res) => {
  const b = await Banner.create(req.body);
  res.status(201).json(b);
};
export const updateBanner = async (req, res) => {
  const b = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!b) return res.status(404).json({ message: 'Banner not found' });
  res.json(b);
};
export const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: 'Banner deleted' });
};
