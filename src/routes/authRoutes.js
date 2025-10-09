const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checarAutenticacao = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/checar-login', checarAutenticacao, authController.checkAuthStatus);

module.exports = router;