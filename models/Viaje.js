const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
  origen: {
    type: String,
    required: [true, 'El origen es obligatorio'],
    trim: true
  },
  destino: {
    type: String,
    required: [true, 'El destino es obligatorio'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }
}, {
  timestamps: true // también útil aquí
});

module.exports = mongoose.model('Viaje', viajeSchema);