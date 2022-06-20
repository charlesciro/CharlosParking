var datos_prueba = [{
  nombre: 'Juanca Galindo',
  cedula: 1111111,
  tipoVehiculo: 'Carro',
  placa: 'PWX 330',
  numero: '1A',
  estadoSuscripcion: 'Inactivo',
  fechaEntrada: '2022-01-20',
  horaEntrada: '12:40:00'
},
{
  nombre: 'Juanpa Gapronto',
  cedula: 2222222,
  tipoVehiculo: 'Moto',
  placa: 'CKQ 29',
  numero: '2C',
  estadoSuscripcion: 'Activo',
  fechaEntrada: "2022-02-01",
  horaEntrada: '14:50:00'
},
{
    nombre: 'Gustavo Petro',
    cedula: 6666666,
    tipoVehiculo: 'Carro',
    placa: 'STN 666',
    numero: '13F',
    estadoSuscripcion: 'Retraso',
    fechaEntrada: "2022-02-03",
    horaEntrada: '06:13:00'
  }
]


function buildTable(data){
  var table = document.getElementById("tablaVehiculosParqueados")
  console.log(data)
  for (var i = 0; i< data.length; i++){
      var row = `<tr>
                      <th scope="row">${data[i].nombre}</td>
                      <td>${data[i].tipoVehiculo}</td>
                      <td>${data[i].placa}</td>
                      <td>${data[i].numero}</td>
                      <td>${data[i].estadoSuscripcion}</td>
                      <td>${data[i].fechaEntrada}</td>
                      <td>${data[i].horaEntrada}</td>
                      <td><center><button id=${i} onclick=deleteRow(${i})>✅</button></center></td>
                 </tr>`

      table.innerHTML += row
  }
}

function deleteRow(r){
  document.getElementById("tablaVehiculosParqueados").deleteRow(r);
}


function filterByName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filtroNombre");
  filter = input.value.toUpperCase();
  table = document.getElementById("tablaVehiculosParqueados");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("th")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

