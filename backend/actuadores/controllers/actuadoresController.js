import actuadoresModel from "../models/actuadoresModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import areasModel from "../../areas/models/areasModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import { v4, validate } from "uuid"
import { publish_msg } from "../../mqtt.js"
import { sendCommandToWorker } from "../../index.js"
import monitorModel from "../../monitors/models/monitorModel.js"
import { Op } from "sequelize"

/**
 * 
 * @description: Devuelve los actuadores de un usuario. Solamente necesita el token de autenticación
 * 
 */
export const getUserActuadores = async (req, res) => {
    // Validar token
    console.log("All")
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
    // Buscar los actuadores de este usuario
    try {
        let allActuadores = await actuadoresModel.findAll()
        let actuadores = []
        // Filtrar los que tenga un device que pertenezca al usuario
        for (let i = 0; i < allActuadores.length; i++) {
            let device = await deviceModel.findOne({ where: { id: allActuadores[i].device, Usuario: nif } })
            if (device !== null) {
                actuadores.push(allActuadores[i])
            }
        }
        res.status(200).send(actuadores)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Devuelve los actuadores de un dispositivo
    @params: {
        device: string       // uuid del dispositivo
    }
*/

export const getActuadores = async (req, res) => {
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

    // Validar uuid del device
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
        let actuadores = await actuadoresModel.findAll({ where: { device: req.params.device } })
        res.status(200).send(actuadores)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/*
    @description: Añade un actuador a un dispositivo
    @params: {
        device: string          // uuid del dispositivo
    }
    @body: {
        name: string
    }
*/

export const addActuador = async (req, res) => {
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

    // Validar uuid del device
    if (!validate(req.params.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar si el dispositivo existe y si es de este usuario
    let device
    try {
        device = await deviceModel.findOne({ where: { id: req.params.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    if (req.body.name === undefined || req.body.name === null || req.body.name == "") {
        res.status(400).send("Missing name")
        return
    }

    // Comprobar si el actuador ya existe
    try {
        let actuador = await actuadoresModel.findOne({ where: { name: req.body.name, device: req.params.device } })
        if (actuador !== null) {
            res.status(409).send("Name exists")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------------------------------
    try {
        // Crear el uuid
        let uuid = v4()
        await actuadoresModel.create({ 
            id: uuid,
            name: req.body.name, 
            device: req.params.device 
        })
        let topic = `devices/${device.id}/actuadores/new`
        let actuador = await actuadoresModel.findOne({ where: { id: uuid } })
        publish_msg(topic, JSON.stringify(actuador))
        sendCommandToWorker("suscribe", `devices/${device.id}/actuadores/${actuador.id}/flow`)
        res.status(200).send("Actuator added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/* 
    @description: Elimina un actuador de un dispositivo
    @params: {
        device: string          // uuid del dispositivo
    }
    @body: {
        id: string              // uuid del actuador
    }
*/

export const deleteActuador = async (req, res) => {
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

    // Validar uuid del device
    if (!validate(req.params.device)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar si el dispositivo existe y si es de este usuario
    let device
    try {
        device = await deviceModel.findOne({ where: { id: req.params.device, Usuario: nif } })
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

    // Validar uuid del actuador
    if (!validate(req.body.id)) {
        res.status(400).send("Invalid actuador")
        return
    }

    // Comprobar si el actuador existe
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id, device: req.params.device } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // ----------------------------------------------------------
    try {
        await actuadoresModel.destroy({ where: { id: req.body.id, device: req.params.device } })
        let topic = `devices/${device.id}/actuadores/delete`
        let payload = req.body.id
        publish_msg(topic, payload)
        sendCommandToWorker("unsuscribe", `devices/${device.id}/actuadores/${actuador.id}/flow`)
        res.status(200).send("Actuator deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el area de un actuador
    @body: {
        id: string,             // id del actuador
        area: string            // id del area        
    }
*/ 

export const updateActuadorArea = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
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

    // ------------------- Comprobar si el actuador existe ---------------------------
    let actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
    if (actuador === null) {
        res.status(404).send("Actuador not found")
        return
    }
    // ------------------- Comprobar si el area existe en caso de que no sea nula ---------------------------
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
    //-------------------  Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------- Asignar area -------------------------------------------
    try {
        await actuadoresModel.update({ area: req.body.area }, { where: { id: req.body.id } })
        res.status(200).send("Area updated")
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/*
    @description: Actualiza el modo de un actuador
    @body: {
        id: string,         // id del actuador
        mode: 0-1       
    }
*/ 
export const updateMode = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
        return
    }

    if (req.body.mode === undefined || req.body.mode === null || req.body.mode > 1 || req.body.mode < 0) {
        res.status(400).send("Missing mode or bad mode")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar modo ---------------------------------------------------------
    try {
        actuador.mode = req.body.mode
        actuador.save()
        res.status(200).send("Mode updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el pin del dispositivo al que está conectado el actuador
    @body: {
        id: string,         // id del actuador
        device_pin: int       
    }

*/
export const updateActuadorDevicePin = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
        return
    }

    if (req.body.device_pin === undefined || req.body.device_pin === null || req.body.device_pin < 0 || req.body.device_pin > 40) {
        res.status(400).send("Missing device_pin or bad device_pin")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    let device
    try {
        device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------- Comprobar que el pin no este en uso por otro sensor o actuador -------------
    try {
        let used_actuador = await actuadoresModel.findOne({ where: { device_pin: req.body.device_pin, device: actuador.device } })
        if (used_actuador !== null) {
            res.status(409).send("Pin already in use")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar pin ---------------------------------------------------------
    try {
        let topic = `devices/${actuador.device}/actuadores/${actuador.id}/update/device_pin`
        let payload = req.body.device_pin
        if (typeof payload !== "string") payload = payload.toString()
        publish_msg(topic, payload)
        actuador.device_pin = req.body.device_pin
        actuador.status = 0
        actuador.save()
        res.status(200).send("Device pin updated")
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/*
    @description: Actualiza el dispositivo al que está conectado el actuador
    @body: {
        id: string,             // id del actuador
        device: string          // id del dispositivo       
    }

*/
export const updateActuadorDevice = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
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
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
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
        sendCommandToWorker("unsuscribe", `devices/${actuador.device}/actuadores/${actuador.id}/flow`)
        actuador.device = req.body.device
        actuador.save()
        sendCommandToWorker("suscribe", `devices/${req.body.device}/actuadores/${actuador.id}/flow`)
        res.status(200).send("Device updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza la localización de un actuador
    @body: {
        id: string,         // id del actuador
        Latitud: float,
        Longitud: float
    }

*/
export const updateActuadorPosition = async (req, res) => {
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
            res.status(400).send("Invalid actuador")
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
        let actuador
        try {
            actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
            if (actuador === null) {
                res.status(404).send("Actuator not found")
                return
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
        // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
        try {
            let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
            if (device === null) {
                res.status(404).send("Device not found")
                return
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
        // ------------------------------------ Actualizar posicion ---------------------------------------------------------
        try {
            actuador.Latitud = req.body.Latitud
            actuador.Longitud = req.body.Longitud
            actuador.save()
            res.status(200).send("Position updated")
        } catch (error) {
            res.status(500).send(error.message)
        }
}

/*
    @description: Actualiza el estado de un actuador
    @body: {
        id: string,         // id del actuador
        status: 0-1       
    }
*/
export const updateActuadorStatus = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
        return
    }

    if (req.body.status === undefined || req.body.status === null || req.body.status > 1 || req.body.status < 0) {
        res.status(400).send("Missing status or bad status")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    let device
    try {
        device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar Status ---------------------------------------------------------
    try {
        let topic = `devices/${actuador.device}/actuadores/${actuador.id}/update/status`
        let payload = req.body.status == true || req.body.status == 1 ? "1" : "0"
        publish_msg(topic, payload)
        actuador.status = req.body.status
        actuador.save()
        res.status(200).send("Status updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el nombre de un actuador
    @body: {
        id: string,         // id del actuador
        name: string       
    }
*/
export const updateActuadorName = async (req, res) => {
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
        res.status(400).send("Invalid actuador")
        return
    }

    if (req.body.name === undefined || req.body.name === null) {
        res.status(400).send("Missing name")
        return
    }
    // ------------------------------------ Comprobar si el actuador existe ----------------------------------------
    let actuador
    try {
        actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------- Comprobar que el actuador pertenezca al usuario ---------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // ------------------------------------ Comprobar si el nombre ya existe ----------------------------------------
    try {
        let actuador = await actuadoresModel.findOne({ where: { name: req.body.name, device: actuador.device } })
        if (actuador !== null) {
            res.status(409).send("Name exists")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar nombre ---------------------------------------------------------
    try {
        actuador.name = req.body.name
        actuador.save()
        res.status(200).send("Name updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Devuelve todos los actuadores para el agente solo con el token
 */
export const getAllAutoActuadores = async (req, res) => {
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

    if (nif != "00000000A") {
        res.status(403).send("Not allowed")
        return
    }
    // Buscar los actuadores de este usuario
    try {
        let allActuadores = await actuadoresModel.findAll({
            where: {
                mode: 1
            }
        })
        res.status(200).send(allActuadores)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description GET de actuadores por id
 * @param id del actuador
 * @returns 200 si todo ha ido bien, 400 si hay algún error en los datos, 404 si no se encuentra el actuador, 500 si hay un error en la base de datos
 */

export const getActuador = async (req, res) => {
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

    if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid actuador")
        return
    }

    try {
        let actuador = await actuadoresModel.findOne({ where: { id: req.params.id } })
        if (actuador === null) {
            res.status(404).send("Actuator not found")
            return
        }

        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }

        res.status(200).send(actuador)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Actualiza el flujo acumulado de los actuadores
 * Para cada actuador, se obtienen los datos de caudal de su caudalimetro  y se hace un promedio de los datos.
 * Después, se suma al flujo acumulado del actuador
 * 
 */
export const updateActuadoresAccumulatedFlow = async () => {
    try{
        let actuadores = await actuadoresModel.findAll()
        for (let i = 0; i < actuadores.length; i++) {
            let flowData = await monitorModel.findAll({
                where: {
                    actuadorCode: actuadores[i].id,
                    createdAt: {
                        [Op.gt]: new Date(new Date() - 60000)
                    }
                }
            })
            let lastMinuteFlow = 0
            for (let j = 0; j < flowData.length; j++) {
                lastMinuteFlow += flowData[j].value
            }
            console.log(lastMinuteFlow)
            actuadores[i].acumulatedFlow += (lastMinuteFlow / flowData.length)
            actuadores[i].save()
        }
    } catch (error) {
        console.log(error.message)
    }
}


