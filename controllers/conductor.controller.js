const Viaje = require('../models/Viaje');

exports.obtenerViajesAsignados = async (req, res) => {
  try {
    const viajes = await Viaje.find({ conductor: req.usuario.id }).populate('cliente');
    res.json(viajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener viajes asignados' });
  }
};