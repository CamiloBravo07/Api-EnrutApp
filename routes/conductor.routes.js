const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const authorizeRole = require('../middlewares/authorizeRole');
const { obtenerViajesAsignados } = require('../controllers/conductor.controller');

router.use(verifyToken);
router.use(authorizeRole('conductor'));

router.get('/viajes', obtenerViajesAsignados);

module.exports = router;
