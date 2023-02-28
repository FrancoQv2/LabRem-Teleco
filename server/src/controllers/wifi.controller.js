import { sequelize } from "../index.js";

const idLaboratorio = 1;

const wifiController = {};

/**
 * @return {array} todos los ensayos realizados para el laboratorio de Wifi
 */
wifiController.getEnsayosWifi = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "CALL sp_dameEnsayo(:idUsuario,:idLaboratorio);",
    {
      replacements: {
        idUsuario: 1,
        idLaboratorio: idLaboratorio,
      }
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
 * Function - postEnsayoWifi
 * -----------------------------------------------------
 */
wifiController.postEnsayoWifi = (req, res) => {
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
        "CALL sp_crearEnsayo (:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          }
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postEnsayoWifi:", error);
    }
  }
};

export { wifiController };
