import express from "express";
import { telecoController } from "../controllers/teleco.controller.js";
import { radioController } from "../controllers/radio.controller.js";
import { wifiController } from "../controllers/wifi.controller.js";

const { getLaboratorios, getLaboratorioById } = telecoController;
const { getInfoLabRadio, postLabRadio } = radioController;
const { postLabWifi, getEnsayosWifi, getEnsayosUsuario } = wifiController;

const telecoRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Telecomunicaciones
 * -----------------------------------------------------
 */
telecoRouter.route("/").get(getLaboratorios);

telecoRouter.route("/wifi").get(getEnsayosWifi).post(postLabWifi);

telecoRouter.route("/radio").get(getInfoLabRadio).post(postLabRadio);

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
telecoRouter.route("/:idLaboratorio").get(getLaboratorioById);

telecoRouter.route("/wifi/:idUsuario").get(getEnsayosUsuario);

export default telecoRouter;
