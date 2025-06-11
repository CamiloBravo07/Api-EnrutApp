const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema({
  origen: String,
  destino: String,
  fecha: Date,
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null }
});

module.exports = mongoose.model('Viaje', viajeSchema);