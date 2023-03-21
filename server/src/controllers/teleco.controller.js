import { db } from "../index.js"
import { QueryTypes } from "sequelize"

const telecoController = {}

const queries = {
    getLaboratorios: "SELECT * FROM Laboratorios;",
    getLaboratorioById: "SELECT area, nombre, descripcion FROM Laboratorios WHERE idLaboratorio = :idLaboratorio;",
    getEnsayosUsuario: "SELECT DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio AND idUsuario = :idUsuario;",
    postLaboratorio: "INSERT INTO Laboratorios(idLaboratorio,codigo,area,nombre,descripcion) VALUES(:idLaboratorio,:codigo,:area,:nombre,:descripcion);"
}

/**
 * 
 */
telecoController.getLaboratorios = async (req, res) => {
    const data = await db.query(
        queries.getLaboratorios,
        {
            type: QueryTypes.SELECT
        }
    )

    await res.send(data)
}


/**
 * 
 */
telecoController.getLaboratorioById = async (req, res) => {
    console.log(`--> getLaboratorioById - ${JSON.stringify(req.params)}`)
    console.log(`--> getLaboratorioById - ${JSON.stringify(req.query)}`)

    const { idLaboratorio } = req.params

    const response = await db.query(
        queries.getLaboratorioById,
        {
            replacements: {
                idLaboratorio: idLaboratorio
            },
            type: QueryTypes.SELECT
        }
    )

    await res.send(response[0])
}


/**
 * 
 */
telecoController.getEnsayosUsuario = async (req, res) => {
    console.log(`--> getEnsayosUsuario - ${JSON.stringify(req.params)}`)

    const { idLaboratorio, idUsuario } = req.params

    const response = await db.query(
        queries.getEnsayosUsuario,
        {
            replacements: {
                idLaboratorio: idLaboratorio,
                idUsuario: idUsuario,
            },
            type: QueryTypes.SELECT
        }
    )

    let dataParsed = []

    if (idLaboratorio == 1) {
        response.map((ensayo, index) => {
            const newEnsayo = {}
            newEnsayo.index = index + 1
            newEnsayo.Fecha = ensayo.Fecha
            newEnsayo.Hora = ensayo.Hora
            newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
            newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
            dataParsed.push(newEnsayo)
        })
    } else if (idLaboratorio == 2) {
        response.map((ensayo, index) => {
            const newEnsayo = {}
            newEnsayo.index = index + 1
            newEnsayo.Fecha = ensayo.Fecha
            newEnsayo.Hora = ensayo.Hora
            newEnsayo.Modulacion = ensayo.datosEntrada.tipoModulacion
            newEnsayo.Codificacion = ensayo.datosEntrada.tipoCodificacion
            newEnsayo.IntensidadMin = ensayo.datosEntrada.intensidadMin
            newEnsayo.IntensidadMax = ensayo.datosEntrada.intensidadMax
            dataParsed.push(newEnsayo)
        })
    }
    
    await res.json(dataParsed)
}




/**
 * 
 */
telecoController.postLaboratorio = (req, res) => {
    console.log(`--> postLaboratorio - ${JSON.stringify(req.body)}`)
    
    const { idLaboratorio, codigo, area, nombre, descripcion } = req.body

    try {
        db.query(
            queries.postLaboratorio,
            {
                replacements: {
                    idLaboratorio: idLaboratorio,
                    codigo: codigo,
                    area: area,
                    nombre: nombre,
                    descripcion: descripcion,
                },
                type: QueryTypes.INSERT
            }
        )
        res.status(200).json("Parámetros correctos")
    } catch (error) {
        res.status(500).send('Something broke!')
        console.error("-> ERROR postLaboratorio:", error)
    }
}

export { telecoController }
