-- MySQL Script generated by MySQL Workbench
-- Sat May 21 16:36:16 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema CharlosParkingDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CharlosParkingDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CharlosParkingDB` DEFAULT CHARACTER SET utf8 ;
USE `CharlosParkingDB` ;

-- -----------------------------------------------------
-- Table `CharlosParkingDB`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharlosParkingDB`.`Usuario` (
  `cedula` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `estadoSuscripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cedula`),
  UNIQUE INDEX `cedula_UNIQUE` (`cedula` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharlosParkingDB`.`Vehiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharlosParkingDB`.`Vehiculo` (
  `placa` VARCHAR(45) NOT NULL,
  `tipoVehiculo` VARCHAR(10) NOT NULL,
  `cedulaPropietario` INT NOT NULL,
  PRIMARY KEY (`placa`),
  INDEX `cedulaPropietario_idx` (`cedulaPropietario` ASC) VISIBLE,
  UNIQUE INDEX `placa_UNIQUE` (`placa` ASC) VISIBLE,
  CONSTRAINT `cedulaPropietario`
    FOREIGN KEY (`cedulaPropietario`)
    REFERENCES `CharlosParkingDB`.`Usuario` (`cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharlosParkingDB`.`Celda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharlosParkingDB`.`Celda` (
  `numero` VARCHAR(10) NOT NULL,
  `tipoCelda` VARCHAR(10) NOT NULL,
  `placaAsignada` VARCHAR(45) NULL,
  `estadoOcupacion` TINYINT NULL,
  PRIMARY KEY (`numero`),
  INDEX `placaAsignada_idx` (`placaAsignada` ASC) VISIBLE,
  UNIQUE INDEX `numero_UNIQUE` (`numero` ASC) VISIBLE,
  CONSTRAINT `placaAsignada`
    FOREIGN KEY (`placaAsignada`)
    REFERENCES `CharlosParkingDB`.`Vehiculo` (`placa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharlosParkingDB`.`EntradasySalidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharlosParkingDB`.`EntradasySalidas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(45) NOT NULL,
  `fechaEntrada` DATE NOT NULL,
  `fechaSalida` DATE NULL,
  `horaEntrada` TIME NOT NULL,
  `horaSalida` TIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `placa_idx` (`placa` ASC) VISIBLE,
  CONSTRAINT `placa`
    FOREIGN KEY (`placa`)
    REFERENCES `CharlosParkingDB`.`Vehiculo` (`placa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `CharlosParkingDB` ;

-- -----------------------------------------------------
-- Placeholder table for view `CharlosParkingDB`.`ocupacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharlosParkingDB`.`ocupacion` (`nombre` INT, `cedula` INT, `tipoVehiculo` INT, `placa` INT, `numero` INT, `estadoSuscripcion` INT, `fechaEntrada` INT, `horaEntrada` INT);

-- -----------------------------------------------------
-- View `CharlosParkingDB`.`ocupacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CharlosParkingDB`.`ocupacion`;
USE `CharlosParkingDB`;
CREATE  OR REPLACE VIEW `ocupacion` AS

SELECT nombre, cedula, tipoVehiculo, vehiculo.placa, numero, estadoSuscripcion, fechaEntrada, horaEntrada 
FROM usuario JOIN vehiculo ON usuario.cedula = vehiculo.cedulaPropietario JOIN  celda ON celda.placaAsignada = vehiculo.placa JOIN entradasysalidas ON entradasysalidas.placa = vehiculo.placa
WHERE entradasysalidas.FechaSalida IS NULL;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
