const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middleware/verifyToken');
const authorizeRole = require('../middleware/authorizeRole');

// Rutas protegidas solo para administradores
router.use(verifyToken);
router.use(authorizeRole(['admin']));

router.get('/usuarios', adminController.obtenerUsuarios);
router.post('/usuarios', adminController.crearUsuario);
router.put('/asignar-viaje', adminController.asignarViaje);

module.exports = router;