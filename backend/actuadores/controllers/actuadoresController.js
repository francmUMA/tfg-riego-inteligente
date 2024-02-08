import actuadoresModel from "../models/actuadoresModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import areasModel from "../../areas/models/areasModel.js"
import sensorModel from "../../sensors/models/sensorsModel.js"
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
        let actuador = await actuadoresModel.findOne({ where: { id: req.body.id, device: req.params.device } })
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
        res.status(200).send("Actuator deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
    @description: Actualiza el area de un actuador
    @body: {
        id: string,
        area: int           // id del area        
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
    if (req.body.area === undefined || req.body.area === null || req.body.area == "") {
        res.status(400).send("Missing area")
        return
    }
    // ------------------- Comprobar si el actuador existe ---------------------------
    let actuador = await actuadoresModel.findOne({ where: { id: req.body.id } })
    if (actuador === null) {
        res.status(404).send("Actuador not found")
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
    try {
        let device = await deviceModel.findOne({ where: { id: actuador.device, Usuario: nif } })
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
    try {
        let sensor = await sensorModel.findOne({ where: { device_pin: req.body.device_pin, device: actuador.device } })
        if (sensor !== null) {
            res.status(409).send("Pin already in use")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
    // ------------------------------------ Actualizar pin ---------------------------------------------------------
    try {
        actuador.device_pin = req.body.device_pin
        actuador.save()
        res.status(200).send("Device pin updated")
    } catch (error) {
        res.status(500).send(error.message)
    }

}

/*
    @description: Actualiza el dispositivo al que está conectado el actuador
    @body: {
        id: string,         // id del actuador
        device: int         // id del dispositivo       
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
    if (req.body.device === undefined || req.body.device === null) {
        res.status(400).send("Missing device")
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
        actuador.device = req.body.device
        actuador.save()
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