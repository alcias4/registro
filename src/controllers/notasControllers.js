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
        if(req.body.tipo == 'tarae de univerdidad'){
            img = 'trabajoTeam.png';
        }else if(req.body.tipo == 'tarae de univerdidad'){
            img = "trabajo.png";
        }else{
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
    }
    

}

module.exports = controllers;