const fs = require('fs');
const path  = require('path');


const validacionesRegistro = (req,res,next)=>{
    const pathUsuario =  path.join(__dirname, '../data/registroUsuario.json');
    const usuarios = JSON.parse(fs.readFileSync(pathUsuario, 'utf-8'));
    
    let email = req.body.email;
    let user = req.body.usuario;
    console.log(req.body)
    let usuarioEmail = usuarios.find(usuario =>{
        return usuario.email == email ;   
    });
    let nombreUsuario = usuarios.find(usuario =>{
        return usuario.usuario == user ;   
    });

    if(usuarioEmail == undefined && nombreUsuario == undefined){
        next()
    }else{
        res.render('user/registro',{error:true});
    }

}



module.exports = validacionesRegistro;