const express = require('express');
const app = express(); 

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const index = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const session = require('express-session');

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
require('dotenv').config();
const mongodb = require('./config/mongoose-connection');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    resave:false , 
    saveUninitialized:false , 
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use('/',index);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);


app.listen(process.env.PORT,()=>{
    console.log(`App Running on Port ${process.env.PORT}`);
})