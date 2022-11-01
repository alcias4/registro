const { render } = require("ejs");


const controllers = {

    index:(req,res)=>{
        let usuario = false;
        if(req.session.profile){
            usuario = true;
            res.render('index',{dato: usuario});
        }else {
            usuario = false;
            res.render('index',{dato: usuario});
        }
        
    },


}


module.exports = controllers;