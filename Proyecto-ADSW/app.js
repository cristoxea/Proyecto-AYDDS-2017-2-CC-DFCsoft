var express = require('express');
var ip = require('ip');
var app= express();
var path = require('path');
var session = require('express-session');
var router = require('./routes/router.js');

app.set('view engine', 'ejs');


app.use(session({secret: 'aaabbb',
    resave: true,
    saveUninitialized: true}));
app.use('/',require('./routes/router'));

var server = app.listen(3000, function () {
    var host = ip.address();
    var port = server.address().port;
    console.log('Este servidor pertenece a la ip %s y el puerto %s', host, port);
});