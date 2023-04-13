import axios from "axios"
import { delay } from "./delay.js"

const URL_ARDUINO = "http://192.168.100.75:3031/api/control/arduino"

export async function postArduino(azimut, elevacion) {

    const postBody = {
        "Estado": [2, true, true],
        "Analogico": [azimut, elevacion]
    };

    let respuestaGet
    let msg = ''

    const respuestaPost = axios.post(`${URL_ARDUINO}/1`, postBody)
    let i = 0

    do {
        respuestaGet = await axios.get(`${URL_ARDUINO}/${i}`)
        await delay(3000)
        i = i + 1
    } while (respuestaGet.data.Estado[2])

    console.log(respuestaGet.data.Error)

    return respuestaGet
}