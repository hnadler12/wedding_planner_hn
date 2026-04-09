const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  rsvp: { type: Boolean, default: false },
  status: { type: String, enum: ['invité', 'confirmé', 'annulé'], default: 'invité' },
  weddingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wedding', default: null }
});

module.exports = mongoose.model('Guest', guestSchema);