import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    color: { type: String, required: true, trim: true },
    size: { type: String, default: '' }, // e.g. "0.3 - 0.6 mm" or "600 micron"
    description: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    images: [{ type: String }], // urls
    primaryImage: { type: String, default: '' },
    availability: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'limited', 'on_order'],
      default: 'in_stock',
    },
    minOrderQty: { type: String, default: '' }, // e.g. "500 kg"
    packaging: { type: String, default: '' }, // e.g. "25kg HDPE bags"
    application: { type: String, default: '' },
    specifications: { type: Map, of: String, default: {} },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', code: 'text', color: 'text' });

export default mongoose.model('Product', productSchema);
