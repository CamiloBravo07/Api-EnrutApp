const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const authorizeRole = require('../middlewares/authorizeRole');
const { crearViaje, misViajes } = require('../controllers/cliente.controller');

router.use(verifyToken);
router.use(authorizeRole('cliente'));

router.post('/', crearViaje);
router.get('/', misViajes);

module.exports = router;