-- -----------------------------------------------------
-- Ultima experiencia realizada por un alumno
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_ultimoEnsayo;

DELIMITER //
CREATE PROCEDURE sp_ultimoEnsayo(idUsuarioN INT,codLaboratorioN VARCHAR(6),OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioN IS NULL) OR(codLaboratorioN IS NULL) THEN
		SET mensaje = 'el id del usuario o el codigo de laboratorio es null';
		LEAVE SALIR;
    ELSE
		SELECT fechaHora,Ensayos.datosEntrada AS datosEntrada,Ensayos.datosSalida as datosSalida FROM Ensayos where idUsuario = idUsuarioN and codLaboratorio = codLaboratorioN ORDER BY fechaHora DESC LIMIT 1;
		SET mensaje = 'ultimo valor';
    END IF;
END//
DELIMITER ;

