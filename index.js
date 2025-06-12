const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Validar que esté definida la URI
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI no está definida en .env');
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/conductor', require('./routes/conductor.routes'));
app.use('/api/viajes', require('./routes/viajes.routes'));

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('🚌 API EnrutApp funcionando');
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ msg: 'Ruta no encontrada' });
});

// Manejo de errores globales (última línea siempre)
app.use((err, req, res, next) => {
  console.error('❌ Error interno:', err.stack);
  res.status(500).json({ msg: 'Error interno del servidor' });
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});