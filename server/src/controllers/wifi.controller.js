import { db } from "../index.js"
import { QueryTypes } from "sequelize"

import { postArduino } from "../lib/arduino.js"
import { getStatsBullet } from "../lib/bullet.js";

const idLaboratorio = 1

const queries = {
    getEnsayosWifi: "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    // postEnsayoWifi: "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
    postEnsayoWifi: "CALL sp_crearEnsayo (:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const wifiController = {}

/**
 * 
 */
wifiController.getEnsayosWifi = async (req, res) => {
    // console.log("-----");
    // console.log(req.path);
    // console.log(req.originalUrl);
    // console.log(req.params);
    // console.log(req.query);
    // console.log("-----");

    // const { idLaboratorio } = req.query

    const data = await db.query(
        queries.getEnsayosWifi,
        {
            replacements: {
                idLaboratorio: idLaboratorio
            },
            type: QueryTypes.SELECT
        }
    )

    let dataParsed = []
    data.map((ensayo) => {
        const newEnsayo = {}
        newEnsayo.Usuario = ensayo.idUsuario
        newEnsayo.Fecha = ensayo.Fecha
        newEnsayo.Hora = ensayo.Hora
        newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
        newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
        newEnsayo.Signal = ensayo.datosSalida.signalStrength
        dataParsed.push(newEnsayo)
    })

    await res.status(200).send(dataParsed)
}

// ------------------------------------------------------
// POST postEnsayoWifi
// ------------------------------------------------------

wifiController.postEnsayoWifi = async (req, res) => {
    console.log(`---\n--> postEnsayoWifi - ${JSON.stringify(req.body)}\n---`)

    const { idUsuario, elevacion, azimut } = req.body

    if (elevacion < 0 || elevacion > 90) {
        res.status(400)
            .send("Elevación incorrecta")
    } else if (azimut < 0 || azimut > 90) {
        res.status(400)
            .send("Azimut incorrecta")
    } else {

    const datosEntrada = {
      rangoElevacion: elevacion,
      rangoAzimut: azimut,
    };

    const datosSalida = {
      rangoElevacion: elevacion,
      rangoAzimut: azimut,
    };
    const url='http://192.168.100.75:3031/api/control/arduino';//cambiar por ip arduino
    
    const body={
      "Estado" : [2,true,true],
      "Analogico" : [azimut,elevacion]
    };
    let respuestaGet;
    let Msj='';
    try {
      const respuestaPost = axios.post(`${url}/1`,body);
      let i=0;
      do {
        respuestaGet = await axios.get(`${url}/${i}`);
        await delay(3000);
        i = i+1;
      } while (respuestaGet.data.Estado[2]);
      console.log(respuestaGet.data.Error);
      switch (respuestaGet.data.Error) {
        case 0:
          Msj="laboratorio ok";
          break;
        case 1:
          Msj="Error en el angulo limite de azimut";
          break;
        case 2:
          Msj="Error en el angulo limite de elevacion";
          break;
        default:
          Msj="Error de laboratorio incorrecto";
          break;
      }
      
      res.status(200).json(Msj);
    } catch (error) {
      console.error("-> ERROR postEnsayoWifi:", error);
    }
}

wifiController.postEnsayoWifisave = async (req, res) => {
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
      
      res.status(200).json("guardado en base de datos");
    } catch (error) {
      console.error("-> ERROR postEnsayoWifi:", error);
    }
  }
};
export { wifiController };
