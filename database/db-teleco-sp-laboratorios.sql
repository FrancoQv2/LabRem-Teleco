USE LabRem_Teleco;

-- -----------------------------------------------------
-- Crear laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_crearLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_crearLaboratorio(nombreNew VARCHAR(100), descripcionNew VARCHAR(3000))
SALIR: BEGIN
    IF ((nombreNew IS NULL) or (descripcionNew IS NULL)) THEN
        SELECT 'alguno de los paramentros es nulo';
        LEAVE SALIR;
    ELSE
        START TRANSACTION;
        INSERT INTO Laboratorios(area,nombre,descripcion) VALUES (DEFAULT,nombreNew,descripcionNew);
        COMMIT;
    END IF;
END //
DELIMITER ;

-- -----------------------------------------------------
--  todos los laboratorios en la base de datos
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorios;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorios()
SALIR: BEGIN
    SELECT 
        idLaboratorio, 
        area, 
        nombre, 
        descripcion 
    FROM Laboratorios 
    ORDER BY idLaboratorio ASC;
END //
DELIMITER ;

-- -----------------------------------------------------
--  un laboratorio en especial
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorio(idLaboratorioNew VARCHAR(6))
SALIR: BEGIN
    IF idLaboratorioNew IS NULL THEN
        SELECT 'el codigo de laboratorio es null';
        LEAVE SALIR;
    ELSE
        SELECT 
            idLaboratorio, 
            area, 
            nombre, 
            descripcion 
        FROM Laboratorios 
        WHERE idLaboratorio = idLaboratorioNew;
    END IF;
END //
DELIMITER ;


-- -----------------------------------------------------
-- se modifica un laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_modificarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_modificarLaboratorio(idLaboratorioNew VARCHAR(6), areaNew VARCHAR(50), nombreNew VARCHAR(50), descripcionNew VARCHAR(3000))
SALIR: BEGIN
    IF ((idLaboratorioNew IS NULL) OR (areaNew IS NULL) or (nombreNew IS NULL) or (descripcionNew IS NULL)) THEN
        SELECT 'alguno de los paramentros es nulo';
        LEAVE SALIR;
    ELSEIF NOT EXISTS (SELECT * FROM Laboratorios WHERE idLaboratorio = idLaboratorioNew) THEN
        SELECT 'no existe un laboratorio con este codigo';
        LEAVE SALIR;
    ELSE
        START TRANSACTION;
        UPDATE Laboratorios
        SET 
            area = areaNew, 
            nombre = nombreNew, 
            descripcion = descripcionNew 
        WHERE idLaboratorio = idLaboratorioNew;
        SELECT 'Parámetros correctos';
        COMMIT;
    END IF;
END //
DELIMITER ;

-- -----------------------------------------------------
-- se borra un laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_borrarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_borrarLaboratorio(idLaboratorioNew VARCHAR(6))
SALIR: BEGIN
            
    IF idLaboratorioNew IS NULL THEN
        SELECT 'el codigo de laboratorio es null';
        LEAVE SALIR;
    ELSE
        DELETE FROM Laboratorios 
        WHERE idLaboratorio = idLaboratorioNew;
        SELECT 'Laboratorio Borrado';
    END IF;
END //
DELIMITER ;
