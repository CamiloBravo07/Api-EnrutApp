const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Aquí irá el { id, rol } que guardaste al generar el token
    next();
  } catch (error) {
    return res.status(403).json({ msg: 'Token inválido o expirado' });
  }
};