const notasControllers = require('../controllers/notasControllers');

const express= require('express');
const routes = express.Router();

routes.get('/crear', notasControllers.create)
routes.post('/crear', notasControllers.crear)
module.exports = routes;