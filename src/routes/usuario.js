const usuarioControllers = require('../controllers/usuarioControllers');
const express = require('express');
const routes = express.Router();

const validaciones = require('../middleware/validacionRegistro');


routes.get('/registro', usuarioControllers.vista)
routes.post('/registro', validaciones ,usuarioControllers.registro);

module.exports = routes;