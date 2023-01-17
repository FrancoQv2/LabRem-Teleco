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
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(CONVERT_TZ(fechaHora, '+00:00', '-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );
  
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
      // let ts = Date.now();

      // let date_ob = new Date(ts);

      // let year = date_ob.getFullYear();
      // let month = (date_ob.getMonth() + 1) < 10 ? `0${date_ob.getMonth() + 1}` : (date_ob.getMonth() + 1)
      // let date = date_ob.getDate() < 10 ? `0${date_ob.getDate()}` : date_ob.getDate()

      // let hours = date_ob.getHours() < 10 ? `0${date_ob.getHours()}` : date_ob.getHours()
      // let minutes = date_ob.getMinutes() < 10 ? `0${date_ob.getMinutes()}` : date_ob.getMinutes()
      // let seconds = date_ob.getSeconds() < 10 ? `0${date_ob.getSeconds()}` : date_ob.getSeconds()

      // console.log(year + "-" + month + "-" + date);
      // console.log(`${year}-${month}-${date} ${date_ob.getHours()}:${date_ob.getMinutes()}:${date_ob.getSeconds()}`);

      // let nowDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      // console.log(nowDate);

      sequelize.query(
        // "INSERT INTO Ensayos(idUsuario,fechaHora,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:fechaHora,:datosEntrada,:datosSalida,:idLaboratorio);",
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            // fechaHora: nowDate,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postEnsayoWifi:", error);
    }
  }
};

export { wifiController };
