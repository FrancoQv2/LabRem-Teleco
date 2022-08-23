import express from "express";
import { radioController } from "../controllers/radio.controller.js";
import { wifiController } from "../controllers/wifi.controller.js";

const { getInfoLabRadio, postLabRadio } = radioController;
const { getInfoLabWifi, postLabWifi } = wifiController;

const router = express.Router();

router.route("/");

router.route("/wifi").get(getInfoLabWifi).post(postLabWifi);

router.route("/radio").get(getInfoLabRadio).post(postLabRadio);

export default router;
