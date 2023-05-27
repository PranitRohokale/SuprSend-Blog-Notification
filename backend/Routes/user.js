const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User');

// Sign in route
router.post('/signin', UserController.signIn);
// Sign up route
router.post('/signup', UserController.signUp);

router.post('/subscribe', UserController.subscribe);

module.exports = router;
