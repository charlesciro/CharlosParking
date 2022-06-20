//const { connect } = require('http2');
import connect from 'http2';

//var mysql = require('mysql');
import mysql from 'mysql';

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ymjtactmv"
});

function get() {
    return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM `charlosparkingdb`.`ocupacion`", async function (error, results, fields) {
    resolve(localStorage.setItem('ocupacion',results))
    reject("La base de datos no esta conectada");})
    connection.end()
  });
}

function popo(){
  get()
  let miTabla = localStorage.getItem('ocupacion');
  console.log(ocupacion)
}

// var response = get().then(function(result) {
//     return result;
// })

// console.log(response)