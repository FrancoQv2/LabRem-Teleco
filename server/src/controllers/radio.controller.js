import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 2;

const radioController = {};

/**
 * @return {array} todos los ensayos realizados para el laboratorio de Radio
 */
 radioController.getEnsayosRadio = async (req, res) => {
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
    newEnsayo.intensidadMin = ensayo.datosEntrada.intensidadMin
    newEnsayo.intensidadMax = ensayo.datosEntrada.intensidadMax
    newEnsayo.tipoModulacion = ensayo.datosEntrada.tipoModulacion
    newEnsayo.tipoCodificacion = ensayo.datosEntrada.tipoCodificacion
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

/**
 * -----------------------------------------------------
 * Function - postLabRadio
 * -----------------------------------------------------
 */
 radioController.postLabRadio = (req, res) => {
  const {
    idUsuario,
    tipoModulacion,
    tipoCodificacion,
    intensidadMin,
    intensidadMax,
  } = req.body;

  if (
    tipoModulacion != "4-QAM" ||
    tipoModulacion != "8-QAM" ||
    tipoModulacion != "16-QAM" ||
    tipoModulacion != "PSK" ||
    tipoModulacion != "FSK" ||
    tipoModulacion != "QPSK"
  ) {
    res.status(400).json("Tipo de Modulacion Incorrecta");
  } else if (
    tipoCodificacion != 1 ||
    tipoCodificacion != 2 ||
    tipoCodificacion != 3
  ) {
    res
      .status(400)
      .json("El Tipo de Codificación no es ni analógico ni digital");
  } else if (intensidadMax < intensidadMin) {
    res.status(400).json("El rango mínimo supera al rango máximo");
  } else if (
    intensidadMin != 10 ||
    intensidadMin != 15 ||
    intensidadMin != 20 ||
    intensidadMin != 25
  ) {
    res.status(400).json("La Intensidad Mínima no es válida");
  } else if (
    intensidadMax != 50 ||
    intensidadMax != 80 ||
    intensidadMax != 100 ||
    intensidadMax != 120
  ) {
    res.status(400).json("La Intensidad Máxima no es válida");
  } else {
    const datosEntrada = {
      tipoModulacion: tipoModulacion,
      tipoCodificacion: tipoCodificacion,
      intensidadMax: intensidadMax,
      intensidadMin: intensidadMin,
    };

    const datosSalida = {
      intensidad: 10, // dBm
      tasaError: 0.05, // cantidad de bits con error / bits transmitidos
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
      console.error("-> ERROR postLabRadio:", error);
    }
  }
};

export { radioController };
