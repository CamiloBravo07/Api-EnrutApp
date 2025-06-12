// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  asignarViaje
} = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRole = require('../middlewares/authorizeRole');

// Aplica los middlewares a todas las rutas de este router
router.use(verifyToken);
router.use(authorizeRole('admin'));

// Rutas protegidas
router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios', crearUsuario);
router.put('/asignar-viaje', asignarViaje);

module.exports = router;