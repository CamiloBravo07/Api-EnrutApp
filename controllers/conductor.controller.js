const Viaje = require('../models/Viaje');

exports.obtenerViajesAsignados = async (req, res) => {
  const viajes = await Viaje.find({ conductor: req.user._id }).populate('cliente');
  res.json(viajes);
};