// pruerta de entrada de la app  ::: PRINCIPIO SPR SINGLE RESPONSABILITY

const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
/* const controlError = require("./helpers/error"); */
app.use(cors());
app.options("*", cors());

/*Middleware  :
también conocido como lógica de intercambio de información entre aplicaciones (interlogical) o agente intermedio, 
es un sistema de software que ofrece servicios y funciones comunes para las aplicaciones. 
 */

app.use(express.json()); //serializa los datos en json
app.use(authJwt());
/* app.use(controlError()); */

//=================================

//routes
const productosRuta = require("./modules/productos");
const usuariosRuta = require("./modules/usuarios");
const api = process.env.API_URL;

app.use(`${api}/productos`, productosRuta);
app.use(`${api}/usuarios`, usuariosRuta);

/* app.get("/", (req, res) => {
  res.send("hola mundo de js");
}); */

//activacion del server
app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:4000");
});
