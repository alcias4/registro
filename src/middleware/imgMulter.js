const multer = require('multer');
const path = require('path');
// configuracion multer;

const configuracionImg = multer.diskStorage({

    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/perfil'));
    },
    filename:function(req,file,cb){
        let imgName = Date.now() + file.originalname;
        cb(null, imgName);
    }
})

const uploadfile = multer({storage:configuracionImg});

module.exports = uploadfile;