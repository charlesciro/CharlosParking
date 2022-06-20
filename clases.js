class Usuario {
    constructor(nombre,cedula,estadoSuscripcion) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.estadoSuscripcion = estadoSuscripcion;
    }

    //Getters
    get Nombre(){
        return this.nombre
    }

    get Cedula(){
        return this.cedula
    }

    get EstadoSuscripcion(){
        return this.estadoSuscripcion
    }

    get addToSQL(){
        return this.insertSQL();
    }

    //Setters
    set Nombre(Nombre){
        this.nombre = Nombre
    }
    
    set Cedula(Cedula){
        this.cedula = Cedula
    }
    
    set EstadoSuscripcion(EstadoSuscripcion){
        this.estadoSuscripcion = EstadoSuscripcion
    }

    //Sql serializing method
    insertSQL() {
        return connection.query("INSERT INTO `charlosparkingdb`.`usuario` (`cedula`, `nombre`, `estadoSuscripcion`) VALUES" + `('${this.cedula}', '${this.nombre}', '${this.estadoSuscripcion}')`) 
    }
}   

class Vehiculo {
    constructor(placa,tipo,cedulaPropietario) {
        this.placa = placa;
        this.tipo = tipo;
        this.cedulaPropietario = cedulaPropietario;
    }

    //Getters
    get Placa(){
        return this.placa
    }

    get Tipo(){
        return this.tipo
    }

    get CedulaPropietario(){
        return this.cedulaPropietario
    }

    get addToSQL(){
        return this.insertSQL();
    }

    //Setters
    set Placa(Placa){
        this.placa = Placa
    }
    
    set Tipo(Tipo){
        this.tipo = Tipo
    }
    
    set CedulaPropietario(CedulaPropietario){
        this.cedulaPropietario = CedulaPropietario
    }

    //Sql serializing method
    insertSQL() {
        return connection.query("INSERT INTO `charlosparkingdb`.`vehiculo` (`placa`, `tipoVehiculo`, `cedulaPropietario`) VALUES" + `('${this.placa}', '${this.tipo}', '${this.cedulaPropietario}')`) 
    }
}

class Celda {
    constructor(numero,tipo,placaAsignada,estadoOcupacion) {
        this.numero = numero;
        this.tipo = tipo;
        this.placaAsignada = placaAsignada;
        this.estadoOcupacion = estadoOcupacion
    }

    //Getters
    get Numero(){
        return this.numero
    }
    
    get Tipo(){
        return this.tipo
    }

    get PlacaAsignada(){
        return this.placaAsignada
    }

    get EstadoOcupacion(){
        return this.estadoOcupacion
    }

    get addToSQL(){
        return this.insertSQL();
    }

    //Setters
    set Numero(Numero){
        this.numero = Numero
    }

    set Tipo(Tipo){
        this.tipo = Tipo
    }

    set PlacaAsignada(PlacaAsignada){
        this.placaAsignada = PlacaAsignada
    }

    set EstadoOcupacion(EstadoOcupacion){
        this.estadoOcupacion = EstadoOcupacion
    }

    //Sql serializing method
    insertSQL() {
        return connection.query("INSERT INTO `charlosparkingdb`.`celda` (`numero`, `tipoCelda`, `placaAsignada`, `estadoOcupacion`) VALUES" + `('${this.numero}', '${this.tipo}', '${this.placaAsignada}', '${this.estadoOcupacion}')`) 
    }
}

class EntradasySalidas {
    constructor(placa,fechaEntrada,fechaSalida,horaEntrada,horaSalida) {
        this.placa = placa;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.horaEntrada = horaEntrada;
        this.horaSalida = horaSalida;
    }

    //Getters
    get Placa(){
        return this.placa
    }
    get FechaEntrada(){
        return this.fechaEntrada
    }
    get FechaSalida(){
        return this.fechaSalida
    }
    // get horaEntrada(){
    //     return this.horaEntrada
    // }
    // get horaSalida(){
    //     return this.horaSalida
    // }

    //Sql serializing method
    get addToSQL(){
        return this.insertSQL();
    }

    //Setters
    set FechaEntrada(FechaEntrada){
        this.fechaEntrada = FechaEntrada
    }
    set FechaSalida(FechaSalida){
        this.fechaSalida = FechaSalida
    }
    set HoraSalida(HoraSalida){
        this.horaSalida = HoraSalida
    }

    //Sql serializing method
    insertSQL() {
        var stringFechaSalida = this.fechaSalida == null?'NULL':"'" +  this.fechaSalida + "'"
        var stringHoraSalida =  this.horaSalida == null?'NULL':"'" + this.horaSalida + "'"
        return connection.query("INSERT INTO `charlosparkingdb`.`entradasysalidas` (`placa`, `fechaEntrada`, `fechaSalida`, `horaEntrada`, `horaSalida`) VALUES" + "('" + this.placa + "', '" + this.fechaEntrada + "', " + stringFechaSalida + ", '" + this.horaEntrada + "', " + stringHoraSalida + ")")
    }
    
}



function RegistrarEntrada(placa,fechaEntrada,horaEntrada){
    const entrada = new EntradasySalidas(placa,fechaEntrada,null,horaEntrada,null)
    entrada.addToSQL
}

//RegistrarEntrada("STN 666", "2022-04-03","07:05")


function RegistrarSalida(placa,fechaSalida,horaSalida){
    connection.query("UPDATE `charlosparkingdb`.`entradasysalidas` SET `fechaSalida`=" + "'" +  fechaSalida + "'" + ", `horaSalida`=" + "'" + horaSalida + "'" + "  WHERE `placa` = '" + placa + "'" )
}

//RegistrarSalida("KWO 142","2022-03-04","06:50")
