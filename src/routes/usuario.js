const usuarioControllers = require('../controllers/usuarioControllers');
const express = require('express');
const routes = express.Router();

const validacion = require('../middleware/validacionRegistro');

routes.post('/registro', validacion ,usuarioControllers.registro);

module.exports = routes;