var connection = require('../connection/DBconnect');

module.exports.authenticate=function(email, password, req, res){
    connection.query('SELECT * FROM User WHERE email  = ?',[email], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            });
        }else{
            if(results.length >0){
                if(password==results[0].password){
                    var sess;
                    sess = req.session;
                    sess.email = email;
                    sess.nick = results[0].nickname;
                    sess.type = 'userRegistered';
                    res.redirect('/success');
                }else{
                    //res.redirect('/login/error=0');
                    res.json({
                        status:false,
                        message:"Nick and password does not match"
                    });
                }
            }
            else{
                //res.redirect('/error?0')
                res.json({
                    status:false,
                    message:"Nick does not exits"
                });
            }
        }
    });
};

module.exports.authenticateG=function(nickname, req, res){
    connection.query('SELECT * FROM Guest WHERE nick  = ?',[nickname], function (error, results, fields) {
        if(nickname.length == 0) {
            res.redirect('/Guest');
        }else {
            if (error) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                });
            } else {
                if (results.length > 0) {
                    var sess;
                    sess = req.session;
                    sess.nick = nickname;
                    sess.type = 'invited';
                    res.redirect('/success');

                } else {
                    connection.query("INSERT INTO Guest (nick) VALUES (?); ", [nickname]);
                    var sess;
                    sess = req.session;
                    sess.nick = nickname;
                    sess.type = 'invited';
                    res.redirect('/success');
                }
            }
        }
    });
}