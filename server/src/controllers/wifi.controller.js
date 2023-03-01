import { sequelize } from "../index.js";

const idLaboratorio = 1;

const wifiController = {};

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
