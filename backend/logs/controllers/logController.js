import { v1, validate } from "uuid"
import deviceModel from "../../devices/models/deviceModel.js"
import sensorsModel from "../../sensors/models/sensorsModel.js"
import actuadoresModel from "../../actuadores/models/actuadoresModel.js"
import logModel from "../models/logModel.js"

export const addLog = async (logData) => {
    console.log(logData)
    // Comprobar que los datos sean correctos
    if (!logData.deviceCode || !logData.logcode || !logData.timestamp || !logData.description || !logData.deviceName) {
        console.log("Error: Faltan datos")
        return
    }

    // Comprobar si los datos son válidos
    if (!validate(logData.deviceCode) || (logData.sensorCode && !validate(logData.sensorCode)) || (logData.actuadorCode && !validate(logData.actuadorCode))) {
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
        if (logData.sensorCode) {
            let sensor = await sensorsModel.findOne({ where: { id: logData.sensorCode } })
            if (sensor == null) {
                console.log("Error: Sensor no encontrado")
            }
        } else if (logData.actuadorCode) {
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

        if (!logData.sensorCode){
            await logModel.create({
                id: uuid,
                deviceCode: logData.deviceCode,
                sensorCode: logData.sensorCode,
                logcode: logData.logcode,
                timestamp: logData.timestamp,
                description: logData.description,
                deviceName: logData.deviceName
            })
        } else if (!logData.actuadorCode){
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