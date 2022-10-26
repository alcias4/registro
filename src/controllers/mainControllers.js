

const controllers = {
    index:(req,res)=>{
        res.render('index');
    },

    registro:(req,res)=>{
        console.log(req.body);
    }
}


module.exports = controllers;