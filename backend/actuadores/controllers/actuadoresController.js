import actuadoresModel from "../models/actuadoresModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"

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

    // Comprobar si el actuador ya existe
    try {
        let actuador = await actuadoresModel.findOne({ where: { id: req.body.id, device: req.params.device } })
        if (actuador !== null) {
            res.status(409).send("Actuator already exists")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ----------------------------------------------------------
    try {
        let actuador = await actuadoresModel.create({ id: req.body.id, device: req.params.device })
        res.status(200).send(actuador)
    } catch (error) {
        res.status(500).send(error.message)
    }
}