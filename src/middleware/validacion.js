const e = require('express');
const fs = require('fs');
const path = require('path');

function validacionLogin(req, res, next){
    const pathUsuario = path.join(__dirname, '../data/registroUsuario.json');
    const usuariosRegistrados = JSON.parse(fs.readFileSync(pathUsuario, 'utf-8'));

    let email = req.body.email;
    let password = req.body.password;
  
    let usuario = usuariosRegistrados.find(usuario =>{
        return usuario.email == email;
    });
    

    if(usuario.email == email && usuario.password == password){
        next()
    }else {
        res.render('user/login');   
    }

    
}



module.exports = validacionLogin;