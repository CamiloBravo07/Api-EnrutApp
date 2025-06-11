const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRole = require('../middleware/authorizeRole');
const { crearViaje, misViajes } = require('../controllers/cliente.controller');

router.use(verifyToken);
router.use(authorizeRole(['cliente']));

router.post('/', crearViaje);
router.get('/', misViajes);

module.exports = router;