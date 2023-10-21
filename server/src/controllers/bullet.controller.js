import { getStatsBullet } from "../utils/bullet.js";

const bulletController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

bulletController.getSignalBullet = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getStatsBullet`)

    try {
        // const statsBullet = {
        //     signalStrength: -90
        // }
        // res.status(200).json(statsBullet)

        const response = await getStatsBullet()
        const statsBullet = {
            signalStrength: response.wireless.signal
        }
        res.status(200).send(statsBullet.wireless.signal)
    } catch (error) {
        res.status(500).send("Error al obtener el valor de la señal")
    }
}

export { bulletController }
