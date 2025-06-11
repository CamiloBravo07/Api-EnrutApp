const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRole = require('../middleware/authorizeRole');
const { obtenerUsuarios, crearUsuario, asignarViaje } = require('../controllers/admin.controller');

router.use(verifyToken);
router.use(authorizeRole(['admin']));

router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios', crearUsuario);
router.put('/asignar-viaje', asignarViaje);

module.exports = router;