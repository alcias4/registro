const { query } = require('express');
const fs = require('fs');
const path = require('path');

const pathNotas = path.join(__dirname, '../data/notas.json')
const notas = JSON.parse(fs.readFileSync(pathNotas,'utf-8'));

const controllers ={
    create:(req,res)=>{
        if(req.session.profile){
            res.render('notas/crearNota',{dato:req.session.profile});
        }else{
            res.send('se cerro la sesion')
        }
    },

    crear:(req, res)=>{
        console.log(req.body);
        idNuevo = 0;
        for(let s of notas){
            if(idNuevo < s.id){
                idNuevo = s.id
            }
        }

        idNuevo++

        
        let img;
        let tipo =req.body.tipo;
        if(tipo == 'tarae de univerdidad'){
            img = 'trabajoTeam.png';
        }else if(tipo == 'amigos'){
            img = "amigos.png";
        }else if(tipo == 'trabajo'){
            img = "trabajo.png"
        }


        let nuevaNota = {
            id:idNuevo,
            titulo:req.body.titulo,
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            img: img
        }

        notas.push(nuevaNota);
        fs.writeFileSync(pathNotas, JSON.stringify(notas,null," "));
        res.redirect('/user/perfil');
    },

    eliminar:(req,res)=>{
        let notaId = req.params.id;
        
        let notaEncontrado = notas.find(nota =>{
            return nota.id == notaId;
        })

        let notasRestantes = notas.filter(function(elemento){
            return elemento.id != notaId;
        });

        fs.writeFileSync(pathNotas, JSON.stringify(notasRestantes, null, " "));
        res.redirect('/user/perfil')
        
    }
    

}

module.exports = controllers;