const dbConnection = require('../../config/dbConnection')

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        var queries = ['SELECT * FROM ocupacion','SELECT * FROM vehiculo']
        connection.query(queries.join(';'), (err,results) => {
            res.render('ocupacion/ocupacion', {
                ocupacion: results[0],
                vehiculo: results[1]
            });
        });
    });

    app.post('/ocupacion', (req,res)=>{
        var today = new Date();
        const {placa} = req.body;
        console.log(req.body)
        connection.query('INSERT INTO entradasysalidas SET?', {
            placa,
            fechaEntrada: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            horaEntrada: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }, (err, result) => {
            res.redirect('/');
        })
    })

    app.post('/salida', (req,res)=>{
        var today = new Date();
        const {placa} = req.body;
        console.log(req.body)
        const fechaSalida = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const horaSalida = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        connection.query("UPDATE entradasysalidas SET fechaSalida = ?, horaSalida = ? WHERE placa = ?",[
            fechaSalida,
            horaSalida,
            placa], (err, result) => {
            if(err){
                console.log(err.message)
            }
            res.redirect('/');
        })
    })
}