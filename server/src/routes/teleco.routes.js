import express from "express"
import { telecoController } from "../controllers/teleco.controller.js"
import { radioController } from "../controllers/radio.controller.js"
import { wifiController } from "../controllers/wifi.controller.js"

const { getLaboratorios, postLaboratorio, getLaboratorioById, getEnsayosUsuario } = telecoController
const { postEnsayoRadio, getEnsayosRadio } = radioController
const { postEnsayoWifi, getEnsayosWifi } = wifiController

const telecoRouter = express.Router()

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Telecomunicaciones
 * -----------------------------------------------------
 */
telecoRouter.route("/")
    .get(getLaboratorios)
    .post(postLaboratorio)

telecoRouter.route("/wifi")
    .get(getEnsayosWifi)
    .post(postEnsayoWifi)

telecoRouter.route("/radio")
    .get(getEnsayosRadio)
    .post(postEnsayoRadio)

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
telecoRouter.route("/:idLaboratorio")
    .get(getLaboratorioById)

telecoRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)


export default telecoRouter
