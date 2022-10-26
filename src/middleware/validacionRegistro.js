const {body} = require('express-validator');

let validaciones = [
    body('email', '* ingrese un email valido').exists().isEmail(),
    body('password', ' * con minimo 5 caracteres').exists().isLength({min:5}),
    body('nombre', '* ingresa nombre y apellido').exists().isLength({min:1}),
    body('usuario', '* ingresa usuario').exists().isLength({min:1})
]


module.exports = validaciones;