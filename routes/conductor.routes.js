const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRole = require('../middleware/authorizeRole');
const { obtenerViajesAsignados } = require('../controllers/conductor.controller');

router.use(verifyToken);
router.use(authorizeRole(['conductor']));

router.get('/viajes', obtenerViajesAsignados);

module.exports = router;