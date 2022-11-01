const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const pathUsuario = path.join(__dirname, '../data/registroUsuario.json');
const usuario = JSON.parse(fs.readFileSync(pathUsuario,'utf-8'));

const controllers = {
    vista:(req, res)=>{
        res.render('user/registro');
    },

    registro:(req, res) => {
        const errors = validationResult(req);
        
        let idNuevo = 0;


        
        if( errors.isEmpty()){
            
            for(let s of usuario){
                if(idNuevo < s.id){
                    idNuevo = s.id
                }
            }
    
            idNuevo++
            let imgName = req.file.filename;
            let usuarioNuevo = {
                id:idNuevo,
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.email,
                password: req.body.password,
                img:imgName,
               

            }

            usuario.push(usuarioNuevo);
            fs.writeFileSync(pathUsuario,JSON.stringify(usuario,null," "));
            res.redirect('/');
        } else {
            res.render('user/registro',{validacion: errors.array()});
        }
    },

    loginVista:(req, res)=>{
        res.render('user/login');
    },

    perfil:(req, res)=>{

        let email = req.body.email;

        let usuarioInici = usuario.find(usuarios => {
            return usuarios.email == email;
        })

        req.session.profile = usuarioInici;



        res.redirect('/user/perfil')
    },

    vistaPerfil:(req, res)=>{

        res.render('user/perfil',{dato: req.session.profile});
        
    },

    eliminar: (req, res)=>{

     
        let usuarioencontrado;


        let arreglosNotas = usuario.filter(function(elemento){
            return elemento.id != req.params.id;
        })
        
        for(let producto of usuario){
            if(producto.id == req.params.id){
                usuarioencontrado = producto;
            }
        }

    
        fs.unlinkSync(path.join(__dirname, '../../public/img/perfil', usuarioencontrado.img));

        fs.writeFileSync(pathUsuario,JSON.stringify(arreglosNotas,null," "));
        
        res.redirect("/");
    }
}

module.exports = controllers;