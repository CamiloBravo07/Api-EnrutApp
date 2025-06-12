const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  correo: {
    type: String,
    unique: true,
    required: [true, 'El correo es obligatorio'],
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Correo inválido']
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  rol: {
    type: String,
    enum: ['cliente', 'conductor', 'admin'],
    default: 'cliente'
  }
}, {
  timestamps: true // 🔥 para tener createdAt y updatedAt
});

module.exports = mongoose.model('Usuario', userSchema);
