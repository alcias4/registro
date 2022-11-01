const mainRoutes = require('./src/routes/main');
const usuario = require('./src/routes/usuario');
const express = require('express');
const path  = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

app.use(express.static(path.join('./public')));


// metodo post

app.use(express.urlencoded({extended: false}));
app.use(express.json());
//usar session

app.use(session( {secret: "Este es mi secreto", saveUninitialized:false, resave: false} ));

//method override

app.use(methodOverride('_method'));

// ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//  ruta global

app.use('/', mainRoutes);
app.use('/user', usuario);



app.listen(process.env.PORT || 3001, function(){
    console.log('run server 3001');
});