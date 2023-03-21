-- -----------------------------------------------------
-- Crear ensayo
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_crearEnsayo;
DELIMITER //
CREATE PROCEDURE sp_crearEnsayo(idUsuarioN INT, fechaHoraN DATETIME, datosEntradaN JSON, datosSalidaN JSON, codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
	IF ((idUsuarioN IS NULL) or (datosEntradaN IS NULL) or (codigoLaboratorioN IS NULL)) THEN
		SET mensaje = 'alguno de los paramentros es nulo o la fecha u hora ingresada es superior a la fecha actual';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
		INSERT INTO Ensayos(idUsuario, fechaHora, datosEntrada, datosSalida, codigo) 
		VALUES (idUsuarioN, fechaHoraN, datosEntradaN, datosSalidaN, 1);
		SET mensaje = 'se creo con exito el ensayo';
        COMMIT;
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
-- Ultima experiencia realizada por un alumno
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_ultimoEnsayo;
DELIMITER //
CREATE PROCEDURE sp_ultimoEnsayo(idUsuarioN INT, codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(codigoLaboratorioN IS NULL) THEN
		SET mensaje = 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT fechaHora, Ensayos.datosEntrada AS datosEntrada, Ensayos.datosSalida as datosSalida
		FROM Ensayos 
		WHERE idUsuario = idUsuarioN and codigo = codigoLaboratorioN 
		ORDER BY fechaHora DESC LIMIT 1;
		SET mensaje = 'ultimo valor';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- una experiencia realizada por un alumno en particular
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_dameEnsayo;
DELIMITER //
CREATE PROCEDURE sp_dameEnsayo(idUsuarioN INT, codigoLaboratorioN VARCHAR(6), idEnsayoN INT, OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(codigoLaboratorioN IS NULL) or (idEnsayoN IS NULL) THEN
		SET mensaje = 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT fechaHora, Ensayos.datosEntrada AS datosEntrada, Ensayos.datosSalida as datosSalida 
		FROM Ensayos 
		WHERE idUsuario = idUsuarioN and codigo = codigoLaboratorioN and idEnsayo = idEnsayoN 
		ORDER BY fechaHora DESC LIMIT 1;
		SET mensaje = 'valor buscado';
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
-- todas las  experiencias realizada por un alumno en particular
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_dameEnsayo;
DELIMITER //
CREATE PROCEDURE sp_dameEnsayo(idUsuarioN INT, codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(codigoLaboratorioN IS NULL) THEN
		SET mensaje = 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT fechaHora, Ensayos.datosEntrada AS datosEntrada, Ensayos.datosSalida as datosSalida 
		FROM Ensayos 
		WHERE idUsuario = idUsuarioN and codigo = codigoLaboratorioN 
		ORDER BY fechaHora DESC;
		SET mensaje = 'valor buscado';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra una experencia
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_borrarEnsayo;
DELIMITER //
CREATE PROCEDURE sp_borrarEnsayo(idUsuarioN INT, codigoLaboratorioN VARCHAR(6), idEnsayoN INT, OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(codigoLaboratorioN IS NULL) or (idEnsayoN IS NULL) THEN
		SET mensaje = 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		DELETE 
		FROM Ensayos 
		WHERE idUsuario = idUsuarioN and codigo = codigoLaboratorioN and idEnsayo = idEnsayoN;
		SET mensaje = 'Ensayo Borrado';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- todas las experiencias realizadas de un laboratorio
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_dameEnsayos;
DELIMITER //
CREATE PROCEDURE sp_dameEnsayos(codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF codigoLaboratorioN IS NULL THEN
		SET mensaje = 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT Ensayos.idEnsayo, fechaHora, Ensayos.datosEntrada AS datosEntrada, Ensayos.datosSalida as datosSalida 
		FROM Ensayos 
		WHERE codigo = codigoLaboratorioN 
		ORDER BY fechaHora DESC;
		SET mensaje = 'valor buscado';
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
-- crear laboratorio
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_crearLaboratorio;
DELIMITER //
CREATE PROCEDURE sp_crearLaboratorio(areaN VARCHAR(50), nombreN VARCHAR(50), imagenN VARCHAR(50), descripcionN VARCHAR(3000), OUT mensaje VARCHAR(100))
SALIR: BEGIN
	IF ((areaN IS NULL) or (nombreN IS NULL) or (descripcionN IS NULL)) THEN
		SET mensaje = 'alguno de los paramentros es nulo';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
		INSERT INTO Laboratorios(area, nombre, imagen, descripcion) VALUES (areaN, nombreN, imagenN, descripcionN);
		SET mensaje = 'se creo con exito el laboratorio';
        COMMIT;
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
--  un laboratorio en especial
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_dameLaboratorio;
DELIMITER //
CREATE PROCEDURE sp_dameLaboratorio(codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF codigoLaboratorioN IS NULL THEN
		SET mensaje = 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT * 
		FROM Laboratorios 
		WHERE codigo = codigoLaboratorioN 
		ORDER BY codigo DESC;
		SET mensaje = 'valor buscado';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
--  todos los laboratorios en la base de datos
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_dameLaboratorio;
DELIMITER //
CREATE PROCEDURE sp_dameLaboratorio()
SALIR: BEGIN

	SELECT * 
	FROM Laboratorios 
	WHERE 
	ORDER BY codigo DESC;
    
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra un laboratorio
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_borrarLaboratorio;
DELIMITER //
CREATE PROCEDURE sp_borrarLaboratorio(codigoLaboratorioN VARCHAR(6), OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF codigoLaboratorioN IS NULL THEN
		SET mensaje = 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		DELETE 
		FROM Laboratorios 
		WHERE codigo = codigoLaboratorioN;
		SET mensaje = 'Laboratorio Borrado';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- se modifica un laboratorio
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_modificarLaboratorio;
DELIMITER //
CREATE PROCEDURE sp_modificarLaboratorio(codigoLaboratorioN VARCHAR(6), areaN VARCHAR(50), nombreN VARCHAR(50), imagenN VARCHAR(50), descripcionN VARCHAR(3000), OUT mensaje VARCHAR(100))
SALIR: BEGIN
	IF ((codigoLaboratorioN IS NULL) OR (areaN IS NULL) or (nombreN IS NULL) or (descripcionN IS NULL)) THEN
		SET mensaje = 'alguno de los paramentros es nulo';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
		UPDATE Laboratorios
		SET area = areaN,  nombre = nombreN, imagen = imagenN,  descripcion = descripcionN 
		WHERE codigo = codigoLaboratorioN;
		SET mensaje = 'se actualizo con exito el laboratorio';
        COMMIT;
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
-- Tabla auditoria lab
-- -----------------------------------------------------

DROP TABLE IF EXISTS auditoriaEmpleados;
CREATE TABLE auditoriaEnsayos (
  `idLinea` int NOT NULL AUTO_INCREMENT, 
  `tipo` char(1) NOT NULL, 
  `fechaHora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `user` varchar(60) NOT NULL, 
  `host` varchar(60) NOT NULL, 
  `idEnsayo` int NOT NULL, 
  `idUsuario` int NOT NULL, 
  `fechaHoraE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `codigo` varchar(6) NOT NULL, 
  `datosEntrada` JSON, 
  `datosSalida` JSON, 
  PRIMARY KEY (`idLinea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS auditoriaLaboratorios;
CREATE TABLE auditoriaLaboratorios (
  `idLinea` int NOT NULL AUTO_INCREMENT, 
  `tipo` char(1) NOT NULL, 
  `fechaHora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  `user` varchar(60) NOT NULL, 
  `host` varchar(60) NOT NULL, 
  `codigo` varchar(6) NOT NULL, 
  `area` varchar(50) NOT NULL, 
  `nombre` VARCHAR(100) NOT NULL, 
  `imagen` VARCHAR(200) NOT NULL, 
  `descripcion` VARCHAR(3000) NOT NULL, 
  PRIMARY KEY (`idLinea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- -----------------------------------------------------
-- se Agrega un ensayo trigger
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS tg_crearEnsayo;
DELIMITER //
CREATE TRIGGER  tg_crearEnsayo AFTER INSERT ON Ensayos FOR EACH ROW
BEGIN
	INSERT INTO auditoriaEnsayos(tipo, fechaHora, `user`, `host`, idEnsayo, idUsuario, fechaHoraE, datosEntrada, datosSalida, codigo) 
    VALUES ('I', NOW(), SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1), NEW.idEnsayo, NEW.idUsuario, NEW.fechaHora, NEW.datosEntrada, NEW.datosSalida, NEW.codigo);
END//
DELIMITER ;


-- -----------------------------------------------------
-- se borra un ensayo trigger
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS tg_borrarEnsayo;
DELIMITER //
CREATE TRIGGER tg_borrarEnsayo BEFORE DELETE ON Ensayos FOR EACH ROW
BEGIN
	INSERT INTO auditoriaEnsayos(tipo, fechaHora, `user`, `host`, idEnsayo, idUsuario, fechaHoraE, datosEntrada, datosSalida, codigo)
    VALUES ('D', NOW(), SUBSTRING_INDEX(USER(),  '@',  1),  SUBSTRING_INDEX(USER(),  '@',  -1), OLD.idEnsayo, OLD.idUsuario, OLD.fechaHora, OLD.datosEntrada, OLD.datosSalida, OLD.codigo);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se agrega un lab trigger
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS tg_crearLaboratorio;
DELIMITER //
CREATE TRIGGER  tg_crearLaboratorio AFTER INSERT ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo, fechaHora, `user`, `host`, codigo, area, nombre, imagen, descripcion) 
    VALUES ('I', NOW(), SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1), NEW.codigo, NEW.area, NEW.nombre, NEW.imagen, NEW.descripcion);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra un lab trigger
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS tg_borrarLaboratorio;
DELIMITER //
CREATE TRIGGER tg_borrarLaboratorio BEFORE DELETE ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo, fechaHora, `user`, `host`, codigo, area, nombre, imagen, descripcion) 
    VALUES ('D', NOW(), SUBSTRING_INDEX(USER(),  '@',  1),  SUBSTRING_INDEX(USER(),  '@',  -1), OLD.codigo, OLD.area, OLD.nombre, OLD.imagen, OLD.descripcion);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se modifica un lab trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_before;
DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_before BEFORE UPDATE ON Laboratorios FOR EACH ROW 
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo, fechaHora, `user`, `host`, codigo, area, nombre, imagen, descripcion)  
	VALUES ('B', NOW(), SUBSTRING_INDEX(USER(),  '@',  1),  SUBSTRING_INDEX(USER(),  '@',  -1), OLD.codigo, OLD.area, OLD.nombre, OLD.imagen, OLD.descripcion);
END//
DELIMITER ;

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_after;
DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_after AFTER UPDATE ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo, fechaHora, `user`, `host`, codigo, area, nombre, imagen, descripcion)  
    VALUES ('A', NOW(), SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1), NEW.codigo, NEW.area, NEW.nombre, NEW.imagen, NEW.descripcion);
END//
DELIMITER ;