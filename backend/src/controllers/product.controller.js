import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { slugify } from '../utils/slugify.js';

export const listProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      color,
      availability,
      featured,
      page = 1,
      limit = 24,
      sort = '-createdAt',
    } = req.query;

    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (color) query.color = new RegExp(color, 'i');
    if (availability) query.availability = availability;
    if (featured === 'true') query.isFeatured = true;

    if (category) {
      // accept slug or id
      const cat = await Category.findOne({
        $or: [{ slug: category }, { _id: category.match(/^[a-f\d]{24}$/i) ? category : null }],
      });
      if (cat) query.category = cat._id;
      else query.category = null;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(query).populate('category').sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const featuredProducts = async (req, res) => {
  const items = await Product.find({ isFeatured: true, isActive: true })
    .populate('category')
    .limit(8)
    .sort('-createdAt');
  res.json(items);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const query = id.match(/^[a-f\d]{24}$/i) ? { _id: id } : { slug: id };
  const product = await Product.findOne(query).populate('category');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.views += 1;
  await product.save();
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    data.slug = slugify(`${data.name}-${data.code || Date.now()}`);
    if (Array.isArray(data.images) && data.images.length && !data.primaryImage) {
      data.primaryImage = data.images[0];
    }
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.name) updates.slug = slugify(`${updates.name}-${updates.code || Date.now()}`);
    if (Array.isArray(updates.images) && updates.images.length && !updates.primaryImage) {
      updates.primaryImage = updates.images[0];
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
};

export const toggleFeatured = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Product not found' });
  p.isFeatured = !p.isFeatured;
  await p.save();
  res.json(p);
};
