const mainRoutes = require('./src/routes/main');
const usuario = require('./src/routes/usuario');
const express = require('express');
const path  = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));


// metodo post

app.use(express.urlencoded({extended: false}));
app.use(express.json());



// ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//  ruta global

app.use('/', mainRoutes);
app.use('/user', usuario);



app.listen(process.env.PORT || 3001, function(){
    console.log('run server 3001');
});