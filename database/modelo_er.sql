-- MySQL Script generated by MySQL Workbench
-- Fri May 31 18:10:00 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Usuarios` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `id` INT NOT NULL DEFAULT 0,
  `NIF` VARCHAR(9) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NULL,
  `email` VARCHAR(254) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `Latitud` FLOAT NULL,
  `Longitud` FLOAT NULL,
  `event1` INT NOT NULL DEFAULT 0,
  `event2` INT NOT NULL DEFAULT 0,
  `event3` INT NOT NULL DEFAULT 0,
  `event4` INT NOT NULL DEFAULT 0,
  `event5` INT NOT NULL DEFAULT 0,
  `event6` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`NIF`),
  UNIQUE INDEX `NIF_UNIQUE` (`NIF` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Crops`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Crops` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Crops` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `user` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_area_fk_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `crop_user_fk`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Areas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Areas` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Areas` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `user` VARCHAR(9) NOT NULL,
  `color` VARCHAR(6) NOT NULL DEFAULT '\" \"',
  `crop` VARCHAR(255) NOT NULL,
  `indoor` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_area_fk_idx` (`user` ASC) VISIBLE,
  INDEX `crop_area_fk_idx` (`crop` ASC) VISIBLE,
  CONSTRAINT `user_area_fk`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `crop_area_fk`
    FOREIGN KEY (`crop`)
    REFERENCES `mydb`.`Crops` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Devices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Devices` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Devices` (
  `id` VARCHAR(255) NOT NULL,
  `Latitud` FLOAT NULL,
  `Longitud` FLOAT NULL,
  `Usuario` VARCHAR(9) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `available` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `area` VARCHAR(255) NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `device_area_idx` (`area` ASC) VISIBLE,
  CONSTRAINT `device_user_fk`
    FOREIGN KEY (`Usuario`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `device_area`
    FOREIGN KEY (`area`)
    REFERENCES `mydb`.`Areas` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sensores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Sensores` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Sensores` (
  `id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `device` VARCHAR(255) NULL,
  `area` VARCHAR(255) NULL,
  `Latitud` FLOAT NULL,
  `Longitud` FLOAT NULL,
  `name` VARCHAR(50) NOT NULL,
  `available` TINYINT NOT NULL DEFAULT 0,
  `user` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `device_actuador_fk_idx` (`device` ASC) VISIBLE,
  INDEX `area_sensor_fk_idx` (`area` ASC) VISIBLE,
  INDEX `sensor_user_fk_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `sensor_device_fk`
    FOREIGN KEY (`device`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `area_sensor_fk`
    FOREIGN KEY (`area`)
    REFERENCES `mydb`.`Areas` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `sensor_user_fk`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Programs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Programs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Programs` (
  `id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `days` INT(2) NOT NULL DEFAULT 0,
  `startTime` INT(11) NOT NULL,
  `duration` FLOAT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `user` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `program_user_fk_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `program_user_fk`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Actuadores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Actuadores` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Actuadores` (
  `id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `device` VARCHAR(255) NOT NULL,
  `device_pin` INT NULL,
  `area` VARCHAR(255) NULL,
  `mode` TINYINT NOT NULL DEFAULT 0,
  `Latitud` FLOAT NULL,
  `Longitud` FLOAT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `name` VARCHAR(50) NOT NULL,
  `activeProgram` VARCHAR(255) NULL,
  `acumulatedFlow` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `device_actuador_fk_idx` (`device` ASC) VISIBLE,
  INDEX `area_actuador_fk_idx` (`area` ASC) VISIBLE,
  INDEX `actuador_program_fk_idx` (`activeProgram` ASC) VISIBLE,
  CONSTRAINT `device_actuador_fk`
    FOREIGN KEY (`device`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `area_actuador_fk`
    FOREIGN KEY (`area`)
    REFERENCES `mydb`.`Areas` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `actuador_program_fk`
    FOREIGN KEY (`activeProgram`)
    REFERENCES `mydb`.`Programs` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SensorDatas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`SensorDatas` ;

CREATE TABLE IF NOT EXISTS `mydb`.`SensorDatas` (
  `id` VARCHAR(255) NOT NULL,
  `deviceCode` VARCHAR(255) NULL,
  `value` INT NOT NULL,
  `time` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `sensorCode` VARCHAR(255) NULL,
  `type` INT(1) NULL,
  `actuadorCode` VARCHAR(255) NULL,
  INDEX `id_device_fk_idx` (`deviceCode` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `id_sensor_fk1_idx` (`sensorCode` ASC) VISIBLE,
  INDEX `id_actuador_fk2_idx` (`actuadorCode` ASC) VISIBLE,
  CONSTRAINT `id_device_fk0`
    FOREIGN KEY (`deviceCode`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id_sensor_fk1`
    FOREIGN KEY (`sensorCode`)
    REFERENCES `mydb`.`Sensores` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id_actuador_fk2`
    FOREIGN KEY (`actuadorCode`)
    REFERENCES `mydb`.`Actuadores` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Codigos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Codigos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Codigos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(9) NOT NULL,
  `token` VARCHAR(4) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_token_fk`
    FOREIGN KEY (`usuario`)
    REFERENCES `mydb`.`Usuarios` (`NIF`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Coordenadas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Coordenadas` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Coordenadas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `area` VARCHAR(255) NOT NULL,
  `Latitud` FLOAT NOT NULL,
  `Longitud` FLOAT NOT NULL,
  `index` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `coords_area_fk_idx` (`area` ASC) VISIBLE,
  CONSTRAINT `coords_area_fk`
    FOREIGN KEY (`area`)
    REFERENCES `mydb`.`Areas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Logs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Logs` (
  `id` VARCHAR(255) NOT NULL,
  `deviceCode` VARCHAR(255) NOT NULL,
  `sensorCode` VARCHAR(255) NULL,
  `actuadorCode` VARCHAR(255) NULL,
  `logcode` INT NOT NULL,
  `timestamp` INT(11) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `deviceName` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `deviceCode_idx` (`deviceCode` ASC) VISIBLE,
  INDEX `fk_actuadorCode_id_idx` (`actuadorCode` ASC) VISIBLE,
  INDEX `fk_sensorCode_id_idx` (`sensorCode` ASC) VISIBLE,
  CONSTRAINT `fk_deviceCode_id`
    FOREIGN KEY (`deviceCode`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sensorCode_id`
    FOREIGN KEY (`sensorCode`)
    REFERENCES `mydb`.`Sensores` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_actuadorCode_id`
    FOREIGN KEY (`actuadorCode`)
    REFERENCES `mydb`.`Actuadores` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
