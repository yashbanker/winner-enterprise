import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { slugify } from '../utils/slugify.js';

export const listCategories = async (req, res) => {
  const cats = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
  // Add product counts
  const withCounts = await Promise.all(
    cats.map(async (c) => {
      const count = await Product.countDocuments({ category: c._id, isActive: true });
      return { ...c.toObject(), productCount: count };
    })
  );
  res.json(withCounts);
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, image, order } = req.body;
    const slug = slugify(name);
    const cat = await Category.create({ name, slug, description, icon, image, order });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.name) updates.slug = slugify(updates.name);
    const cat = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const count = await Product.countDocuments({ category: req.params.id });
  if (count > 0)
    return res.status(400).json({
      message: `Cannot delete: ${count} products are using this category.`,
    });
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
};
