// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRole = require('../middlewares/authorizeRole');

// Solo accesibles por administradores
router.get('/usuarios', verifyToken, authorizeRole('admin'), adminController.obtenerUsuarios);
router.post('/usuarios', verifyToken, authorizeRole('admin'), adminController.crearUsuario);
router.post('/asignar-viaje', verifyToken, authorizeRole('admin'), adminController.asignarViaje);

module.exports = router;
