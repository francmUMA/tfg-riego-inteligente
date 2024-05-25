import Cpu_temp_Model from '../models/monitorModel.js';
import { get_nif_by_token } from '../../users/controllers/UserController.js';
import { validate } from 'uuid';
import deviceModel from '../../devices/models/deviceModel.js';
import monitorModel from '../models/monitorModel.js';
import sensorsModel from '../../sensors/models/sensorsModel.js';
import { v1 } from 'uuid';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import actuadoresModel from '../../actuadores/models/actuadoresModel.js';
import e from 'cors';

/**
 * 
 * @param {
 *  "deviceCode"?: string,
 *  "sensorCode"?: string,
 *  "actuadorCode"?: string,
 *  "value": number,
 *  "time": string
 * } data  
 */
export const addValue = async (data) => {
    let uuid = v1()

    if ((data.value === undefined) || data.time === undefined) {
        console.log("Faltan datos para añadir el valor")
        return
    }

    // Es la info de temperatura de la CPU
    if (data.deviceCode !== undefined) {
        // Validar que el codigo del dispositivo sea correcto
        if (!validate(data.deviceCode)) {
            console.log("Codigo de dispositivo invalido")
            return
        }

        try {
            // Comprobar si el dispositivo existe
            let device = await deviceModel.findOne({ where: { id: data.deviceCode } })
            if (device == null) {
                console.log("El dispositivo no existe")
                return
            }

            // Comprobar que no haya un valor en la misma fecha
            let last_value = await monitorModel.findOne({ where: { deviceCode: data.deviceCode, time: data.time } })
            if (last_value != null) {
                console.log("Ya existe un valor en la misma fecha")
                return
            }

            // Añadir el valor
            await monitorModel.create({
                id: uuid,
                deviceCode: data.deviceCode,
                value: data.value,
                time: data.time
            })
            console.log("Valor añadido correctamente")
        } catch (error) {
            console.log("Error al añadir el valor")
        }
    } else if (data.sensorCode !== undefined) {
        // Validar que el codigo del dispositivo sea correcto
        if (!validate(data.sensorCode)) {
            console.log("Codigo de sensor invalido")
            return
        }

        try {
            // Comprobar si el dispositivo existe
            let sensor = await sensorsModel.findOne({ where: { id: data.sensorCode } })
            if (sensor == null) {
                console.log("El dispositivo no existe")
                return
            }

            // Comprobar que no haya un valor en la misma fecha
            let last_value = await monitorModel.findOne({ where: { sensorCode: data.sensorCode, time: data.time, type: data.type } })
            if (last_value != null) {
                console.log("Ya existe un valor en la misma fecha")
                return
            }

            // Añadir el valor
            await monitorModel.create({
                id: uuid,
                type: data.type,
                sensorCode: data.sensorCode,
                value: data.value,
                time: data.time
            })
            console.log("Valor añadido correctamente")
        } catch (error) {
            console.log(error)
        }
    } else if (data.actuadorCode !== undefined) {
        // Validar que el codigo del dispositivo sea correcto
        if (!validate(data.actuadorCode)) {
            console.log("Codigo de actuador invalido")
            return
        }

        try {
            // Comprobar si el dispositivo existe
            let actuador = await actuadoresModel.findOne({ where: { id: data.actuadorCode } })
            if (actuador == null) {
                console.log("El dispositivo no existe")
                return
            }

            // Comprobar que no haya un valor en la misma fecha
            let last_value = await monitorModel.findOne({ where: { actuadorCode: data.actuadorCode, time: data.time } })
            if (last_value != null) {
                console.log("Ya existe un valor en la misma fecha")
                return
            }
            // Añadir el valor
            await monitorModel.create({
                id: uuid,
                actuadorCode: data.actuadorCode,
                value: data.value,
                time: data.time
            })
            console.log("Valor añadido correctamente")
        } catch (error) {
            console.log("Error al añadir el valor")
        }
    }
}

/**
 * 
 * @param {
 *  "id": string
 * } params  
 */	
export const getSensorValue = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findOne({ where: { sensorCode: req.params.id }, order: [['time', 'DESC']] })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_values_by_device = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let values = await Cpu_temp_Model.findAll({ where: { device: req.params.id } })
        if (values === null) {
            res.status(404).send("Values not found")
            return
        }
        // Enviar solamente time y value
        let response = []
        for (let i = 0; i < values.length; i++) {
            response.push({ time: values[i].time, value: values[i].value })
        }
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/**
 * @description Obtiene las últimas 24h de valores de la temperatura de un sensor
 * @param {
*  id: string
* } params  
*/	
export const getSensorLast24hValuesTemp = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findAll({ where: { 
            sensorCode: req.params.id, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) },
            type: 0 
        } })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las últimas 24h de valores de la temperatura de suelo de un sensor
 * @param {
*  id: string
* } params  
*/	
export const getSensorLast24hValuesSoilTemp = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findAll({ where: { 
            sensorCode: req.params.id, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) },
            type: 1 
        } })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las últimas 24h de valores de la humedad de un sensor
 * @param {
*  id: string
* } params  
*/	
export const getSensorLast24hValuesHum = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findAll({ where: { 
            sensorCode: req.params.id, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) },
            type: 2 
        } })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las últimas 24h de valores de la humedad del suelo de un sensor
 * @param {
*  id: string
* } params  
*/	
export const getSensorLast24hValuesSoilHum = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findAll({ where: { 
            sensorCode: req.params.id, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) },
            type: 3
        } })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las últimas 24h de valores de caudal
 * @param {
*  id: string
* } params  
*/	
export const getSensorLast24hValuesFlow = async (req, res) => {
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

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }

    // ----------------------------------------------------------
    try {
        let last_value = await monitorModel.findAll({ where: { 
            actuadorCode: req.params.id, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) },
        } })
        if (last_value === null) {
            res.status(404).send("Value not found")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene el último valor de la temperatura de un device
 * @param deviceId identificador del device
 * @returns último valor de la temperatura del device
 */
export const getDeviceTemperature = async (req, res) => {
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

    if (!req.params.deviceId) {
        res.status(400).send("Falta el id del dispositivo")
        return
    }

    if (!validate(req.params.deviceId)) {
        res.status(400).send("Id de dispositivo no válido")
        return
    }

    try {
        let device = await deviceModel.findOne({ where: { id: req.params.deviceId } })
        if (device == null) {
            res.status(404).send("El dispositivo no existe")
            return
        }

        let last_value = await monitorModel.findOne({ where: { deviceCode: req.params.deviceId }, order: [['time', 'DESC']] })
        if (last_value === null) {
            res.status(404).send("Valor no encontrado")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send("Error al obtener el valor")
    }
}

/**
 * @description Obtiene los valores de la temperatura de un device en las últimas 24 horas
 * @param deviceId identificador del device
 * @returns valores de la temperatura del device
 */
export const getDeviceTemperatureLast24hValues = async (req, res) => {
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

    if (!req.params.deviceId) {
        res.status(400).send("Falta el id del dispositivo")
        return
    }

    if (!validate(req.params.deviceId)) {
        res.status(400).send("Id de dispositivo no válido")
        return
    }

    try {
        let device = await deviceModel.findOne({ where: { id: req.params.deviceId } })
        if (device == null) {
            res.status(404).send("El dispositivo no existe")
            return
        }

        let last_value = await monitorModel.findAll({ where: { 
            deviceCode: req.params.deviceId, 
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) } 
        } })
        if (last_value === null) {
            res.status(404).send("Valor no encontrado")
            return
        }
        res.status(200).send(last_value)
    } catch (error) {
        res.status(500).send("Error al obtener el valor")
    }
}

/**
 * @description Obtiene todos los valores de la temperatura de un device ordenado de la más antigua a la más reciente
 * @param deviceId identificador del device
 * @returns valores de la temperatura del device
 */
export const getDeviceTemperatureValues = async (req, res) => {
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

    if (!req.params.deviceId) {
        res.status(400).send("Falta el id del dispositivo")
        return
    }

    if (!validate(req.params.deviceId)) {
        res.status(400).send("Id de dispositivo no válido")
        return
    }

    try {
        let device = await deviceModel.findOne({ where: { id: req.params.deviceId } })
        if (device == null) {
            res.status(404).send("El dispositivo no existe")
            return
        }

        let values = await monitorModel.findAll({ where: { deviceCode: req.params.deviceId }, order: [['time', 'ASC']] })
        if (values === null) {
            res.status(404).send("Valores no encontrados")
            return
        }
        res.status(200).send(values)
    } catch (error) {
        res.status(500).send("Error al obtener los valores")
    }
}

/**
 * @description Obtiene el valor promedio de la temperatura de un área
 * @param areaId identificador del device
 * @returns valor promedio de los datos de la temperatura del area
 */
export const getAreaMeanTemperature = async (req, res) => {
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

    if (!req.params.areaId) {
        res.status(400).send("Falta el id del área")
        return
    }

    if (!validate(req.params.areaId)) {
        res.status(400).send("Id de área no válido")
        return
    }

    try {
        // Hay que tomar los sensores pertenecientes a esa zona
        let sensors = await sensorsModel.findAll({ where: { area: req.params.areaId } })
        if (sensors === null) {
            res.status(404).send("Sensores no encontrados")
            return
        }

        // Para cada sensor, obtener el último valor de la temperatura
        let values = []
        for (let i = 0; i < sensors.length; i++) {
            let value = await monitorModel.findOne({ where: { sensorCode: sensors[i].id }, order: [['time', 'DESC']] })
            if (value !== null) {
                values.push(value.value)
            }
        }
        console.log(values)

        // Calcular la media
        let sum = 0
        for (let i = 0; i < values.length; i++) {
            sum += values[i]
        }
        console.log(sum)
        let mean = sum / values.length
        res.status(200).send({ mean: mean })
    } catch (error) {
        res.status(500).send(error.message)
    }
}