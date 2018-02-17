
var express=require('express');
var passport=require('passport');
var session=require('express-session');
var bodyParser=require('body-parser');
var app=express();

app.set('views',__dirname+'/views');
app.set('view engine','ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:'user'}));
app.use(passport.initialize());
app.use(passport.session())

// used to serialize the user for the session

require('./app/routes.js')(app, passport);
require('./config/passport')(passport);




app.listen(1212,()=>{console.log('server started on 1212 server');});
