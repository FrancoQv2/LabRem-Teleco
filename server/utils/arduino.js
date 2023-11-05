import { exec } from 'child_process'

const URL_ARDUINO = process.env.URL_ARDUINO

const GET  = 'GET /  HTTP/1.1'
const POST = 'POST / HTTP/1.1'

// curl -X GET http://10.0.255.110 -H 'Content-Type: text/plain' -d 'GET /  HTTP/1.1'
async function arduinoGET(azimut, elevacion) {
    const curlGET = `curl -X GET ${URL_ARDUINO} -H 'Content-Type: text/plain' -d '${GET}'`

    return new Promise((resolve, reject) => {
        exec(curlGET, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve(stdout)
        })
    })
}

// curl -X POST http://10.0.255.110 -H 'Content-Type: text/plain' -d 'POST / HTTP/1.1 {"Estado": [2,true,true],"Analogico": [15,15]}'
async function arduinoPOST(azimut, elevacion) {
    const body = `{"Estado": [2,true,true],"Analogico": [${azimut},${elevacion}]}`
    const curlPOST = `curl -X POST ${URL_ARDUINO} -H 'Content-Type: text/plain' -d '${POST} ${body}'`

    return new Promise((resolve, reject) => {
        exec(curlPOST, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve(stdout)
        })
    })
}

export { arduinoGET, arduinoPOST }

// (async () => {
//     try {
//         const stats = await getStatsBullet();
//         const statsJSON = JSON.stringify(stats, null, 2); // Convierte a JSON con formato legible
//         console.log(statsJSON);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();
