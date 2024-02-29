import deviceModel from "../models/deviceModel.js";
import areaModel from "../../areas/models/areasModel.js";
import { get_nif_by_token } from "../../users/controllers/UserController.js";
import ping from "ping"
import { v4, validate } from 'uuid';
/*
    @description: Obtiene todos los dispositivos de un usuario
*/
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
/*
    @description: Añade un dispositivo a un usuario
    @body: {
        name: string,     // Nombre del dispositivo
        ip: string      // Direccion ip del dispositivo
    }
*/
export const addDevice = async (req, res) => {
    // Validar token
    let nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }

    // ------------------- POSIBLES ERRORES --------------------
    if (req.body.name === undefined || req.body.name == "" || req.body.name.length > 50 || req.body.name == null) {
        res.status(400).send("Missing name")
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
    let uuid = v4()
    try {
        let device = {
            id: uuid,
            name: req.body.name,
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

/*
    @description: Elimina un dispositivo de un usuario
    @params: {
        id: string   // Identificador del dispositivo
    }
*/
export const deleteDevice = async (req, res) => {
    // Validar token
    let nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }

    // ------------------- POSIBLES ERRORES --------------------
    if (req.params.id === undefined || req.params.id == "" ) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid device")
        return
    }

    // Comprobar que el dispositivo existe y pertenece al usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }

    // Eliminar el dispositivo con el id pasado por parametro
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.id } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        device.destroy()
        res.status(200).send("Device deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza la posicion de un dispositivo
    @body: {
        id: string,         // Identificador del dispositivo
        Latitud: float,
        Longitud: float
    }
*/
export const updatePosition = async (req, res) => {
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
    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid device")
        return
    }

    if (req.body.Latitud === undefined || req.body.Latitud == "") {
        res.status(400).send("Missing latitude")
        return
    }

    if (req.body.Longitud === undefined || req.body.Longitud == "") {
        res.status(400).send("Missing longitude")
        return
    }

    // ----------------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        device.Latitud = req.body.Latitud
        device.Longitud = req.body.Longitud
        device.save()
        res.status(200).send("Position updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza la ip de un dispositivo
    @body: {
        id: string,         // Identificador del dispositivo
        ip: string
    }
*/
export const updateIp = async (req, res) => {
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
    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid device")
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

    // ----------------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        device.ip = req.body.ip
        device.save()
        res.status(200).send("Ip updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Comprueba si un dispositivo esta disponible
    @params: {
        id: string,         // Identificador del dispositivo
    }
*/
export const testConnection = async (req, res) => {
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
    if (req.params.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid device")
        return
    }

    // ----------------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        ping.sys.probe(device.ip, function(isAlive) {
            if (isAlive) {
                device.available = 1
                device.save()
                res.status(200).send("Device is available")
            } else {
                device.available = 0
                device.save()
                res.status(404).send("Device is not available")
            }
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Obtiene un dispositivo de un usuario
    @params: {
        id: string,         // Identificador del dispositivo
    }
*/
export const getDevice = async (req, res) => {
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
    if (req.params.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.params.id)) {
        res.status(400).send("Invalid device")
        return
    }

    // ----------------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        res.status(200).json(device)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el area de un dispositivo
    @body: {
        id: string,         // Identificador del dispositivo
        area: string        // Identificador del area
    }
*/

export const updateArea = async (req, res) => {
    //------------------------------------------ Validar token --------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------------
    //------------------------------------------ Comprobar errores ----------------------------------------------------
    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid device")
        return
    }

    if (req.body.area === undefined) {
        res.status(400).send("Missing area")
        return
    }

    if (req.body.area != null && !validate(req.body.area)) {
        res.status(400).send("Invalid area")
        return
    }

    // Comprobar que el dispositivo existe y pertenece al usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }

    // Comprobar que el area existe
    if (req.body.area != null){
        try {
            let area = await areaModel.findOne({ where: { id: req.body.area, user: nif } })
            if (area === null) {
                res.status(404).send("Area not found")
                return
            }
        } catch (error) {
            res.status(500).send(error.message)
            return
        }
    }
    //---------------------------------------------------------------------------------------------------------------
    //------------------------------------------ Actualizar area -----------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id } })
        device.area = req.body.area
        device.save()
        res.status(200).send("Area updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el nombre de un dispositivo
    @body: {
        id: string,         // Identificador del dispositivo
        name: string        // Nombre del dispositivo
    }
*/

export const updateDeviceName = async (req, res) => {
    //------------------------------------------ Validar token --------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------------
    //------------------------------------------ Comprobar errores ----------------------------------------------------
    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid device")
        return
    }

    if (req.body.name === undefined || req.body.name == "" || req.body.name.length > 50 || req.body.name == null) {
        res.status(400).send("Missing name")
        return
    }

    // Comprobar que el dispositivo existe y pertenece al usuario
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id, Usuario: nif } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    //---------------------------------------------------------------------------------------------------------------
    //------------------------------------------ Actualizar area -----------------------------------------------------
    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id } })
        device.name = req.body.name
        device.save()
        res.status(200).send("Name updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}