import express from "express"

import { telecoController } from "../controllers/teleco.controller.js"
import { radioController } from "../controllers/radio.controller.js"
import { wifiController } from "../controllers/wifi.controller.js"

const { postLaboratorio, getLaboratorios, getLaboratorio, getEnsayosUsuario, deleteEnsayo, deleteLaboratorio, getEnsayos, updateLaboratorio } = telecoController;
const { postEnsayoRadio, getEnsayosRadio } = radioController
const { postEnsayoWifi, getEnsayosWifi } = wifiController

const telecoRouter = express.Router()

// -----------------------------------------------------
// Endpoints - Laboratorios de Telecomunicaciones
// -----------------------------------------------------

telecoRouter.route("/")
    .get(getLaboratorios)
    .post(postLaboratorio)

telecoRouter.route("/wifi")
    .get(getEnsayosWifi)
    .post(postEnsayoWifi)

telecoRouter.route("/radio")
    .get(getEnsayosRadio)
    .post(postEnsayoRadio)

// -----------------------------------------------------
// Endpoints para Gestión
// -----------------------------------------------------

telecoRouter.route("/laboratorios/:idLaboratorio")
    .get(getLaboratorio)
    .post(updateLaboratorio)
    .delete(deleteLaboratorio)

telecoRouter.route("/ensayos/:idLaboratorio")
    .get(getEnsayos)

telecoRouter.route("/ensayos/:idEnsayo")
    .delete(deleteEnsayo)

// -----------------------------------------------------
// Endpoints con pasaje de parametro en la URL
// -----------------------------------------------------

telecoRouter.route("/:idLaboratorio")
    .get(getLaboratorio)

telecoRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)

export default telecoRouter
