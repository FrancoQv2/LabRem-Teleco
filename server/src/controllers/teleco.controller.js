import { db } from "../index.js"
import { QueryTypes } from "sequelize"

import axios from "axios"

const telecoController = {}

const queries = {
    // getLaboratorios: "SELECT * FROM Laboratorios;",
    getLaboratorios: "CALL sp_dameLaboratorios();",
    // getLaboratorioById: "select * from Laboratorios where ",
    getLaboratorioById: "CALL sp_dameLaboratorio(:idLaboratorio);",
    getEnsayosUsuario: "SELECT DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE idLaboratorio = :idLaboratorio AND idUsuario = :idUsuario;",
    // getEnsayosUsuario: "CALL sp_dameEnsayo(:idUsuario,:idLaboratorio);",
    postLaboratorio: "INSERT INTO Laboratorios(idLaboratorio,codigo,area,nombre,descripcion) VALUES(:idLaboratorio,:codigo,:area,:nombre,:descripcion);"
}

/**
 * 
 */
telecoController.getLaboratorios = async (req, res) => {
    const data = await db.query(
        queries.getLaboratorios
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
    console.log(idLaboratorio);

    const response = await db.query(
        queries.getLaboratorioById,
        {
            replacements: {
                idLaboratorio: idLaboratorio
            },
            // type: QueryTypes.SELECT
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
            newEnsayo.Signal = `${ensayo.datosSalida.signalStrength} dBm`
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

    await res.status(200).json(dataParsed)
}

/**
 * 
 */
telecoController.postLaboratorio = async (req, res) => {
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

    let dataParsed = [];

    if (idLaboratorio == 1) {
        response.map((ensayo) => {
            const newEnsayo = {}
            newEnsayo.Fecha = ensayo.Fecha
            newEnsayo.Hora = ensayo.Hora
            newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
            newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
            dataParsed.push(newEnsayo)
        })
    } else if (idLaboratorio == 2) {
        response.map((ensayo) => {
            const newEnsayo = {}
            newEnsayo.Fecha = ensayo.Fecha
            newEnsayo.Hora = ensayo.Hora
            newEnsayo.Modulacion = ensayo.datosEntrada.tipoModulacion
            newEnsayo.Codificacion = ensayo.datosEntrada.tipoCodificacion
            newEnsayo.IntensidadMin = ensayo.datosEntrada.intensidadMin
            newEnsayo.IntensidadMax = ensayo.datosEntrada.intensidadMax
            dataParsed.push(newEnsayo)
        })
    }
    console.log("--------------------------------");
    console.log(response);
    console.log("--------------------------------");

    await res.send(JSON.stringify(dataParsed));

    // const { area, nombre, imagen, descripcion } = req.body;

    // if (area == null) {
    //     res.status(400).json("Area nula");
    // } else if (nombre == null) {
    //     res.status(400).json("nombre nulo");
    // } else if (descripcion == null) {
    //     res.status(400).json("Descripcion nula");
    // } else {
    //     try {
    //         sequelize.query(
    //             "CALL sp_crearLaboratorio (:area,:nombre,:imagen,:descripcion);",
    //             {
    //                 replacements: {
    //                     area: area,
    //                     nombre: nombre,
    //                     imagen: imagen,
    //                     descripcion: descripcion,
    //                 }
    //             }
    //         );
    //         res.status(200).json("Parámetros correctos");
    //     } catch (error) {
    //         console.error("-> ERROR postLab:", error);
    //     }
    // }
};


/**
 * @param {number} idEnsayo
 * @return {object} informacion de un ensayo en particular
 */
telecoController.getDeleteEnsayo = async (req, res) => {
    const { idEnsayo } = req.params;

    const response = await sequelize.query(
        "CALL sp_borrarEnsayo(:idEnsayo);",
        {
            replacements: {
                idEnsayo: idEnsayo
            }
        }
    );

    await res.send(response[0]);
};

/**
 * @param {number} idLaboratorio
 * @return {object} informacion de un laboratorio en particular
 */
telecoController.getDeleteLaboratorio = async (req, res) => {
    const { idLaboratorio } = req.params;

    const response = await sequelize.query(
        "CALL sp_borrarLaboratorio(:idLaboratorio);",
        {
            replacements: {
                idLaboratorio: idLaboratorio
            }
        }
    );

    await res.send(response[0]);
};

/**
 * @param {number} idLaboratorio
 * @return {object} informacion de un laboratorio en particular
 */
telecoController.getEnsayos = async (req, res) => {
    const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "CALL sp_dameEnsayos(:idLaboratorio);",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      } 
    }
  );
  
  let dataParsed = [];
  
  if (idLaboratorio == 1) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.Azimut = ensayo.datosEntrada.rangoAzimut
      newEnsayo.Elevacion = ensayo.datosEntrada.rangoElevacion
      dataParsed.push(newEnsayo)
    })
  } else if (idLaboratorio == 2) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.Modulacion = ensayo.datosEntrada.tipoModulacion
      newEnsayo.Codificacion = ensayo.datosEntrada.tipoCodificacion
      newEnsayo.IntensidadMin = ensayo.datosEntrada.intensidadMin
      newEnsayo.IntensidadMax = ensayo.datosEntrada.intensidadMax
      dataParsed.push(newEnsayo)
    })
  }
  console.log("--------------------------------");
  console.log(response);
  console.log("--------------------------------");
  
  await res.send(JSON.stringify(dataParsed));
};

/**
 * @param {string} idLaboratorio
 * @return
 */
telecoController.postModLab = async (req, res) => {
    const { idLaboratorio, area, nombre, imagen, descripcion } = req.body;
    const respuesta = await sequelize.query(
        "CALL sp_dameLaboratorio(:idLaboratorio)",
        {
            replacements: {
                idLaboratorio: idLaboratorio
            }
        }
    );
    
    if (respuesta[0] == null) {
        res.status(400).json("codigo no asociado a ningun laboratorio existente");
    } else if (area == null) {
        res.status(400).json("Area nula");
    } else if (nombre == null) {
        res.status(400).json("nombre nulo");
    } else if (descripcion == null) {
        res.status(400).json("Descripcion nula");
    } else {

        try {
            sequelize.query(
                "CALL sp_modificarLaboratorio (:idLaboratorio,:area,:nombre,:imagen,:descripcion);",
                {
                    replacements: {
                        idLaboratorio: idLaboratorio,
                        area: area,
                        nombre: nombre,
                        imagen: imagen,
                        descripcion: descripcion,
                    }
                }
            );
            res.status(200).json("modificado correctamente");
        } catch (error) {
            console.error("-> ERROR postLab:", error);
        }
    }
};

export { telecoController };
