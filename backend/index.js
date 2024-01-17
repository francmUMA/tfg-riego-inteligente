import express from "express";
import cors from "cors";
import db from "./database/db.js";
import Cpu_temp_routes from "./monitors/routes/Cpu_temp_route.js"

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cpu_temp", Cpu_temp_routes);
app.post("/" , (req, res) => {
    console.log(req.body.device);
    console.log(req.body.value);
    res.status(200).send("OK");
})




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
