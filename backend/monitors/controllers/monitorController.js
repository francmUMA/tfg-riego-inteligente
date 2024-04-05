import Cpu_temp_Model from '../models/monitorModel.js';
import { get_nif_by_token } from '../../users/controllers/UserController.js';
import { validate } from 'uuid';
import deviceModel from '../../devices/models/deviceModel.js';
import monitorModel from '../models/monitorModel.js';
import sensorsModel from '../../sensors/models/sensorsModel.js';
import { v1 } from 'uuid';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

/**
 * 
 * @param {
 *  "deviceCode"?: string,
 *  "sensorCode"?: string,
 *  "value": number,
 *  "time": string
 * } data  
 */
export const addValue = async (data) => {
    let uuid = v1()

    if (data.value === undefined || data.time === undefined) {
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

            // Añadir el valor
            await monitorModel.create({
                id: uuid,
                sensorCode: data.sensorCode,
                value: data.value,
                time: data.time
            })
            console.log("Valor añadido correctamente")
        } catch (error) {
            console.log(error)
        }
    }
    console.log("No se ha podido añadir el valor")
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
 * 
 * @param {
*  "id": string
* } params  
*/	
export const getSensorLast24hValues = async (req, res) => {
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
            time: { [Op.gt]: sequelize.literal(`UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 24 HOUR))`) } 
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