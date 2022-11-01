const usuarioControllers = require('../controllers/usuarioControllers');
const express = require('express');
const routes = express.Router();

const validaciones = require('../middleware/validacionRegistro');
const validacionLogin = require('../middleware/validacion');
const multer = require('../middleware/imgMulter');


// rutas especificas

routes.get('/registro', usuarioControllers.vista)
routes.post('/registro', multer.single('img'), validaciones ,usuarioControllers.registro);

routes.get('/login', usuarioControllers.loginVista);
routes.post('/login', validacionLogin ,usuarioControllers.perfil);
routes.get('/perfil', usuarioControllers.vistaPerfil)

routes.delete('/eli/:id' , usuarioControllers.eliminar);

module.exports = routes;