const Usuario = require('../models/Usuario');
const Viaje = require('../models/Viaje');
const bcrypt = require('bcryptjs');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

if (!nombre || !correo || !contrasena || !rol) {
  return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
}

const correoExistente = await Usuario.findOne({ correo });
if (correoExistente) {
  return res.status(400).json({ mensaje: 'El correo ya está en uso' });
}

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
