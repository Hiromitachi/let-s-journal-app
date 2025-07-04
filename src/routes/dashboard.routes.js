const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// Dashboard route
router.get('/', dashboardController.getDashboard);

module.exports = router;