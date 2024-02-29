import sensorsModel from "../models/sensorsModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import areasModel from "../../areas/models/areasModel.js"
import actuadoresModel from "../../actuadores/models/actuadoresModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import {v4, validate} from 'uuid'


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
        name: string,           // nombre del sensor
        type: string            // tipo de sensor
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

    // Comprobar si el sensor ya existe
    try {
        let sensor = await sensorsModel.findOne({ where: { name: req.body.name, device: req.params.device } })
        if (sensor !== null) {
            res.status(409).send("Sensor already exists")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    if (req.body.type === undefined || req.body.type === null || req.body.type == "") {
        res.status(400).send("Missing type")
        return
    }

    // ----------------------------------------------------------
    let uuid = v4()
    try {
        await sensorsModel.create({ id: uuid, name: req.body.name, type: req.body.type, device: req.params.device })
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

    if (area != null && !validate(req.body.area)) {
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
    try {
        let area = await areasModel.findOne({ where: { id: req.body.area, user: nif } })
        if (area === null) {
            res.status(404).send("Area not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
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
    @description: Actualiza el pin del dispositivo al que está conectado el sensor
    @body: {
        id: string,         // id del sensor
        device_pin: int       
    }

*/
export const updateSensorDevicePin = async (req, res) => {
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

    if (req.body.device_pin === undefined || req.body.device_pin === null || req.body.device_pin < 0 || req.body.device_pin > 40) {
        res.status(400).send("Missing device_pin or bad device_pin")
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
    // ------------------------------------- Comprobar que el pin no este en uso por otro sensor o actuador -------------
    try {
        let actuador = await actuadoresModel.findOne({ where: { device_pin: req.body.device_pin, device: sensor.device } })
        if (actuador !== null) {
            res.status(409).send("Pin already in use")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    try {
        let used_sensor = await sensorsModel.findOne({ where: { device_pin: req.body.device_pin, device: sensor.device } })
        if (used_sensor !== null) {
            res.status(409).send("Pin already in use")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar pin ---------------------------------------------------------
    try {
        sensor.device_pin = req.body.device_pin
        sensor.save()
        res.status(200).send("Sensor pin updated")
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
    @description: Actualiza el valor de un sensor
    @body: {
        id: string,         // id del sensor
        value: int
    }
*/
export const updateSensorValue = async (req, res) => {
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

    if (req.body.value === undefined || req.body.value === null) {
        res.status(400).send("Missing value")
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
        sensor.value = req.body.value
        sensor.save()
        res.status(200).send("Value updated")
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