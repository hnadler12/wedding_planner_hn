const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', default: null },
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', default: null }
});

module.exports = mongoose.model('Budget', budgetSchema);