const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ usuario, token });
};

exports.registro = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const existe = await Usuario.findOne({ correo });
  if (existe) return res.status(400).json({ msg: 'Correo ya registrado' });

  const hashed = await bcrypt.hash(contrasena, 10);
  const nuevoUsuario = new Usuario({ nombre, correo, contrasena: hashed });
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
};