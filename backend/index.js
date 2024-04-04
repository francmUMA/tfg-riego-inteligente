import express from "express";
import cors from "cors";
import db from "./database/db.js";
import monitorRoute from "./monitors/routes/monitorRoute.js"
import userRoutes from "./users/routes/userRoutes.js"
import tokenRoutes from "./token/routes/tokenRoutes.js"
import deviceRoutes from "./devices/routes/deviceRoutes.js"
import actuadoresRoutes from "./actuadores/routes/actuadoresRoutes.js"
import sensorsRoutes from "./sensors/routes/sensorsRoutes.js"
import areasRoutes from "./areas/routes/areasRoutes.js"
import coordsRoutes from "./coordenadas/routes/coordsRoute.js"
import cropRoutes from "./crops/routes/cropRoutes.js"
import schedule from "node-schedule"
import { checkDevices } from "./devices/controllers/deviceController.js";
import { Worker } from 'worker_threads'

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/monitor", monitorRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", tokenRoutes)
app.use("/api/devices", deviceRoutes)
app.use("/api/actuadores", actuadoresRoutes)
app.use("/api/sensores", sensorsRoutes)
app.use("/api/areas", areasRoutes)
app.use("/api/coords", coordsRoutes)
app.use("/api/crops", cropRoutes)

// Conexion a la base de datos
try {
    await db.authenticate();
    console.log("Conexión a la base de datos exitosa");
} catch (error) {
    console.log("Conexión con la base de datos fallida");
}

const mqttWorker = new Worker('./mqttWorker.js')

export const sendCommandToWorker = (command, topic, payload) =>{
    mqttWorker.postMessage({command: command, topic: topic, payload: payload})
}

// Arrancar el servidor
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

// Ping a los dispositivos cada 5 minutos
schedule.scheduleJob('* * * * *', checkDevices)



