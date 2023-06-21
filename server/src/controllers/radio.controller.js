import { db } from "../index.js"

import axios from "axios"

const idLaboratorio = 2

const queries = {
    getEnsayosRadio: "CALL sp_dameEnsayosRadio();",
    postEnsayoRadio: "CALL sp_crearEnsayo(:idUsuario, :datosEntrada, :datosSalida, :idLaboratorio);"
}

const radioController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

radioController.getEnsayosRadio = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosRadio - ${JSON.stringify(req.params)}`)

    try {
        const data = await db.query(
            queries.getEnsayosRadio
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
    } catch (error) {
        res.status(404).send("No hay ensayos realizados en este laboratorio!")
    }
}

// -----------------------------------
// Métodos POST
// -----------------------------------

radioController.postEnsayoRadio = (req, res) => {
    console.log(`-\n--> postEnsayoRadio - ${JSON.stringify(req.body)}\n---`)

    const {
        idUsuario,
        tipoModulacion,
        tipoCodificacion,
        intensidadMin,
        intensidadMax,
    } = req.body

    if (
        tipoModulacion !== "4-QAM"  &&
        tipoModulacion !== "8-QAM"  &&
        tipoModulacion !== "16-QAM" &&
        tipoModulacion !== "PSK"    &&
        tipoModulacion !== "FSK"    &&
        tipoModulacion !== "QPSK"
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
        const datosEntrada = {
            tipoModulacion:     tipoModulacion,
            tipoCodificacion:   tipoCodificacion,
            intensidadMax:      intensidadMax,
            intensidadMin:      intensidadMin
        }

        // Estos datos se deben obtener
        const datosSalida = {
            intensidad: 10,     // dBm
            tasaError: 0.05     // cantidad de bits con error / bits transmitidos
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
                    }
                }
            )
            res.status(200).send("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoRadio:", error)
            res.status(500).json("Falló el ensayo Radio!")
        }
    }
}

export { radioController }
