import { db } from "../index.js"
import { delay } from "../utils/delay.js"

import { arduinoPOST, arduinoGET } from "../utils/arduino.js"
import { getStatsBullet } from "../utils/bullet.js";

const idLaboratorio = 1

const queries = {
    getEnsayosWifi: "CALL sp_dameEnsayosWifi();",
    postEnsayoWifi: "CALL sp_crearEnsayo(:idUsuario, :datosEntrada, :datosSalida, :idLaboratorio);"
}

const wifiController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

wifiController.getEnsayosWifi = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosWifi - ${JSON.stringify(req.params)}`)

    try {
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
    } catch (error) {
        res.status(404).send("No hay ensayos realizados en este laboratorio!")
    }
}

// -----------------------------------
// Métodos POST
// -----------------------------------

wifiController.postEnsayoWifi = async (req, res) => {
    console.log(`-\n--> postEnsayoWifi - ${JSON.stringify(req.body)}\n---`)

    const { idUsuario, elevacion, azimut } = req.body
    let msg

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
        console.log("datos de entrada", datosEntrada);
        
        try {
            console.log("EN EL TRY");
            let resPostArduino = await arduinoPOST(azimut, elevacion)
            console.log(resPostArduino)
            
            const resArduino = await arduinoGET()
            console.log(resArduino)

            // const statusArduino = await arduinoGET()

            // console.log(statusArduino)
            // if (statusArduino.data.Estado[2]) {
            //     console.log(statusArduino.data.Estado[2])
            // } else {
            //     console.log("Aún no terminó el ensayo!!")
            // }

            // switch (resArduino.data.Error) {
            //     case 0:
            //         break
            //     case 1:
            //         msg = "Error en el angulo limite de azimut"
            //         break
            //     case 2:
            //         msg = "Error en el angulo limite de elevacion"
            //         break
            //     default:
            //         msg = "Error de laboratorio incorrecto"
            //         break
            // }

            // const statsBullet = await getStatsBullet()

            const datosSalida = {
                // signalStrength: statsBullet.wireless.signal
                signalStrength: -90
            }

            // delay(1)
            console.log("ANTES DE DB QUERY");

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
            msg = "Laboratorio OK y datos guardados en base de datos"
            console.log(msg);

            res.status(200).json("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoWifi:", error)
            res.status(500).json("Falló el ensayo Wifi!")
        }
    }
}

export { wifiController };
