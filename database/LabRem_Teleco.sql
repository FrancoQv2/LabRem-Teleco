-- -----------------------------------------------------
-- Schema LabRem_FEB
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP DATABASE IF EXISTS LabRem_Teleco;
CREATE SCHEMA IF NOT EXISTS LabRem_Teleco DEFAULT CHARACTER SET utf8 ;
USE LabRem_Teleco;

-- -----------------------------------------------------
-- Tabla - Laboratorios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Laboratorios (
  idLaboratorio INT NOT NULL AUTO_INCREMENT,
  area VARCHAR(50) NOT NULL DEFAULT 'Telecomunicaciones',
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(3000) NULL,
  PRIMARY KEY (idLaboratorio),
  UNIQUE INDEX UI_Laboratorios_nombre (nombre) VISIBLE
)ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla - Ensayos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Ensayos (
  idEnsayo INT NOT NULL AUTO_INCREMENT,
  idUsuario INT NOT NULL,
  fechaHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datosEntrada JSON NULL,
  datosSalida JSON NULL,
  idLaboratorio INT NOT NULL,
  PRIMARY KEY (idEnsayo, idUsuario, idLaboratorio),
  INDEX fk_Ensayos_Laboratorios_idx (idLaboratorio ASC) VISIBLE,
  CONSTRAINT fk_Ensayos_Laboratorios
    FOREIGN KEY (idLaboratorio)
    REFERENCES Laboratorios (idLaboratorio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE = InnoDB;


-- -----------------------------------------------------
-- Insercion de Datos
-- -----------------------------------------------------
INSERT INTO Laboratorios VALUES (DEFAULT,DEFAULT,'Enlace de WiFi punto a punto','La experiencia tiene como objetivo Implementar un enlace de datos WiFi 2.4GHz punto a punto. Se espera que el estudiante adquiera competencias en apuntamiento de antenas e interpretación de indicadores de calidad de señal. Para la experiencia se disponen de dos antenas parabólicas separadas una distancia de 10m. Cada una de ellas conectadas directamente a un atenuador seguido de un punto de acceso. Una antena es fija mientras que la otra se encuentra articulada de tal manera de poder graduar su ángulo de elevación y azimut. Inicialmente el estudiante fijará una inclinación y moverá la otra hasta lograr un enlace óptimo. La calidad de este enlace se mide a través de una interfaz web propia de los puntos de acceso que permiten medir la intensidad de la señal recibida. El experimento finaliza cuando se logra un valor óptimo de potencia. Se espera medir la intensidad de cantidad de señal recibida medida en decibelios (RSCI), el ángulo de elevación (grados) y el ángulo de azimut (grados). Estos valores se visualizarán mediante una tabla de valores Para desarrollar esta experiencia actualmente se dispone de dos antenas con reflector parabólico frecuencia 2,4GHz ganancia 24dBi, 2 atenuadores y dos puntos de acceso Ubiquity Bullet M2.');
INSERT INTO Laboratorios VALUES (DEFAULT,DEFAULT,'Enlace punto a punto con radio definida por software','La experiencia tiene como objetivo experimentar el efecto de distintos esquemas de modulación y codificación sobre el desempeño de un sistema de comunicación digital. Se espera que el estudiante adquiera competencias en analizar sistemas de comunicaciones digitales en capas físicas y de enlace. Se emplea una computadora conectada a dos periféricos separados una distancia de 6m. Los periféricos son capaces de conectarse entre sí por radiofrecuencia. Cada uno se conecta a un conector usb que ingresa directamente a dos puertos usb de una PC. Ante una dada modulación y codificación y un rango de nivel de intensidad determinado, el estudiante a través de un entorno Gnuradio será capaz de evaluar la intensidad de la señal del enlace logrado en ese rango de niveles y estimar la configuración óptima. El estudiante también deberá ensayar el enlace transmitiendo tramas conocidas y comparando las tramas recibidas estimando la tasa de errores de bit (BER) y la tasa de errores de trama (FER). Los datos y/o parámetros de entrada necesarios para la experiencia son: 1. Rango de nivel de potencia de transmisor: Mínimo y máximo; 2. Esquema de modulación 3. Tipo de codificación Se esperan poder medir: 1. Intensidad de señal recibida (Dbm) para cada valor de potencia especificado en el rango de entrada 2. Tasa de errores de bit (cantidad de bits con error / bits transmitidos) (BER). Para visualización se grafica el nivel de intensidad de la señal en función de la tasa de error. Para desarrollar esta experiencia actualmente se dispone de computadoras y periféricos de radio definida por software Hack-RF (transmisor/receptor half-duplex banda corrida 10 MHz a 6 GHz, ancho de banda 20 MHz, 8 bits) Como herramienta de software se emplea el lenguaje Python y el marco de aplicación o framework Gnuradio (software libre bajo licencia GPL).');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
