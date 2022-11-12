const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const pathUsuario = path.join(__dirname, '../data/registroUsuario.json');
const usuario = JSON.parse(fs.readFileSync(pathUsuario,'utf-8'));
const pathNotas = path.join(__dirname, '../data/notas.json')
const notas = JSON.parse(fs.readFileSync(pathNotas,'utf-8'));
const controllers = {
    vista:(req, res)=>{
        
        res.render('user/registro',{error:false});
    },

    registro:(req, res) => {
        
        
        let idNuevo = 0;


        
        
            
            for(let s of usuario){
                if(idNuevo < s.id){
                    idNuevo = s.id
                }
            }
    
            idNuevo++
            let imgName = req.file.filename;
            let password = req.body.password;
            let nuevaPasword = bcryptjs.hashSync(password, 10)
            
            let usuarioNuevo = {
                id:idNuevo,
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.email,
                password: nuevaPasword,
                img:imgName,
               

            }

            usuario.push(usuarioNuevo);
            fs.writeFileSync(pathUsuario,JSON.stringify(usuario,null," "));
            res.redirect('/user/login');
        
        
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
        const notas = JSON.parse(fs.readFileSync(pathNotas,'utf-8'));
        if(req.session.profile){
            res.render('user/perfil',{dato: req.session.profile,notas:notas});
        }else{
            delete req.session.profile;
            res.redirect('/')
        }
        
        
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
    },

    salir: (req, res)=>{

        let salir = req.params.id

        if(salir == "delete"){
            delete req.session.profile
            res.redirect('/')
        }
    }
}

module.exports = controllers;