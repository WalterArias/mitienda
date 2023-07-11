//clase para autenticar el token y permitir acceso a las api
//const expressJwt = require("express-jwt");
const { expressjwt: expressJwt } = require("express-jwt");

let authJwt = () => {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/v1/usuarios/login", "/api/v1/usuarios/registro"],
  });
};

module.exports = authJwt;
