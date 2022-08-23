import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const wifiController = {};

wifiController.getInfoLabWifi = async (req, res) => {
  const response = await sequelize.query(
    "SELECT * FROM Laboratorios WHERE nombre = 'Enlace de WiFi punto a punto';",
    {
      type: QueryTypes.SELECT,
    }
  );
  const data = await JSON.stringify(response[0]);
  await res.send(data);
};

wifiController.postLabWifi = (req, res) => {
  console.log(req.body);
  const { idUsuario, rangoElevacion, rangoAzimut } = req.body;

  if (rangoElevacion < 0 || rangoElevacion > 90) {
    res.status(400).json("Elevación incorrecta");
  } else if (rangoAzimut < 0 || rangoAzimut > 90) {
    res.status(400).json("Azimut incorrecta");
  } else {
    const datosEntrada = {
      rangoElevacion: rangoElevacion,
      rangoAzimut: rangoAzimut,
    };
    const datosSalida = {
      rangoElevacion:
        rangoAzimut - rangoElevacion,
    };
    console.log(datosEntrada);
    try {
      sequelize.query(
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: 1,
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
