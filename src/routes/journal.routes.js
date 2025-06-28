const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal.controller');

// Get all journals
router.get('/', journalController.getAllJournals);

// Create new journal
router.get('/create', journalController.getCreatePage);
router.post('/', journalController.createJournal);

// View single journal
router.get('/:id', journalController.getJournal);

// Edit journal
router.get('/:id/edit', journalController.getEditPage);
router.put('/:id', journalController.updateJournal);

// Delete journal
router.delete('/:id', journalController.deleteJournal);

module.exports = router;