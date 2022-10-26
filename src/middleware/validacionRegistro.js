const {body} = require('express-validator');

let validaciones = [
    body('nombre').isString().notEmpty().withMessage('Ingresar nombre y apellido'),
    body('usuario').notEmpty().withMessage('Ingresar usuario'),
    body('email').isEmail().withMessage('email invalido'),
    body('password').notEmpty().isLength({min:5}).withMessage('minimo de 5 caracteres')
]

module.exports = validaciones;