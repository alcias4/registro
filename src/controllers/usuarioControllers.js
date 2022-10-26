const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const pathUsuario = path.join(__dirname, '../data/registroUsuario.json');
const usuario = JSON.parse(fs.readFileSync(pathUsuario,'utf-8'));

const controllers = {
    
    registro:(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('./index',{validacion: errors.array()});
        } else {
            let usuarioNuevo = {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.email,
                password: req.body.password

            }

            usuario.push(usuarioNuevo);

            fs.writeFileSync(pathUsuario,JSON.stringify(usuario,null," "));
            res.redirect('/');

        }
    }
}

module.exports = controllers;