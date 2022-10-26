const mainControllers = require('../controllers/mainControllers');

const express = require('express');

const routes = express.Router();

routes.get('/', mainControllers.index);





module.exports = routes;
