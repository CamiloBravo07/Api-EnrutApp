module.exports = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ msg: 'No tienes permisos para acceder a este recurso' });
    }
    next();
  };
};
