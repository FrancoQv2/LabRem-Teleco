import { db } from "../index.js"
import { QueryTypes } from "sequelize"

import axios from "axios"

const idLaboratorio = 2

const queries = {
    getEnsayosRadio: "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio;",
    // getEnsayosRadio: "CALL sp_dameEnsayos(:idLaboratorio);",
    postEnsayoRadio: "CALL sp_crearEnsayo(:idUsuario, :datosEntrada, :datosSalida, :idLaboratorio);"
}

const radioController = {}

/**
 * 
 */
radioController.getEnsayosRadio = async (req, res) => {
    const data = await db.query(
        queries.getEnsayosRadio,
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
        newEnsayo.intensidadMin     = ensayo.datosEntrada.intensidadMin
        newEnsayo.intensidadMax     = ensayo.datosEntrada.intensidadMax
        newEnsayo.tipoModulacion    = ensayo.datosEntrada.tipoModulacion
        newEnsayo.tipoCodificacion  = ensayo.datosEntrada.tipoCodificacion
        dataParsed.push(newEnsayo)
    })

    await res.send(dataParsed)
}

/**
 * 
 */
radioController.postEnsayoRadio = (req, res) => {
    const {
        idUsuario,
        tipoModulacion,
        tipoCodificacion,
        intensidadMin,
        intensidadMax,
    } = req.body

    if (
        tipoModulacion !== 1 &&   // "4-QAM"
        tipoModulacion !== 2 &&   // "8-QAM"
        tipoModulacion !== 3 &&   // "16-QAM"
        tipoModulacion !== 4 &&   // "PSK"
        tipoModulacion !== 5 &&   // "FSK"
        tipoModulacion !== 6      // "QPSK"
    ) {
        res.status(400).json("Tipo de Modulacion Incorrecta")
    } else if (
        tipoCodificacion !== 1 &&
        tipoCodificacion !== 2 &&
        tipoCodificacion !== 3
    ) {
        res.status(400).json("El Tipo de Codificación no válido")
    } else if (intensidadMax < intensidadMin) {
        res.status(400).json("El rango mínimo supera al rango máximo")
    } else if (
        intensidadMin !== 10 &&
        intensidadMin !== 15 &&
        intensidadMin !== 20 &&
        intensidadMin !== 25
    ) {
        res.status(400).json("La Intensidad Mínima no es válida")
    } else if (
        intensidadMax !== 50 &&
        intensidadMax !== 80 &&
        intensidadMax !== 100 &&
        intensidadMax !== 120
    ) {
        res.status(400).json("La Intensidad Máxima no es válida")
    } else {
        const modulaciones = ["4-QAM","8-QAM","16-QAM","PSK","FSK","QPSK"]

        const datosEntrada = {
            tipoModulacion:     modulaciones[tipoModulacion-1],
            tipoCodificacion:   tipoCodificacion,
            intensidadMax:      intensidadMax,
            intensidadMin:      intensidadMin
        }

        // Estos datos se deben obtener
        const datosSalida = {
            intensidad: 10,     // dBm
            tasaError:  0.05    // cantidad de bits con error / bits transmitidos
        }

        try {
            db.query(
                queries.postEnsayoRadio,
                {
                    replacements: {
                        idUsuario:      idUsuario,
                        datosEntrada:   JSON.stringify(datosEntrada),
                        datosSalida:    JSON.stringify(datosSalida),
                        idLaboratorio:  idLaboratorio
                    },
                    type: QueryTypes.INSERT
                }
            )
            res.status(200).send("Parámetros correctos")
        } catch (error) {
            console.error("-> ERROR postEnsayoRadio:", error)
        }
    }
}

export { radioController }
