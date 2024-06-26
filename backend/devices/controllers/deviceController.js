import deviceModel from "../models/deviceModel.js";
import areaModel from "../../areas/models/areasModel.js";
import monitorModel from "../../monitors/models/monitorModel.js"
import sensorModel from "../../sensors/models/sensorsModel.js"
import logModel from "../../logs/models/logModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js";
import ping from "ping"
import { validate } from 'uuid';
import { publish_msg } from "../../mqtt.js";
import actuadoresModel from "../../actuadores/models/actuadoresModel.js";
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
        id: string,         // Identificador del dispositivo
        name: string,       // Nombre del dispositivo
        ip: string          // Direccion ip del dispositivo
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

    if (req.body.id === undefined) {
        res.status(400).send("Missing id")
        return
    }

    if (!validate(req.body.id)) {
        res.status(400).send("Invalid uuid")
        return
    }

    try {
        let device = await deviceModel.findOne({ where: { id: req.body.id } })
        if (device == null) {
            res.status(400).send("Device doesnt exists")
            return
        }
        if (device.Usuario != "00000000A") {
            res.status(400).send("Device already claimed")
            return
        }
        device.Usuario = nif
        device.name = req.body.name
        device.ip = req.body.ip
        device.save()
        publish_msg("devices/" + device.id + "/register", nif)
        res.status(200).send("Device registered")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const checkDevices = async () => {
    console.log("Checking devices...")
    let devices = await deviceModel.findAll()
    for (let device of devices) {
        if (device.Usuario != "00000000A") {
            device.available = 0
            device.save()
        }
    }
    publish_msg("devices/healthcheck", "1")

    return true
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
        //Eliminar datos sobre el dispositivo
        await monitorModel.destroy({ where: { deviceCode: req.params.id } })

        //Eliminar actuadores asociados
        await actuadoresModel.destroy({ where: { device: req.params.id } })

        //Eliminar los logs
        await logModel.destroy({ where: { deviceCode: req.params.id } })
        
        //Actualizar los sensores que estaban asociados al dispositivo a null
        let sensors = await sensorModel.findAll({ where: { device: req.params.id } })
        for (let sensor of sensors) {
            sensor.device = null
            sensor.save()
        }
        device.Usuario = "00000000A"
        device.save()
        publish_msg("devices/" + device.id + "/unregister", nif)
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

/**
 * @description: Obtiene el uuid de un dispositivo a partir de su ip
 * @returns uuid
 */
export const getDeviceUuid = async (req, res) => {
    let req_ip = req.socket.remoteAddress
    let ip_split = req_ip.split(":")
    let ip = ip_split[ip_split.length - 1]
    try {
        let device = await deviceModel.findOne({ where: { ip: ip } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        res.status(200).json(device.id)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description: Obtiene el la información de un dispositivo en base a su uuid
 * @param {
 *     uuid: string
 * } params
 * @returns device
 */

export const getDeviceByUuid = async (req, res) => {
    try {
        let device = await deviceModel.findOne({ where: { id: req.params.uuid } })
        if (device === null) {
            res.status(404).send("Device not found")
            return
        }
        res.status(200).json(device)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const registerDevice = async (uuid) => {
    // El dispositivo tendrá como usuario 00000000A (default) hasta que algún usuario lo reclame
    try {
        if (!validate(uuid)) {
            console.log("Invalid uuid: ", uuid)
            return false
        }

        // Comprobar que no exista ya
        let device = await deviceModel.findOne({ where: { id: uuid } })
        if (device != null) {
            console.log("Device " + uuid + " already registered")
            return false
        }

        let device_new = {
            id: uuid,
            name: "NR-"+uuid,
            Usuario: "00000000A",
            ip: "0.0.0.0",
        }

        await deviceModel.create(device_new)
        console.log("Device " + uuid + " registered")
        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

