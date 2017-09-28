var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var sess;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


var login = require('../controllers/login.controller');
var sesion = require('../controllers/session.controller');

router.get('/',function(req,res){
    sess= req.session;
    if (sess.nick !== undefined){
        res.render('userdashboard');
    }else{
        res.render('index');
    }
});

router.get('/login', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.redirect('/success');
    }else{
        res.render('login');
    }
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    login.authenticate(email, pass, req, res);

});

router.get('/guest', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.redirect('/success');
    }else{
        res.render('guest');
    }
});

router.post('/guest', function (req, res) {
    var nickname = req.body.nickname;
    login.authenticateG(nickname, req, res);

});

router.get('/error:id', function (req, res) {
    res.render('/login/error?' + req.query.id);
});

router.get('/success', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined){
        res.render('userdashboard');
    }else{
        res.redirect('/login');
    }
});

router.get('/record', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.render('historial');
    }else{
        res.redirect('/login');
    }
});

router.get('/session', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.render('session');
    }else{
        res.redirect('/login');
    }
});

router.post('/session', function (req, res) {
    var nombreS = req.body.nombreSesion;
    var descS = req.body.descSesion;
    var durS = req.body.durSesion;
    sesion.create(nombreS, descS, durS, req, res);
});

router.get('/sessionInv', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.render('sessionInv');
    }else{
        res.redirect('/login');
    }
});

router.get('/sessionDev', function (req, res) {
    sess= req.session;
    if (sess.nick !== undefined) {
        res.render('sessionDev');
    }else{
        res.redirect('/login');
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;