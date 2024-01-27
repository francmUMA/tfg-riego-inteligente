import express from "express";
import cors from "cors";
import db from "./database/db.js";
import Cpu_temp_routes from "./monitors/routes/Cpu_temp_route.js"
import userRoutes from "./users/routes/userRoutes.js"
import tokenRoutes from "./token/routes/tokenRoutes.js"
import deviceRoutes from "./devices/routes/deviceRoutes.js"

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
