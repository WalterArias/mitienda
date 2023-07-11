let controlError = (err, req, res, next) => {
  /*   if (err.name === "UnauthorizedError") {
    // error de autenticacion de jwt
    return res.status(401).json({ message: "The user is not authorized" });
  }

  if (err.name === "ValidationError") {
    //  error de validacion
    return res.status(401).json({ message: err });
  } */
  /* 
  if (err.) {
    return res.json({
      mensaje: "Usuario no autorizado",
    });
  } */
  // por defecto error de servidor
  return res.send(err);
};

module.exports = controlError;
