-- -----------------------------------------------------
-- crear laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_crearLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_crearLaboratorio(nombreN VARCHAR(100),imagenN VARCHAR(50),descripcionN VARCHAR(3000))
SALIR: BEGIN
	IF ((nombreN IS NULL) or (descripcionN IS NULL)) THEN
		SELECT 'alguno de los paramentros es nulo';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
		INSERT INTO Laboratorios(area,nombre,imagen,descripcion) VALUES (DEFAULT,nombreN,imagenN,descripcionN);
        COMMIT;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
--  todos los laboratorios en la base de datos
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorios;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorios()
SALIR: BEGIN

	SELECT * FROM Laboratorios WHERE 1=1 ORDER BY idLaboratorio ASC;
    
END//
DELIMITER ;

-- -----------------------------------------------------
--  un laboratorio en especial
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorio(idLaboratorioN VARCHAR(6))
SALIR: BEGIN
            
	IF idLaboratorioN IS NULL THEN
		SELECT 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT * FROM Laboratorios where idLaboratorio = idLaboratorioN;
    END IF;
END//
DELIMITER ;


-- -----------------------------------------------------
-- se modifica un laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_modificarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_modificarLaboratorio(idLaboratorioN VARCHAR(6),areaN VARCHAR(50),nombreN VARCHAR(50),imagenN VARCHAR(50),descripcionN VARCHAR(3000))
SALIR: BEGIN
	IF ((idLaboratorioN IS NULL) OR (areaN IS NULL) or (nombreN IS NULL) or (descripcionN IS NULL)) THEN
		SELECT 'alguno de los paramentros es nulo';
		LEAVE SALIR;
	ELSEIF NOT EXISTS (SELECT * FROM Laboratorios where idLaboratorio=idLaboratorioN) THEN
        SELECT 'no existe un laboratorio con este codigo';
		LEAVE SALIR;
    ELSE
		START TRANSACTION;
		UPDATE Laboratorios
		SET area = areaN, nombre = nombreN,imagen = imagenN, descripcion = descripcionN 
		WHERE idLaboratorio = idLaboratorioN;
        SELECT 'Parámetros correctos';
        COMMIT;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra un laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_borrarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_borrarLaboratorio(idLaboratorioN VARCHAR(6))
SALIR: BEGIN
            
	IF idLaboratorioN IS NULL THEN
		SELECT 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		DELETE FROM Laboratorios where idLaboratorio = idLaboratorioN;
		SELECT 'Laboratorio Borrado';
    END IF;
END//
DELIMITER ;


-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Ensayo
-- ------------------------------
-- ------------------------------
-- ------------------------------

-- -----------------------------------------------------
-- crear ensayo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_crearEnsayo;

DELIMITER //
CREATE PROCEDURE sp_crearEnsayo(idUsuarioN INT,datosEntradaN JSON,datosSalidaN JSON,idLaboratorioN VARCHAR(6))
SALIR: BEGIN
	IF ((idUsuarioN IS NULL) or (datosEntradaN IS NULL) or (idLaboratorioN IS NULL)) THEN
		SELECT 'alguno de los paramentros es nulo o la fecha u hora ingresada es superior a la fecha actual';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
		INSERT INTO Ensayos(idUsuario,fechaHora,datosEntrada,datosSalida,idLaboratorio) VALUES (idUsuarioN,NOW(),datosEntradaN,datosSalidaN,idLaboratorioN);
        COMMIT;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- todas las experiencias realizadas de un laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayos;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayos(idLaboratorioN VARCHAR(6))
SALIR: BEGIN
            
	IF idLaboratorioN IS NULL THEN
		SELECT'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT Ensayos.idEnsayo,fechaHora,Ensayos.datosEntrada AS datosEntrada,Ensayos.datosSalida as datosSalida FROM Ensayos where idLaboratorio = idLaboratorioN ORDER BY fechaHora ASC;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- todas las experiencias realizadas por un alumno en particular
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayo;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayo(idUsuarioN INT,idLaboratorioN VARCHAR(6))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(idLaboratorioN IS NULL) THEN
        SELECT 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos where idUsuario = idUsuarioN and idLaboratorio = idLaboratorioN;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra una experencia
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_borrarEnsayo;

DELIMITER //
CREATE PROCEDURE sp_borrarEnsayo(idEnsayoN INT)
SALIR: BEGIN
            
	IF (idEnsayoN IS NULL) THEN
		SELECT 'el id del ensayo es null';
		LEAVE SALIR;
    ELSE
		DELETE FROM Ensayos where idEnsayo = idEnsayoN;
		SELECT 'Ensayo Borrado';
    END IF;
END//
DELIMITER ;

-- ------------------------------------------------------------
-- ------------------------------------------------------------
-- ------------------------------------------------------------
-- ------------------------ trigger ---------------------------
-- ------------------------------------------------------------
-- ------------------------------------------------------------
-- ------------------------------------------------------------

-- -----------------------------------------------------
-- se Agrega un ensayo trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_crearEnsayo;

DELIMITER //
CREATE TRIGGER  tg_crearEnsayo AFTER INSERT ON Ensayos FOR EACH ROW
BEGIN
	INSERT INTO auditoriaEnsayos(tipo,fechaHora,`user`,`host`,idEnsayo,idUsuario,fechaHoraE,datosEntrada,datosSalida,idLaboratorio) 
    VALUES ('I',NOW(),SUBSTRING_INDEX(USER(),'@',1),SUBSTRING_INDEX(USER(),'@',-1),NEW.idEnsayo,NEW.idUsuario,NEW.fechaHora,NEW.datosEntrada,NEW.datosSalida,NEW.idLaboratorio);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra un ensayo trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_borrarEnsayo;

DELIMITER //
CREATE TRIGGER tg_borrarEnsayo BEFORE DELETE ON Ensayos FOR EACH ROW
BEGIN
	INSERT INTO auditoriaEnsayos(tipo,fechaHora,`user`,`host`,idEnsayo,idUsuario,fechaHoraE,datosEntrada,datosSalida,idLaboratorio)
    VALUES ('D',NOW(),SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1),OLD.idEnsayo,OLD.idUsuario,OLD.fechaHora,OLD.datosEntrada,OLD.datosSalida,OLD.idLaboratorio);
END//
DELIMITER ;


-- -----------------------------------------------------
-- se agrega un lab trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_crearLaboratorio;

DELIMITER //
CREATE TRIGGER  tg_crearLaboratorio AFTER INSERT ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo,fechaHora,`user`,`host`,idLaboratorio,area,nombre,descripcion) 
    VALUES ('I',NOW(),SUBSTRING_INDEX(USER(),'@',1),SUBSTRING_INDEX(USER(),'@',-1),NEW.idLaboratorio,NEW.area,NEW.nombre,NEW.descripcion);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se borra un lab trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_borrarLaboratorio;

DELIMITER //
CREATE TRIGGER tg_borrarLaboratorio BEFORE DELETE ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo,fechaHora,`user`,`host`,idLaboratorio,area,nombre,descripcion) 
    VALUES ('D',NOW(),SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1),OLD.idLaboratorio,OLD.area,OLD.nombre,OLD.descripcion);
END//
DELIMITER ;

-- -----------------------------------------------------
-- se modifica un lab trigger
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_before;

DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_before BEFORE UPDATE ON Laboratorios FOR EACH ROW 
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo,fechaHora,`user`,`host`,idLaboratorio,area,nombre,descripcion)  
	VALUES ('B',NOW(),SUBSTRING_INDEX(USER(), '@', 1), SUBSTRING_INDEX(USER(), '@', -1),OLD.idLaboratorio,OLD.area,OLD.nombre,OLD.descripcion);
END//
DELIMITER ;

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_after;

DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_after AFTER UPDATE ON Laboratorios FOR EACH ROW
BEGIN
	INSERT INTO auditoriaLaboratorios(tipo,fechaHora,`user`,`host`,idLaboratorio,area,nombre,descripcion)  
    VALUES ('A',NOW(),SUBSTRING_INDEX(USER(),'@',1),SUBSTRING_INDEX(USER(),'@',-1),NEW.idLaboratorio,NEW.area,NEW.nombre,NEW.descripcion);
END//
DELIMITER ;