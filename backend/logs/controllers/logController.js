import { v1, validate } from "uuid"
import deviceModel from "../../devices/models/deviceModel.js"
import sensorsModel from "../../sensors/models/sensorsModel.js"
import actuadoresModel from "../../actuadores/models/actuadoresModel.js"
import { get_nif_by_token } from "../../users/controllers/userController.js"
import logModel from "../models/logModel.js"

export const addLog = async (logData) => {
    console.log(logData)
    // Comprobar que los datos sean correctos
    if (!logData.deviceCode || !logData.logcode || !logData.timestamp || !logData.description || !logData.deviceName) {
        console.log("Error: Faltan datos")
        return
    }

    // Comprobar si los datos son válidos
    if (!validate(logData.deviceCode) || 
        (logData.sensorCode !== undefined && !validate(logData.sensorCode)) || 
        (logData.actuadorCode !== undefined && !validate(logData.actuadorCode))) {
        console.log("Error: Código no válido")
        return
    }

    if (logData.deviceName.length > 50) {
        console.log("Error: Nombre demasiado largo")
        return
    }

    if (logData.description.length > 255) {
        console.log("Error: Descripción demasiado larga")
        return
    }

    // Comprobar que existan los elementos
    try {
        let device = await deviceModel.findOne({ where: { id: logData.deviceCode } })
        if (device == null) {
            console.log("Error: Dispositivo no encontrado")
            return
        }
        if (logData.sensorCode !== undefined) {
            let sensor = await sensorsModel.findOne({ where: { id: logData.sensorCode } })
            if (sensor == null) {
                console.log("Error: Sensor no encontrado")
            }
        } else if (logData.actuadorCode !== undefined) {
            let actuador = await actuadoresModel.findOne({ where: { id: logData.actuadorCode } })
            if (actuador == null) {
                console.log("Error: Actuador no encontrado")
            }
        }

        // Crear id
        let uuid = v1()
        if (uuid == null) {
            console.log("Error: No se pudo crear el id")
            return
        }

        if (logData.sensorCode !== undefined){
            await logModel.create({
                id: uuid,
                deviceCode: logData.deviceCode,
                sensorCode: logData.sensorCode,
                logcode: logData.logcode,
                timestamp: logData.timestamp,
                description: logData.description,
                deviceName: logData.deviceName
            })
        } else if (logData.actuadorCode !== undefined){
            await logModel.create({
                id: uuid,
                deviceCode: logData.deviceCode,
                actuadorCode: logData.actuadorCode,
                logcode: logData.logcode,
                timestamp: logData.timestamp,
                description: logData.description,
                deviceName: logData.deviceName
            })
        } else {
            await logModel.create({
                id: uuid,
                deviceCode: logData.deviceCode,
                logcode: logData.logcode,
                timestamp: logData.timestamp,
                description: logData.description,
                deviceName: logData.deviceName
            })
        }
        console.log("Log añadido correctamente")
    } catch (error) {
        console.log("Error: ", error)
        return
    }
}

/**
 * @description Obtiene los logs de un dispositivo
 * @param  deviceId -> identificador del dispositivo
 * @returns logs -> logs del dispositivo
 */
export const getDeviceLogs = async (req, res) => {
    // Validar token
    let nif
    try {
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }
    // Comprobar que hay datos
    if (!req.params.deviceId) {
        res.status(400).send("Falta el id del dispositivo")
        return
    }

    // Comprobar que el id es válido
    if (!validate(req.params.deviceId)) {
        res.status(400).send("Id de dispositivo no válido")
        return
    }

    // Comprobar que el dispositivo existe
    try{
        let device = await deviceModel.findOne({ where: { id: req.params.deviceId } })
        if (device == null) {
            res.status(404).send("El dispositivo no existe")
            return
        }

        // Obtener los logs
        let logs = await logModel.findAll({ where: { deviceCode: req.params.deviceId } })
        if (logs == null) {
            res.status(404).send("No hay logs")
            return
        }
        res.status(200).send(logs)
    } catch (error) {
        res.send(500).send("Error al obtener los logs")
        return
    }

} 