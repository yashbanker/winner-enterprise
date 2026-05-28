import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['products', 'warehouse', 'packaging', 'team', 'other'],
      default: 'products',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
