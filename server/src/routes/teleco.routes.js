import express from "express"

import { telecoController } from "../controllers/teleco.controller.js"
import { radioController } from "../controllers/radio.controller.js"
import { wifiController } from "../controllers/wifi.controller.js"

const { postLaboratorio, getLaboratorios, getLaboratorioById, getEnsayosUsuario,deleteEnsayo, deleteLaboratorio, getEnsayos, updateLaboratorio } = telecoController;
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
// Endpoints con pasaje de parametro en la URL
// -----------------------------------------------------

telecoRouter.route("/:idLaboratorio")
    .get(getLaboratorioById)

telecoRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)

// -----------------------------------------------------
// Endpoints para Gestión
// -----------------------------------------------------

telecoRouter.route("/update")
    .post(updateLaboratorio)

telecoRouter.route("/ensayo/:idEnsayo")
    .get(deleteEnsayo)

telecoRouter.route("/delete/laboratorio/:idLaboratorio")
    .get(deleteLaboratorio)

telecoRouter.route("/ensayos/:idLaboratorio")
    .get(getEnsayos)

export default telecoRouter
