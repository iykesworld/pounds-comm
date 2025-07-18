const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: String, enum: ['smartphones', 'tablets', 'smartwatches', 'accessories'], required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  tag: { type: String, enum: ['new', 'sale', 'popular'] },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('Product', productSchema); 