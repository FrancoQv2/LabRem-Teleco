import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 1;

const wifiController = {};

/**
 * @return {array} todos los ensayos realizados para el laboratorio de Wifi
 */
wifiController.getEnsayosWifi = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );

  console.log(response);
  
  let dataParsed = [];
  response.map((ensayo)=>{
    const newEnsayo = {}
    newEnsayo.Usuario = ensayo.idUsuario
    newEnsayo.Fecha = ensayo.Fecha
    newEnsayo.Hora = ensayo.Hora
    newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
    newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

/**
 * -----------------------------------------------------
 * Function - getEnsayosUsuario
 * -----------------------------------------------------
 */
 wifiController.getEnsayosUsuario = async (req, res) => {
  console.log(req.params);
  // const { idLaboratorio, idUsuario } = req.params;
  // const { _idUsuario } = req.params.id;

  const response = await sequelize.query(
    "SELECT DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = 1 AND idUsuario = 2;",
    {
      // replacements: {
      //   idLaboratorio: 1,
      //   idUsuario: _idUsuario,
      // },
      type: QueryTypes.SELECT,
    }
  );
  let dataParsed = [];
  response.map((ensayo)=>{
    const newEnsayo = {}
    newEnsayo.Fecha = ensayo.Fecha
    newEnsayo.Hora = ensayo.Hora
    newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
    newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
    dataParsed.push(newEnsayo)
  })
  
  await res.send(JSON.stringify(dataParsed));
};

/**
 * -----------------------------------------------------
 * Function - postLabWifi
 * -----------------------------------------------------
 */
wifiController.postLabWifi = (req, res) => {
  const { idUsuario, elevacion, azimut } = req.body;

  if (elevacion < 0 || elevacion > 90) {
    res.status(400).json("Elevación incorrecta");
  } else if (azimut < 0 || azimut > 90) {
    res.status(400).json("Azimut incorrecta");
  } else {

    const datosEntrada = {
      rangoElevacion: elevacion,
      rangoAzimut: azimut,
    };

    const datosSalida = {
      rangoElevacion: elevacion,
      rangoAzimut: azimut,
    };
    
    try {
      sequelize.query(
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postLabWifi:", error);
    }
  }
};

export { wifiController };
