import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['general', 'product', 'bulk', 'quotation'],
      default: 'general',
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, default: '', trim: true },
    country: { type: String, default: 'India', trim: true },
    message: { type: String, required: true },

    // Product / bulk specifics
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, default: '' },
    quantity: { type: String, default: '' },

    status: {
      type: String,
      enum: ['new', 'in_progress', 'contacted', 'closed'],
      default: 'new',
    },
    notes: { type: String, default: '' },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
