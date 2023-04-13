import express from "express"
import { telecoController } from "../controllers/teleco.controller.js"
import { radioController } from "../controllers/radio.controller.js"
import { wifiController } from "../controllers/wifi.controller.js"

// const { getLaboratorios, postLaboratorio, getLaboratorioById, getEnsayosUsuario } = telecoController
const { postLaboratorio, getLaboratorios, getLaboratorioById, getEnsayosUsuario,getDeleteEnsayo, getDeleteLaboratorio, getEnsayos, postModLab } = telecoController;
const { postEnsayoRadio, getEnsayosRadio } = radioController
const { postEnsayoWifi, getEnsayosWifi } = wifiController

const { postLab, getLaboratorios, getLaboratorioById, getEnsayosUsuario,getDeleteEnsayo, getDeleteLaboratorio, getEnsayos, postModLab } = telecoController;
const { postEnsayoRadio } = radioController;
const { postEnsayoWifi,postEnsayoWifisave } = wifiController;

const telecoRouter = express.Router()

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Telecomunicaciones
 * -----------------------------------------------------
 */
telecoRouter.route("/")
    .get(getLaboratorios)
    .post(postLaboratorio)

telecoRouter.route("/wifi").post(postEnsayoWifi);

telecoRouter.route("/wifisave").post(postEnsayoWifisave);

telecoRouter.route("/radio")
    .get(getEnsayosRadio)
    .post(postEnsayoRadio)

telecoRouter.route("/modificarLab")
    .post(postModLab); //para el grupo de gestion

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
telecoRouter.route("/:idLaboratorio")
    .get(getLaboratorioById)

telecoRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)

telecoRouter.route("/delete/ensayo/:idEnsayo")
    .get(getDeleteEnsayo); //para el grupo de gestion

telecoRouter.route("/delete/laboratorio/:idLaboratorio")
    .get(getDeleteLaboratorio); //para el grupo de gestion

telecoRouter.route("/ensayos/:idLaboratorio")
    .get(getEnsayos); //para el grupo de gestion

telecoRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario);

export default telecoRouter
