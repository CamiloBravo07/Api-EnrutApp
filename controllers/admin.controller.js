const Usuario = require('../models/Usuario');
const Viaje = require('../models/Viaje');
const bcrypt = require('bcryptjs');

exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

exports.crearUsuario = async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;
  const hashed = await bcrypt.hash(contrasena, 10);
  const usuario = new Usuario({ nombre, correo, contrasena: hashed, rol });
  await usuario.save();
  res.status(201).json(usuario);
};

exports.asignarViaje = async (req, res) => {
  const { viajeId, conductorId } = req.body;
  const viaje = await Viaje.findByIdAndUpdate(viajeId, { conductor: conductorId }, { new: true });
  res.json(viaje);
};
