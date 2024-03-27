import express from "express";
import cors from "cors";
import db from "./database/db.js";
import Cpu_temp_routes from "./monitors/routes/Cpu_temp_route.js"
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
import { publish_msg } from "./mqtt.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cpu_temp", Cpu_temp_routes);
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

// Arrancar el servidor
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

let data = {
    "id": "1",
    "topic": "test",
    "message": "Hola mundo"
}

publish_msg("test/json", data, "192.168.1.137")
schedule.scheduleJob('* * * * *', () => {
    publish_msg("test/json", JSON.stringify(data), "192.168.1.137")
})
// Ping a los dispositivos cada 5 minutos
schedule.scheduleJob('* * * * *', checkDevices)



