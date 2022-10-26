const {body} = require('express-validator');

let validaciones = [
    body('nombre').isLength({min:3}).withMessage('Campo vacio')
]


module.exports = validaciones;