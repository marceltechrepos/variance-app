import mongoose from 'mongoose';

const optionValueSchema = new mongoose.Schema({
  label: { type: String },
  color: { type: String },
  imageUrl: { type: String }
}, { _id: false });

const virtualOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, default: false },
  // For dropdown/buttons/radio
  values: [{ type: String }],
  preselectValue: { type: String },
  // For checkboxes
  preselectValues: [{ type: String }],
  // For text
  maxLength: { type: Number },
  inputType: { type: String },
  // For colorSwatches
  colorValues: [optionValueSchema],
  // For imageSwatches
  imageValues: [optionValueSchema],
  // For grid
  xAxisTitle: { type: String },
  xAxisKeys: [{ type: String }],
  yAxisTitle: { type: String },
  yAxisKeys: [{ type: String }],
  // For instructions
  htmlContent: { type: String }
}, { _id: false, timestamps: false });

const productVirtualOptionSchema = new mongoose.Schema({
  productId: { type: String, required: true, index: true },
  shop: { type: String, required: true, index: true },
  options: [virtualOptionSchema]
}, { timestamps: true });

// Compound index for faster queries
productVirtualOptionSchema.index({ productId: 1, shop: 1 }, { unique: true });

export default mongoose.model('ProductVirtualOption', productVirtualOptionSchema);