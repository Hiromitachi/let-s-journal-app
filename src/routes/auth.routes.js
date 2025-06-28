const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isNotAuthenticated } = require('../middleware/auth.middleware');

// Login routes
router.get('/login', isNotAuthenticated, authController.getLoginPage);
router.post('/login', isNotAuthenticated, authController.login);

// Register routes
router.get('/register', isNotAuthenticated, authController.getRegisterPage);
router.post('/register', isNotAuthenticated, authController.register);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;