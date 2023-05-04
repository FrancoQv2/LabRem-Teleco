USE LabRem_Teleco;

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
		SELECT 'el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT 
			idEnsayo, 
			DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
			TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora,
			datosEntrada
			datosSalida
		FROM Ensayos
		WHERE idLaboratorio = idLaboratorioN 
		ORDER BY fechaHora ASC;
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
		SELECT 
			DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
			TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, 
			datosEntrada, 
			datosSalida 
		FROM Ensayos 
		WHERE idLaboratorio = idLaboratorioN AND idUsuario = idUsuarioN;
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
