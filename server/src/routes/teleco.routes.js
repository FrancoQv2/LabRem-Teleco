import express from "express";
import { telecoController } from "../controllers/teleco.controller.js";
import { radioController } from "../controllers/radio.controller.js";
import { wifiController } from "../controllers/wifi.controller.js";

const { postLab, getLaboratorios, getLaboratorioById, getEnsayosUsuario,getDeleteEnsayo, getDeleteLaboratorio, getEnsayos, postModLab } = telecoController;
const { postEnsayoRadio } = radioController;
const { postEnsayoWifi } = wifiController;

const telecoRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Telecomunicaciones
 * -----------------------------------------------------
 */
telecoRouter.route("/").get(getLaboratorios).post(postLab);

telecoRouter.route("/wifi").post(postEnsayoWifi);

telecoRouter.route("/radio").post(postEnsayoRadio);

telecoRouter.route("/modificarLab").post(postModLab); //para el grupo de gestion

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
telecoRouter.route("/:idLaboratorio").get(getLaboratorioById);

telecoRouter.route("/delete/ensayo/:idEnsayo").get(getDeleteEnsayo); //para el grupo de gestion

telecoRouter.route("/delete/laboratorio/:idLaboratorio").get(getDeleteLaboratorio); //para el grupo de gestion

telecoRouter.route("/ensayos/:idLaboratorio").get(getEnsayos); //para el grupo de gestion

telecoRouter.route("/:idLaboratorio/:idUsuario").get(getEnsayosUsuario);

export default telecoRouter;