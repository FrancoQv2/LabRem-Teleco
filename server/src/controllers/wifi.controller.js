import { sequelize, delay } from "../index.js";
import axios from "axios";

const idLaboratorio = 1;

const wifiController = {};

/**
 * -----------------------------------------------------
 * Function - postEnsayoWifi
 * -----------------------------------------------------
 */
wifiController.postEnsayoWifi = async (req, res) => {
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
          Msj="laboratorio ok y datos guardados en base de datos";
          break;
        case 1:
          Msj="Error en el angulo limite de azimut";
          break;
        case 2:
          Msj="Error en el angulo limite de elevacion";
          break;
        default:
          Msj="Error de  laboratorio incorrecto";
          break;
      }
      
      res.status(200).json(Msj);
    } catch (error) {
      console.error("-> ERROR postEnsayoWifi:", error);
    }
  }
};

export { wifiController };
