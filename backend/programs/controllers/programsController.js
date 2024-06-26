import { v4, validate } from "uuid"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import programsModel from "../models/programsModel.js"
import actuadoresModel from "../../actuadores/models/actuadoresModel.js"
import deviceModel from "../../devices/models/deviceModel.js"
import { publish_msg } from "../../mqtt.js"


/**
 * 
 * @description
 * Añade un programa a la base de datos.
 * 
 * @param name: string,
 * @param days: number,
 *  - 1: Lunes
 *  - 2: Martes
 *  - 4: Miercoles
 *  - 8: Jueves
 *  - 16: Viernes
 *  - 32: Sabado
 *  - 64: Domingo
 * @example -> Lunes, Martes y Miercoles: 1 + 2 + 4 = 7
 * @example -> Todos los dias: 1 + 2 + 4 + 8 + 16 + 32 + 64 = 127
 * @param duration: number,
 * @param startTime: unix timestamp
 * 
 * 
 */
export const addProgram = async (req, res) => {
    // --------------- Validacion de token -----------------------
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
    // -----------------------------------------------------------
    // Comprobar que los campos no sean nulos y sean correctos
    if (req.body.name === undefined || req.body.days === undefined || req.body.startTime === undefined 
        || req.body.duration === undefined
    ) {
        res.status(400).send("Missing fields")
        return
    }

    if (req.body.name > 45){
        res.status(400).send("Name too long")
        return
    }

    if (req.body.days < 0 || req.body.days > 127) {
        res.status(400).send("Invalid days. Must be between 0 and 127")
        return
    }

    if (req.body.startTime < 0) {
        res.status(400).send("Invalid startTime")
        return
    }

    if (req.body.duration < 0) {
        res.status(400).send("Invalid duration")
        return
    }

    //-------------------- Crear programa -------------------------
    let uuid = v4()
    try {
        await programsModel.create({
            id: uuid,
            name: req.body.name,
            days: req.body.days,
            startTime: req.body.startTime,
            duration: req.body.duration,
            user: nif
        })
        res.status(200).send(uuid)
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}


/**
 * 
 * @description 
 * Obtiene los programas de un usuario.
 * El nif se coge del token
 */

export const getUserPrograms = async (req, res) => {
    // --------------- Validacion de token -----------------------
    let nif
    try {
        addProgram
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined) {
        res.status(401).send("Invalid token")
        return
    }
    // -----------------------------------------------------------
    try {
        let programs = await programsModel.findAll({
            where: {
                user: nif
            }
        })
        res.status(200).send(programs)
    } catch (error) {
        res.status(500).send("Internal error")
        return
    }
}

/**
 * @description Asocia un programa a un actuador
 * @param programId: string
 * @param actuatorId: string
 * @returns 200 si se ha asociado correctamente
 * @returns 400 si el programa o el actuador no existen
 * @returns 401 si el token es inválido
 * @returns 500 si ha habido un error interno
 */

export const associateProgramToActuator = async (req, res) => {
    // --------------- Validacion de token -----------------------
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
    // -----------------------------------------------------------
    if (req.body.programId === undefined || req.body.actuatorId === undefined) {
        res.status(400).send("Missing fields")
        return
    }

    // Validar los identificadores
    if (!validate(req.body.programId)){
        res.status(400).send("Invalid programId")
        return
    }

    if (!validate(req.body.actuatorId)){
        res.status(400).send("Invalid actuatorId")
        return
    }

    try {

        let actuador = await actuadoresModel.findOne({
            where: {
                id: req.body.actuatorId
            }
        })

        if (actuador == null) {
            res.status(400).send("Actuator not found")
            return
        }

        // Comprobar que el dispositivo pertenece al usuario
        let device = await deviceModel.findOne({
            where: {
                id: actuador.device,
                Usuario: nif
            }
        })
        
        if (device == null) {
            res.status(400).send("Device not found")
            return
        }

        let program = await programsModel.findOne({
            where: {
                id: req.body.programId,
                user: nif
            }
        })

        if (program == null) {
            res.status(400).send("Program not found")
            return
        }

        actuador.activeProgram = req.body.programId
        actuador.save()

        let topic = `devices/${device.id}/programs/new`
        let message = JSON.stringify({
            id: program.id,
            name: program.name,
            days: program.days,
            startTime: program.startTime,
            duration: program.duration,
            user: program.user
        })
        publish_msg(topic, message)

        setTimeout(() => {
            topic = `devices/${device.id}/actuadores/${actuador.id}/update/activeProgram`
            message = program.id
            publish_msg(topic, message)
        }, 100)

        res.status(200).send("Program associated")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/**
 * @description Elimina un programa
 * @param programId: string
 * @returns 200 si se ha eliminado correctamente
 * @returns 400 si el programa no existe
 * @returns 401 si el token es inválido
 * @returns 500 si ha habido un error interno
 */

export const deleteProgram = async (req, res) => {
    // --------------- Validacion de token -----------------------
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
    // -----------------------------------------------------------
    if (req.body.programId === undefined) {
        res.status(400).send("Missing fields")
        return
    }

    // Validar los identificadores
    if (!validate(req.body.programId)){
        res.status(400).send("Invalid programId")
        return
    }

    try {
        let program = await programsModel.findOne({
            where: {
                id: req.body.programId,
                user: nif
            }
        })

        if (program == null) {
            res.status(400).send("Program not found")
            return
        }

        // Comprobar si el programa está asociado a algún actuador
        let actuador = await actuadoresModel.findOne({
            where: {
                activeProgram: program.id
            }
        })

        if (actuador != null) {
            res.status(410).send("Program is associated to an actuator")
            return
        }


        // Eliminar el programa de los devices del usuario
        let devices = await deviceModel.findAll({
            where: {
                Usuario: nif
            }
        })

        let topic = ""
        for (let device of devices) {
            topic = `devices/${device.id}/programs/delete`
            let message = program.id
            publish_msg(topic, message)
        }

        program.destroy()

        res.status(200).send("Program deleted")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/**
 * @description Devuelve la información de un programa
 * @param programId: string
 * @returns 200 si se ha recuperado correctamente
 * @returns 400 si el programa no existe
 * @returns 401 si el token es inválido
 * @returns 500 si ha habido un error interno
 */

export const getProgram = async (req, res) => {
    // --------------- Validacion de token -----------------------
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

    // -----------------------------------------------------------
    if (req.params.programId === undefined) {
        res.status(400).send("Missing fields")
        return
    }

    // Validar los identificadores
    if (!validate(req.params.programId)){
        res.status(400).send("Invalid programId")
        return
    }

    try {
        let program = await programsModel.findOne({
            where: {
                id: req.params.programId,
                user: nif
            }
        })

        if (program == null) {
            res.status(400).send("Program not found")
            return
        }

        res.status(200).send(program)
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/**
 * @description Desasocia un programa de un actuador
 * @param actuatorId: string
 * @param programId: string
 * @returns 200 si se ha desasociado correctamente
 * @returns 400 si el actuador no existe o el programa no existe
 * @returns 401 si el token es inválido
 * @returns 500 si ha habido un error interno
 */

export const disassociateProgramFromActuator = async (req, res) => {
    // --------------- Validacion de token -----------------------
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
    // -----------------------------------------------------------
    if (req.body.programId === undefined || req.body.actuatorId === undefined) {
        res.status(400).send("Missing fields")
        return
    }

    // Validar los identificadores
    if (!validate(req.body.programId)){
        res.status(400).send("Invalid programId")
        return
    }

    if (!validate(req.body.actuatorId)){
        res.status(400).send("Invalid actuatorId")
        return
    }

    try {

        let actuador = await actuadoresModel.findOne({
            where: {
                id: req.body.actuatorId
            }
        })

        if (actuador == null) {
            res.status(400).send("Actuator not found")
            return
        }

        // Comprobar que el dispositivo pertenece al usuario
        let device = await deviceModel.findOne({
            where: {
                id: actuador.device,
                Usuario: nif
            }
        })
        
        if (device == null) {
            res.status(400).send("Device not found")
            return
        }

        let program = await programsModel.findOne({
            where: {
                id: req.body.programId,
                user: nif
            }
        })

        if (program == null) {
            res.status(400).send("Program not found")
            return
        }
        let topic = `devices/${device.id}/actuadores/${actuador.id}/update/activeProgram`
        let message = "null"
        publish_msg(topic, message)

        actuador.activeProgram = null
        actuador.save()

        res.status(200).send("Program disassociated")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}
/**
 * @description Pausa o reanuda un programa de un actuador
 * @param actuatorId: string
 * @param action boolean
 * @returns 200 si se ha pausado/reanudado correctamente
 */
export const resumeStopActuatorProgram = async (req, res) => {
    // --------------- Validacion de token -----------------------
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
    // -----------------------------------------------------------
    if (req.body.actuatorId === undefined || req.body.action === undefined) {
        res.status(400).send("Missing fields")
        return
    }

    // Validar los identificadores
    if (!validate(req.body.actuatorId)){
        res.status(400).send("Invalid actuatorId")
        return
    }

    try {

        let actuador = await actuadoresModel.findOne({
            where: {
                id: req.body.actuatorId
            }
        })

        if (actuador == null) {
            res.status(400).send("Actuator not found")
            return
        }

        // Comprobar que el dispositivo pertenece al usuario
        let device = await deviceModel.findOne({
            where: {
                id: actuador.device,
                Usuario: nif
            }
        })
        
        if (device == null) {
            res.status(400).send("Device not found")
            return
        }

        if (actuador.activeProgram == null) {
            res.status(400).send("Actuator has no active program")
            return
        }

        let topic = `devices/${device.id}/actuadores/${actuador.id}/update/program`
        let message = req.body.action
        publish_msg(topic, message)

        res.status(200).send("Action sent")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}