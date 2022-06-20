const dbConnection = require('../../config/dbConnection')

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        var queries = ['SELECT * FROM pagos','SELECT cedula FROM pagos']
        connection.query(queries.join(';'), (err,results) => {
            res.render('pagos/pagos', {
                pagos: results[0],
                cedulas: results[1]
            });
        });
    });

    app.post('/pagos', (req,res)=>{
        var today = new Date();
        const fechaUltimoPago = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const {usuario} = req.body;
        const queries = [
            "UPDATE estadopagos SET fechaUltimoPago =" + "'" + fechaUltimoPago + "'" + " , deuda = 0 WHERE (cedulaUsuario =" + "'" + usuario.split(" - ")[1]+ "'" + ")",
            "UPDATE usuario SET estadoSuscripcion = 'Activo' WHERE (cedula =" + "'" + usuario.split(" - ")[1]+ "'" +")",
            "INSERT INTO historialpagos VALUES (" + "'" + usuario.split(" - ")[1] + "'" + "," + "'" + fechaUltimoPago + "'" + "," + "'" + usuario.split(" - ")[2] + "'" + ")"
        ]
        connection.query(queries.join(';'), 
        [],(err, result) => {
            if(err){
                console.log(err.message)
            }
            res.redirect('/');
        })        
    })
}