import deviceModel from "../models/deviceModel.js";
import { get_nif_by_token } from "../../users/controllers/UserController.js";
import ping from "ping"

export const getDevices = async (req, res) => {
    // Validar token
    let nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))

    // Obtener el nif a partir del email
    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }

    try {
        let devices = await deviceModel.findAll({ where: { Usuario: nif } })
        res.status(200).json(devices)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addDevice = async (req, res) => {
    // Validar token
    let nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }

    // ------------------- POSIBLES ERRORES --------------------
    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (req.body.ip === undefined) {
        res.status(400).send("Missing ip")
        return
    }

    // Chequeo formato ip
    // Menor o igual a 15 caracteres
    if (req.body.ip.length > 15) {
        res.status(400).send("Invalid ip")
        return
    }

    // Tres numeros y un punto
    let numbers_ip = req.body.ip.split(".")
    if (numbers_ip.length != 4) {
        res.status(400).send("Invalid ip")
        return
    }

    // Cada numero entre 0 y 255
    for (let i = 0; i < numbers_ip.length; i++) {
        if (numbers_ip[i] < 0 || numbers_ip[i] > 255) {
            res.status(400).send("Invalid ip")
            return
        }
    }

    try {
        let device = {
            id: req.body.id,
            Usuario: nif,
            ip: req.body.ip,
            available: 0
        }
        await deviceModel.create(device)
        res.status(200).send("Device added") 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const checkDevices = async () => {
    console.log("Checking devices...")
    try {
        let devices = await deviceModel.findAll({})
        for (let i = 0; i < devices.length; i++) {
            console.log("Checking device " + devices[i].ip)
            ping.sys.probe(devices[i].ip, function(isAlive) {
                isAlive ? devices[i].available = 1 : devices[i].available = 0
                devices[i].save()
            })
        }
    } catch (error) {
        return false
    }
}