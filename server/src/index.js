import * as dotenv from "dotenv"
dotenv.config()

import expressServer from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"

import { dbConnection } from "./configs/db.config.js"

import telecoRouter from "./routes/teleco.routes.js"

const app = expressServer()
const PORT = 3000

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/teleco", telecoRouter)

// ---------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`LabRem Teleco - Server on ${PORT}`)
})

export const db = dbConnection
