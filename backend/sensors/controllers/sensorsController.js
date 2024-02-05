import sensorsModel from "../models/sensorsModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"

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
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }

    // Comprobar si el sensor ya existe
    try {
        let sensor = await sensorsModel.findOne({ where: { id: req.body.id, device: req.params.device } })
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
    try {
        let sensor = await sensorsModel.create({ id: req.body.id, type: req.body.type, device: req.params.device })
        res.status(200).send("Sensor added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

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

    // Comprobar si el actuador existe
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