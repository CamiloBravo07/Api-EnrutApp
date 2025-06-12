const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟩 INICIO DE SESIÓN
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    // 🔐 Aquí incluimos el rol en el token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { contrasena: _, ...usuarioSinContrasena } = usuario.toObject();
    res.json({ usuario: usuarioSinContrasena, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// 🟩 REGISTRO DE USUARIO
exports.registro = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol = 'cliente' } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ msg: 'Correo ya registrado' });

    const hashed = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = new Usuario({ nombre, correo, contrasena: hashed, rol });
    await nuevoUsuario.save();

    const { contrasena: _, ...usuarioSinContrasena } = nuevoUsuario.toObject();
    res.status(201).json(usuarioSinContrasena);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};