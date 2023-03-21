import { db } from "../index.js"
import { QueryTypes } from "sequelize"

const idLaboratorio = 1

const queries = {
    getEnsayosWifi: "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    postEnsayoWifi: "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const wifiController = {}

/**
 * 
 */
wifiController.getEnsayosWifi = async (req, res) => {
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
        dataParsed.push(newEnsayo)
    })

    await res.send(dataParsed)
}


/**
 * 
 */
wifiController.postEnsayoWifi = (req, res) => {
    console.log(`--> postEnsayoWifi - ${JSON.stringify(req.body)}`)

    const { idUsuario, elevacion, azimut } = req.body

    if (elevacion < 0 || elevacion > 90) {
        res.status(400).send("Elevación incorrecta")
    } else if (azimut < 0 || azimut > 90) {
        res.status(400).send("Azimut incorrecta")
    } else {

        const datosEntrada = {
            rangoElevacion: elevacion,
            rangoAzimut: azimut
        }
        const datosSalida = {
            rangoElevacion: elevacion,
            rangoAzimut: azimut
        }

        try {
            db.query(
                queries.postEnsayoWifi,
                {
                    replacements: {
                        idUsuario: idUsuario,
                        datosEntrada: JSON.stringify(datosEntrada),
                        datosSalida: JSON.stringify(datosSalida),
                        idLaboratorio: idLaboratorio
                    },
                    type: QueryTypes.INSERT
                }
            )
            res.status(200).json("Parámetros correctos")
        } catch (error) {
            console.error("-> ERROR postEnsayoWifi:", error)
        }
    }
}

export { wifiController }
