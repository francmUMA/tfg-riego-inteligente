import sensorsModel from "../models/sensorsModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import areasModel from "../../areas/models/areasModel.js"
import actuadoresModel from "../../actuadores/models/actuadoresModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import {v4, validate} from 'uuid'
import { publish_msg } from "../../mqtt.js"
import { sendCommandToWorker } from "../../index.js"


/*
    @description: Devuelve todos los sensores de un dispositivo
    @params: {
        device: string
    }
*/
export const getSensors = async (req, res) => {
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
    if (req.params.device === undefined || req.params.device === null || req.params.device == "") {
        res.status(400).send("Missing device")
        return
    }

    if (!validate(req.params.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar si el dispositivo existe y si es de este usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // ----------------------------------------------------------

    // Buscar los actuadores de este dispositivo
    try {
        let actuadores = await sensorsModel.findAll({ where: { device: req.params.device } })
        res.status(200).send(actuadores)
    
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/*
    @description: Crea un sensor en el device correspondiente
    @params: {
        device: string          // id del dispositivo
    }
    @body: {
        id: string,           // id del sensor
        name: string,           // nombre del sensor
    }
*/

export const addSensor = async (req, res) => {
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
    if (req.params.device === undefined || req.params.device === null || req.params.device == "") {
        res.status(400).send("Missing device")
        return
    }

    if (!validate(req.params.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar si el dispositivo existe y si es de este usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    
    // Comprobar que se han enviado los datos necesarios
    if (req.body.name === undefined || req.body.name === null || req.body.name == "") {
        res.status(400).send("Missing name")
        return
    }

    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    // Comprobar si el sensor pertenece a algún dispositivo y que sea del admin
    try {
        let sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
        if (sensor == null) {
            res.status(404).send("Sensor not registered")
            return
        }
        if (sensor.user != "00000000A"){
            res.status(403).send("Sensor already registered")
            return
        }
        if (sensor.device != null){
            res.status(403).send("Sensor already registered")
            return
        }

    } catch (error) {
        res.status(500).send(error.message)
    }

    // ----------------------------------------------------------
    try {
        await sensorsModel.create({ id: id, name: req.body.name, device: req.params.device, user: nif })
        let sensor = await sensorsModel.findOne({ where: { id: uuid } })
        publish_msg(`devices/${sensor.device}/sensors/new`, JSON.stringify(sensor))
        sendCommandToWorker('suscribe', `devices/${sensor.device}/sensors/${sensor.id}/value`)
        res.status(200).send("Sensor added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Elimina un sensor
    @params: {
        device: string          // id del dispositivo
    }
    @body: {
        id: string              // id del sensor
    }
*/

export const deleteSensor = async (req, res) => {
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
    if (req.params.device === undefined || req.params.device === null || req.params.device == "") {
        res.status(400).send("Missing device")
        return
    }

    if (!validate(req.params.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar si el dispositivo existe y si es de este usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    // Comprobar si el sensor existe
    try {
        let sensor = await sensorsModel.findOne({ where: { id: req.body.id, device: req.params.device } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------------------------------
    try {
        await sensorsModel.destroy({ where: { id: req.body.id, device: req.params.device } })
        let payload = req.body.id
        publish_msg(`devices/${req.params.device}/sensors/delete`, payload)
        sendCommandToWorker('unsuscribe', `devices/${req.params.device}/sensors/${req.body.id}/value`)
        res.status(200).send("Sensor deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}


/*
    @description: Actualiza el area de un sensor
    @body: {
        id: string,
        area: string        // id del area        
    }
*/ 

export const updateSensorArea = async (req, res) => {
    //------------------- Validar token -------------------------
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    if (req.body.area === undefined || req.body.area == "") {
        res.status(400).send("Missing area")
        return
    }

    if (req.body.area != null && !validate(req.body.area)) {
        res.status(400).send("Invalid area")
        return
    }

    // ------------------- Comprobar si el sensor existe ---------------------------
    let sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
    if (sensor === null) {
        res.status(404).send("Sensor not found")
        return
    }
    // ------------------- Comprobar si el area existe ---------------------------
    if (req.body.area != null) {
        try {
            let area = await areasModel.findOne({ where: { id: req.body.area, user: nif } })
            if (area === null) {
                res.status(404).send("Area not found")
                return
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    //-------------------  Comprobar que el sensor pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------- Asignar area -------------------------------------------
    try {
        await sensorsModel.update({ area: req.body.area }, { where: { id: req.body.id } })
        res.status(200).send("Area updated")
    } catch (error) {
        res.status(500).send(error.message)
    }

}



/*
    @description: Actualiza el dispositivo al que está conectado el sensor
    @body: {
        id: string,             // id del sensor
        device: string          // id del dispositivo       
    }

*/
export const updateSensorDevice = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
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
    // -----------------------------------------------------------------------------------------------------------
    //------------------------------------- Validar datos ---------------------------------------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    if (req.body.device === undefined || req.body.device === null) {
        res.status(400).send("Missing device")
        return
    }

    if (!validate(req.body.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let sensor
    try {
        sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------- Comprobar que el dispositivo existe -----------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar pin ---------------------------------------------------------
    try {
        sensor.device = req.body.device
        sensor.save()
        res.status(200).send("Sensor device updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza la localización de un sensor
    @body: {
        id: string,         // id del sensor
        Latitud: float,
        Longitud: float
    }

*/
export const updateSensorPosition = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
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
    // -----------------------------------------------------------------------------------------------------------
    //------------------------------------- Validar datos ---------------------------------------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    if (req.body.Latitud === undefined || req.body.Latitud === null) {
        res.status(400).send("Missing Latitud")
        return
    }
    if (req.body.Longitud === undefined || req.body.Longitud === null) {
        res.status(400).send("Missing Longitud")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let sensor
    try {
        sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar posicion ---------------------------------------------------------
    try {
        sensor.Latitud = req.body.Latitud
        sensor.Longitud = req.body.Longitud
        sensor.save()
        res.status(200).send("Position updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el nombre de un sensor
    @body: {
        id: string,         // id del sensor
        name: string
    }

*/
export const updateSensorName = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
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
    // -----------------------------------------------------------------------------------------------------------
    //------------------------------------- Validar datos ---------------------------------------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    if (req.body.name === undefined || req.body.name === null || req.body.name == "") {
        res.status(400).send("Missing name")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let sensor
    try {
        sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar posicion ---------------------------------------------------------
    try {
        sensor.name = req.body.name
        sensor.save()
        res.status(200).send("Name updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}


/*
    @description: Actualiza la disponibilidad de un sensor
    @body: {
        id: string,         // id del sensor
        available: 0-1
    }
*/
export const updateSensorAvailability = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
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
    // -----------------------------------------------------------------------------------------------------------
    //------------------------------------- Validar datos ---------------------------------------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid sensor")
        return
    }

    if (req.body.available === undefined || req.body.available === null || req.body.available < 0 || req.body.available > 1) {
        res.status(400).send("Missing available or bad available")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let sensor
    try {
        sensor = await sensorsModel.findOne({ where: { id: req.body.id } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar posicion ---------------------------------------------------------
    try {
        sensor.available = req.body.available
        sensor.save()
        res.status(200).send("Availability updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/** 
    @description: Devuelve todos los sensores de un usuario
*/

export const getUserSensors = async (req, res) => {
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

    // Buscar los sensores de este usuario
    try {
        let sensors = []
        let allSensors = await sensorsModel.findAll()
        for (let i = 0; i < allSensors.length; i++) {
            let device = await deviceModel.findOne({ where: { id: allSensors[i].device, Usuario: nif } })
            if (device !== null) {
                sensors.push(allSensors[i])
            }
        }
        res.status(200).send(sensors)
    
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Devuelve los caudalímetros que no están asociados a un actuador
 */

export const getUnassignedSensors = async (req, res) => {
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

    try {
        // Buscar los caudalímetros del usuario
        let userSensors = []
        let cauSensors = await sensorsModel.findAll({ where: { type: "CAU" } })
        for (let i = 0; i < cauSensors.length; i++) {
            let device = await deviceModel.findOne({ where: { id: cauSensors[i].device, Usuario: nif } })
            if (device !== null) {
                userSensors.push(cauSensors[i])
            }
        }
        
        // Buscar los actuadores del usuario que tengan un caudalímetro asociado
        let assignedSensors = []
        
        let actuadores = await actuadoresModel.findAll()
        for (let i = 0; i < actuadores.length; i++) {
            let device = await deviceModel.findOne({ where: { id: actuadores[i].device, Usuario: nif } })
            if (device !== null) {
                assignedSensors.push(actuadores[i].flowmeter)
            }
        }
        
        let sensors = []
        for (let i = 0; i < userSensors.length; i++) {
            if (!assignedSensors.includes(userSensors[i].id)) {
                sensors.push(userSensors[i])
            }
        }
        res.status(200).send(sensors)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Devuelve la informaciónd de un sensor
 * @param sensorId Identificador del sensor
 * @returns Información del sensor
 * 
*/

export const getSensor = async (req, res) => {
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
    if (req.params.sensorId === undefined || req.params.sensorId === null || req.params.sensoId == "") {
        res.status(400).send("Missing sensor")
        return
    }

    if (!validate(req.params.sensorId)) {
        res.status(400).send("Invalid sensor")
        return
    }
    // ----------------------------------------------------------
    try {
        let sensor = await sensorsModel.findOne({ where: { id: req.params.sensorId } })
        if (sensor === null) {
            res.status(404).send("Sensor not found")
            return
        }
        let device = await deviceModel.findOne({ where: { id: sensor.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        res.status(200).send(sensor)
        return
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

