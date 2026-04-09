const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddlesware');

// GET toutes les tâches de l'utilisateur connecté
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET une tâche par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST créer une tâche
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, userId: req.user.id });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// PUT modifier une tâche
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// DELETE supprimer une tâche
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;