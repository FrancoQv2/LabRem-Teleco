import { sequelize } from "../index.js";

const idLaboratorio = 2;

const radioController = {};

/**
 * -----------------------------------------------------
 * Function - postEnsayoRadio
 * -----------------------------------------------------
 */
 radioController.postEnsayoRadio = (req, res) => {
  const {
    idUsuario,
    tipoModulacion,
    tipoCodificacion,
    intensidadMin,
    intensidadMax,
  } = req.body;

  console.log("---1---");
  console.log(req.body);

  if (
    tipoModulacion !== 1 &&   // 4-QAM
    tipoModulacion !== 2 &&   // 8-QAM
    tipoModulacion !== 3 &&   // 16-QAM
    tipoModulacion !== 4 &&   // PSK
    tipoModulacion !== 5 &&   // FSK
    tipoModulacion !== 6      // QPSK
  ) {
    res.status(400).json("Tipo de Modulacion Incorrecta");
  } else if (
    tipoCodificacion !== 1 &&
    tipoCodificacion !== 2 &&
    tipoCodificacion !== 3
  ) {
    res
      .status(400)
      .json("El Tipo de Codificación no válido");
  } else if (intensidadMax < intensidadMin) {
    res.status(400).json("El rango mínimo supera al rango máximo");
  } else if (
    intensidadMin !== 10 &&
    intensidadMin !== 15 &&
    intensidadMin !== 20 &&
    intensidadMin !== 25
  ) {
    res.status(400).json("La Intensidad Mínima no es válida");
  } else if (
    intensidadMax !== 50 &&
    intensidadMax !== 80 &&
    intensidadMax !== 100 &&
    intensidadMax !== 120
  ) {
    res.status(400).json("La Intensidad Máxima no es válida");
  } else {
    const datosEntrada = {
      tipoModulacion: tipoModulacion,
      tipoCodificacion: tipoCodificacion,
      intensidadMax: intensidadMax,
      intensidadMin: intensidadMin,
    };

    // Estos datos se deben obtener
    const datosSalida = {
      intensidad: 10, // dBm
      tasaError: 0.05, // cantidad de bits con error / bits transmitidos
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
      console.error("-> ERROR postEnsayoRadio:", error);
    }
  }
};

export { radioController };
