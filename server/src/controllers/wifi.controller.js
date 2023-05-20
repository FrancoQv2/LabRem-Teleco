import { db } from "../index.js"

import { postArduino, getArduino } from "../lib/arduino.js"
import { getStatsBullet } from "../lib/bullet.js";

const idLaboratorio = 1

const queries = {
    getEnsayosWifi: "CALL sp_dameEnsayosWifi();",
    postEnsayoWifi: "CALL sp_crearEnsayo(:idUsuario, :datosEntrada, :datosSalida, :idLaboratorio);"
}

const wifiController = {}

/**
 * 
 */
wifiController.getEnsayosWifi = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosWifi - ${JSON.stringify(req.params)}`)

    const data = await db.query(
        queries.getEnsayosWifi
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

/**
 * 
 */
wifiController.postEnsayoWifi = async (req, res) => {
    console.log(`-\n--> postEnsayoWifi - ${JSON.stringify(req.body)}\n---`)

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

        // const statsBullet = await getStatsBullet()

        const datosSalida = {
            // signalStrength: statsBullet.wireless.signal
            signalStrength: -90
        }

        // const resArduino = await getArduino()
        // console.log("--asd")
        // console.log(resArduino.status)

        try {
            let resArduino = await postArduino(azimut, elevacion)
            console.log(resArduino.data.msg)


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

            // res.status(200).json({msg: msg});


            db.query(
                queries.postEnsayoWifi,
                {
                    replacements: {
                        idUsuario: idUsuario,
                        datosEntrada: JSON.stringify(datosEntrada),
                        datosSalida: JSON.stringify(datosSalida),
                        idLaboratorio: idLaboratorio
                    }
                }
            )

            res.status(200).json({ msg: "Parámetros correctos. Guardado en DB" })
        } catch (error) {
            res.status(500).json({ msg: "Error en postEnsayoWifi!" })
            console.error("-> ERROR postEnsayoWifi:", error)
        }
    }
}

export { wifiController };
