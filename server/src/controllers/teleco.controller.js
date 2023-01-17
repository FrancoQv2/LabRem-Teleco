import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const telecoController = {};

/**
 * @return {array} array de laboratorios de Telecomunicaciones
 */
telecoController.getLaboratorios = async (req, res) => {
  const response = await sequelize.query(
    "SELECT * FROM Laboratorios;",
    {
      type: QueryTypes.SELECT,
    }
  );
  console.log(typeof response);
  console.log(response);

  await res.send(response);
};

/**
 * @param {number} idLaboratorio
 * @return {object} informacion de un laboratorio en particular
 */
telecoController.getLaboratorioById = async (req, res) => {
  const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "SELECT area, nombre, imagen, descripcion FROM Laboratorios WHERE idLaboratorio = :idLaboratorio;",
    {
      replacements: {
          idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );
  
  await res.send(response[0]);
};


/**
 * -----------------------------------------------------
 * Function - getEnsayosUsuario
 * -----------------------------------------------------
 */
telecoController.getEnsayosUsuario = async (req, res) => {
  console.log(req.params);
  
  const { idLaboratorio, idUsuario } = req.params;
  
  const response = await sequelize.query(
    "\
    SELECT \
      DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, \
      TIME(CONVERT_TZ(fechaHora, '+00:00', '-03:00')) AS Hora, \
      datosEntrada, \
      datosSalida \
    FROM Ensayos \
    WHERE idLaboratorio = :idLaboratorio AND idUsuario = :idUsuario;",
    {
      replacements: {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
      },
      type: QueryTypes.SELECT,
    }
  );

  let dataParsed = [];
  
  if (idLaboratorio == 1) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
      newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
      dataParsed.push(newEnsayo)
    })
  } else if (idLaboratorio == 2) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.Modulacion = ensayo.datosEntrada.tipoModulacion
      newEnsayo.Codificacion = ensayo.datosEntrada.tipoCodificacion
      newEnsayo.IntensidadMin = ensayo.datosEntrada.intensidadMin
      newEnsayo.IntensidadMax = ensayo.datosEntrada.intensidadMax
      dataParsed.push(newEnsayo)
    })
  }
  console.log("--------------------------------");
  console.log(dataParsed);
  console.log("--------------------------------");
  
  await res.send(JSON.stringify(dataParsed));
};

/**
 * -----------------------------------------------------
 * Function - postLaboratorio
 * -----------------------------------------------------
 */
 telecoController.postLaboratorio = (req, res) => {
  console.log(req.body);
  const { idLaboratorio, area, nombre, descripcion } = req.body;
    
    try {
      sequelize.query(
        "INSERT INTO Laboratorios(idLaboratorio,area,nombre,descripcion) VALUES(:idLaboratorio,:area,:nombre,:descripcion);",
        {
          replacements: {
            idLaboratorio: idLaboratorio,
            area: area,
            nombre: nombre,
            descripcion: descripcion,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postLaboratorio:", error);
    }
};

export { telecoController };
