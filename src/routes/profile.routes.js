const express = require('express');
const router = express.Router();

// GET /profile
router.get('/', (req, res) => {
  // For now, render a simple profile page
  res.render('profile', { user: req.session.user || null });
});

module.exports = router;
