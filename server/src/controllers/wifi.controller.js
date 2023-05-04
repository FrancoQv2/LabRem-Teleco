import { db } from "../index.js"
import { QueryTypes } from "sequelize"

import { postArduino } from "../lib/arduino.js"
import { getStatsBullet } from "../lib/bullet.js";

const idLaboratorio = 1

const queries = {
    getEnsayosWifi: "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    // getEnsayosWifi: "CALL sp_dameEnsayos(:idLaboratorio);",
    postEnsayoWifi: "CALL sp_crearEnsayo(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
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
        newEnsayo.Usuario   = ensayo.idUsuario
        newEnsayo.Fecha     = ensayo.Fecha
        newEnsayo.Hora      = ensayo.Hora
        newEnsayo.Azimut    = ensayo.datosEntrada.rangoAzimut
        newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
        newEnsayo.Signal    = ensayo.datosSalida.signalStrength
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
            rangoAzimut: azimut
        }

        const statsBullet = await getStatsBullet()

        const datosSalida = {
            signalStrength: statsBullet.wireless.signal
        }

        try {
            // let resArduino = await postArduino(azimut, elevacion)

            // switch (resArduino.data.Error) {
            //     case 0:
            //         db.query(
            //             queries.postEnsayoWifi,
            //             {
            //                 replacements: {
            //                     idUsuario: idUsuario,
            //                     datosEntrada: JSON.stringify(datosEntrada),
            //                     datosSalida: JSON.stringify(datosSalida),
            //                     idLaboratorio: idLaboratorio
            //                 },
            //                 type: QueryTypes.INSERT
            //             }
            //         )
            //         msg = "Laboratorio OK y datos guardados en base de datos"
            //         break
            //     case 1:
            //         msg = "Error en el angulo limite de azimut"
            //         break
            //     case 2:
            //         msg = "Error en el angulo limite de elevacion"
            //         break
            //     default:
            //         msg = "Error de  laboratorio incorrecto"
            //         break
            // }

            // res.status(200).json(msg);

            db.query(
                queries.postEnsayoWifi,
                {
                    replacements: {
                        idUsuario:      idUsuario,
                        datosEntrada:   JSON.stringify(datosEntrada),
                        datosSalida:    JSON.stringify(datosSalida),
                        idLaboratorio:  idLaboratorio
                    }
                }
            )

            res.status(200).json("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoWifi:", error)
        }
    }
}

export { wifiController }
