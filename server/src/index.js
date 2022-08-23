import * as dotenv from "dotenv";
dotenv.config();

import expressServer from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import Sequelize from "sequelize";

import telecoRouter from "./routes/routes.js";

const app = expressServer();
const PORT = process.env.SERVER_PORT || 3005;

//Necesitamos body-parser para formatear los post en express
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/teleco", telecoRouter);

// ---------------------------------------------------------------

// Levantamos el servidor para que escuche peticiones
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
  console.log("Wenas");
});

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);
