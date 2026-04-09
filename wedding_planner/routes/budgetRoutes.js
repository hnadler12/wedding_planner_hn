const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

router.get('/', async (req, res) => {
  const budgets = await Budget.find()
    .populate('vendorId', 'name type')
    .populate('weddingId', 'name date');
  res.json(budgets);
});

router.get('/:id', async (req, res) => {
  const budget = await Budget.findById(req.params.id)
    .populate('vendorId', 'name type')
    .populate('weddingId', 'name date');
  res.json(budget);
});

router.post('/', async (req, res) => {
  const newBudget = new Budget(req.body);
  const savedBudget = await newBudget.save();
  res.status(201).json(savedBudget);
});

router.put('/:id', async (req, res) => {
  const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBudget);
});

router.delete('/:id', async (req, res) => {
  await Budget.findByIdAndDelete(req.params.id);
  res.json({ message: 'Budget item deleted' });
});

module.exports = router;