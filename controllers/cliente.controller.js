const Viaje = require('../models/Viaje');

exports.crearViaje = async (req, res) => {
  try {
    const { origen, destino, fecha } = req.body;
    const viaje = new Viaje({ origen, destino, fecha, cliente: req.usuario.id });
    await viaje.save();
    res.status(201).json(viaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el viaje' });
  }
};

exports.misViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find({ cliente: req.usuario.id }).populate('conductor');
    res.json(viajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener viajes' });
  }
};