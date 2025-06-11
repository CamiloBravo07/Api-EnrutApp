const Viaje = require('../models/Viaje');

exports.crearViaje = async (req, res) => {
  const { origen, destino, fecha } = req.body;
  const viaje = new Viaje({ origen, destino, fecha, cliente: req.user._id });
  await viaje.save();
  res.status(201).json(viaje);
};

exports.misViajes = async (req, res) => {
  const viajes = await Viaje.find({ cliente: req.user._id }).populate('conductor');
  res.json(viajes);
};