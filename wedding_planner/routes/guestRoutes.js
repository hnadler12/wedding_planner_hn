const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

router.get('/', async (req, res) => {
  const guests = await Guest.find().populate('weddingId', 'name date');
  res.json(guests);
});

router.get('/:id', async (req, res) => {
  const guest = await Guest.findById(req.params.id).populate('weddingId', 'name date');
  res.json(guest);
});

router.post('/', async (req, res) => {
  const newGuest = new Guest(req.body);
  const savedGuest = await newGuest.save();
  res.status(201).json(savedGuest);
});

router.put('/:id', async (req, res) => {
  const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedGuest);
});

router.delete('/:id', async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Guest deleted' });
});

module.exports = router;