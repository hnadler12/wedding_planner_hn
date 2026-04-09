const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  contact: { type: String },
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', default: null }
});

module.exports = mongoose.model('Vendor', vendorSchema);