-- MySQL Script generated by MySQL Workbench
-- Mon Feb  5 09:41:34 2024
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
  PRIMARY KEY (`NIF`),
  UNIQUE INDEX `NIF_UNIQUE` (`NIF` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Areas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Areas` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Areas` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Devices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Devices` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Devices` (
  `id` INT NOT NULL,
  `Latitud` FLOAT NULL,
  `Longitud` FLOAT NULL,
  `Usuario` VARCHAR(9) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `available` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `area` INT NULL,
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
-- Table `mydb`.`Cpu_temps`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Cpu_temps` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Cpu_temps` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `device` INT NOT NULL,
  `value` INT NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  INDEX `id_device_fk_idx` (`device` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_device_fk0`
    FOREIGN KEY (`device`)
    REFERENCES `mydb`.`Devices` (`id`)
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
-- Table `mydb`.`Actuadores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Actuadores` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Actuadores` (
  `id` VARCHAR(10) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `device` INT NOT NULL,
  `device_pin` INT NULL,
  `area` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `device_actuador_fk_idx` (`device` ASC) VISIBLE,
  INDEX `area_actuador_fk_idx` (`area` ASC) VISIBLE,
  CONSTRAINT `device_actuador_fk`
    FOREIGN KEY (`device`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `area_actuador_fk`
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
  `id` VARCHAR(10) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `device` INT NOT NULL,
  `device_pin` INT NULL,
  `type` VARCHAR(3) NOT NULL,
  `area` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `device_actuador_fk_idx` (`device` ASC) VISIBLE,
  INDEX `area_sensor_fk_idx` (`area` ASC) VISIBLE,
  CONSTRAINT `sensor_device_fk`
    FOREIGN KEY (`device`)
    REFERENCES `mydb`.`Devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `area_sensor_fk`
    FOREIGN KEY (`area`)
    REFERENCES `mydb`.`Areas` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
