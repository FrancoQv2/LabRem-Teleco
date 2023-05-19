import axios from "axios"
import { delay } from "./delay.js"

// const URL_ARDUINO = "http://192.168.100.75:3031/api/control/arduino"
const URL_ARDUINO = "http://172.23.12.125:5033" // IP de wsl vista desde dev-teleco

export async function queryArduino(azimut, elevacion) {

    const body = {
        "Estado": [2, true, true],
        "Analogico": [azimut, elevacion]
    }

    let respuestaGet
    let msg = ''

    const respuestaPost = postArduino(azimut, elevacion)
    let i = 0

    do {
        respuestaGet = await axios.get(`${URL_ARDUINO}/api/teleco`)
        await delay(3000)
        i = i + 1
    } while (respuestaGet.data.Estado[2])

    console.log(respuestaGet.data.Error)

    return respuestaGet
}

export async function postArduino(azimut, elevacion) {
    let respuestaPost

    const body = {
        "Estado": [2, true, true],
        "Analogico": [azimut, elevacion]
    }

    try {
        respuestaPost = axios.post(`${URL_ARDUINO}/api/teleco`, body)
    } catch (error) {
        console.log(error);
    }
    
    return respuestaPost
}

export async function getArduino() {
    let response
    try {
        response = await axios.get(`${URL_ARDUINO}/api/teleco`)
    } catch (error) {
        console.log(error)
    }

    return response
}