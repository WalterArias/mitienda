//modulo para productos

const express = require("express");
const usuario = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { promisify } = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

// construimos los endpoint
// listar todos usamos el GET

usuario.get("/", async (req, res) => {
  try {
    conex.query("SELECT idUsuario,nombre,apellidos,email FROM usuario", (error, respuesta) => {
      //console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    // throw error;
    console.log(error);
  }
});

usuario.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    conex.query("SELECT nombre,apellidos,email FROM usuario where idUsuario = ?", id, (error, respuesta) => {
      console.log(respuesta);
      res.send(respuesta);
    });
  } catch (error) {
    // throw error;
    console.log(error);
  }
});
/* usuario.get("/usuarios/:id", (req, res) => {
  let id = req.params.id;

  conex.query("SELECT * FROM usuario  where idUsuario = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        //res.status(201);
        res.send(respuesta);
      }
    };
});
 */
// insertar un registro

usuario.post("/registro", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonapostal: req.body.zonapostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };
    conex.query("INSERT INTO usuario SET ?", data, (error, respuesta) => {
      //console.log(respuesta);
      res.send("insercion exitosa !");
      //res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    // res.send.status(404).error;
  }
});

//Login de usuario
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const secret = process.env.secret;
    //validamos que lleguen los datos completos
    if (!email || !password) {
      console.log("debe enviar los datos completos");
    } else {
      conex.query("SELECT * FROM usuario where email = ?", [email], async (error, respuesta) => {
        if (respuesta.length == 0 || !(await bcrypt.compare(password, respuesta[0].password))) {
          /*  res.send({
            estado: true,
            valor: 100,
          }); */
          //res.sendStatus(200);

          res.send(false);
          // console.log("el usuario y/o la clave ingresada no existen en la aplicacion");
        } else {
          // enviamos las variables al frontend para que cargue la pagina
          // se ejecuta cuando el pwd y el user

          const token = jwt.sign(
            {
              userId: respuesta[0].idUsuario,
            },
            secret,
            {
              expiresIn: "1d",
            }
          );

          // res.send(true);
          // console.log("BIENVENIDO AL SISTEMA DE INFORMACION");
          res.status(200).send({
            user: respuesta[0].email,
            token: token,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send("error en los datos");
  }
});

module.exports = usuario;
