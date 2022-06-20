const dbConnection = require('../../config/dbConnection')

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        var queries = ['SELECT * FROM usuario','SELECT * FROM vehiculo WHERE placa NOT IN (SELECT placaAsignada FROM celdaview)','SELECT * FROM celda WHERE placaAsignada IS NULL','SELECT * FROM celdaview']
        connection.query(queries.join(';'), (err,results) => {
            res.render('usuarios/usuarios', {
                usuario: results[0],
                vehiculosincelda: results[1],
                celdaslibres: results[2],
                celdaview: results[3]
            });
        });
    });

    app.post('/usuario', (req,res)=>{
        var today = new Date();
        const {nombre,cedula} = req.body;
        console.log(req.body)
        connection.query('INSERT INTO usuario SET?', {
            cedula,
            nombre,
            estadoSuscripcion: "Activo",
            fechaRegistro: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        }, (err, result) => {
            res.redirect('/');
            if (err){
                console.log(err.message)
            }
        })
    })


    app.post('/asignarcelda', (req,res)=>{
        var today = new Date();
        const {placaAsignada,numero} = req.body;
        console.log(req.body)
        connection.query("UPDATE celda SET placaAsignada = ? WHERE (numero = ?)",[
            placaAsignada,numero], (err, result) => {
            if(err){
                console.log(err.message)
            }
            res.redirect('/');
        })
    })


    app.post('/vehiculo', (req,res)=>{
        const {cedulaPropietario,tipoVehiculo,placa} = req.body;
        console.log(req.body)
        connection.query('INSERT INTO vehiculo SET?', {
            placa,
            tipoVehiculo,
            cedulaPropietario
        }, (err, result) => {
            res.redirect('/');
            if (err){
                console.log(err.message)
            }
        })
    })

    app.post('/reasignar', (req,res)=>{
        var today = new Date();
        const {numero} = req.body;
        console.log(req.body)
        connection.query("UPDATE celda SET placaAsignada = NULL WHERE (numero = ?)",[
            numero], (err, result) => {
            if(err){
                console.log(err.message)
            }
            res.redirect('/');
        })
    })
}