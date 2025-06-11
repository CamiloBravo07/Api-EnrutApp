// routes/admin.routes.js
const express = require('express');
const router = express.Router();

// Aquí irían las rutas de administrador
router.get('/', (req, res) => {
  res.send('Admin dashboard');
});

module.exports = router;
