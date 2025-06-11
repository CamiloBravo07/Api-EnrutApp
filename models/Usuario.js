const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  contrasena: String,
  rol: { type: String, enum: ['cliente', 'conductor', 'admin'], default: 'cliente' }
});

module.exports = mongoose.model('Usuario', userSchema);