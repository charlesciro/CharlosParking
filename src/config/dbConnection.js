var mysql = require('mysql');
//import mysql from 'mysql';


module.exports = () => {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "ymjtactmv",
        database: "CharlosParkingDB",
        multipleStatements: "true"
    })
}