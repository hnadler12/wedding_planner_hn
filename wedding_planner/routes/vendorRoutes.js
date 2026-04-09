const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');

router.get('/', async (req, res) => {
  const vendors = await Vendor.find().populate('weddingId', 'name date');
  res.json(vendors);
});

router.get('/:id', async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).populate('weddingId', 'name date');
  res.json(vendor);
});

router.post('/', async (req, res) => {
  const newVendor = new Vendor(req.body);
  const savedVendor = await newVendor.save();
  res.status(201).json(savedVendor);
});

router.put('/:id', async (req, res) => {
  const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedVendor);
});

router.delete('/:id', async (req, res) => {
  await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vendor deleted' });
});

module.exports = router;