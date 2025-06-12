const express = require('express');
const router = express.Router();
const { login, registro } = require('../controllers/auth.controller');

// No se necesita token aquí
router.post('/login', login);
router.post('/registro', registro);

module.exports = router;
