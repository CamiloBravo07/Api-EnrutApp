const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Ruta para obtener todos los usuarios
router.get('/usuarios', adminController.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/usuarios', adminController.crearUsuario);

// Ruta para asignar un viaje a un conductor
router.post('/asignar-viaje', adminController.asignarViaje);

module.exports = router;
