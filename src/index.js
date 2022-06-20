const app = require('./config/server');

//require('./app/routes/ocupacion')(app);
//require('./app/routes/usuario')(app);
require('./app/routes/pagos')(app);

// starting ther server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
});