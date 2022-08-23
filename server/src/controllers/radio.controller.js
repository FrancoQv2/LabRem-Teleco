import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const radioController = {};

// ------------------------------------------------------

radioController.getInfoLabRadio = async (req, res) => {
  const response = await sequelize.query(
    "SELECT * FROM Laboratorios WHERE nombre = 'Enlace punto a punto con radio definida por software';",
    {
      type: QueryTypes.SELECT,
    }
  );
  const data = await JSON.stringify(response[0]);
  await res.send(data);
};

// ------------------------------------------------------

radioController.postLabRadio = (req, res) => {
  console.log(req.body);
  const {
    idUsuario,
    distanciaLenteConvergente,
    distanciaLenteDivergente,
    distanciaPantalla,
  } = req.body;

  if (distanciaLenteConvergente < 0 || distanciaLenteConvergente > 700) {
    res.status(400).json("Distancia al objeto incorrecta");
  } else if (distanciaLenteDivergente < 0 || distanciaLenteDivergente > 700) {
    res.status(400).json("Distancia a la pantalla incorrecta");
  } else if (distanciaPantalla < 0 || distanciaPantalla > 900) {
    res.status(400).json("Distancia a la pantalla incorrecta");
  } else {
    const datosEntrada = {
      distanciaLenteConvergente: distanciaLenteConvergente,
      distanciaLenteDivergente: distanciaLenteDivergente,
      distanciaPantalla: distanciaPantalla,
    };
    const datosSalida = {
      distanciaEntreLentes:
        distanciaLenteDivergente - distanciaLenteConvergente,
      distanciaPantallaLenteDivergente:
        distanciaPantalla - distanciaLenteDivergente,
    };
    try {
      sequelize.query(
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: 2,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postLabRadio:", error);
    }
  }
};

export { radioController };
