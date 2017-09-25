var connection = require('../connection/DBconnect');

module.exports.create=function(nombre, desc, duracion, req, res){
    console.log(nombre);
    console.log(desc);
    console.log(duracion);
    connection.query('INSERT INTO Sesion (nombreSesion,descripcionSesion,duracionSesion) VALUES (?,?,?);',[nombre,desc,duracion], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            });
        }else{
            res.redirect('/sessionDev');
        }
    });
};