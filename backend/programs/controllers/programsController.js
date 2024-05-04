import { v4, validate } from "uuid"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import programsModel from "../models/programsModel.js"

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
    if (validate(req.body.programId)){
        res.status(400).send("Invalid programId")
        return
    }

    if (validate(req.body.actuatorId)){
        res.status(400).send("Invalid actuatorId")
        return
    }

    try {

        let actuador = await actuatorsModel.findOne({
            where: {
                id: req.body.actuatorId
            }
        })

        if (actuador == null) {
            res.status(400).send("Actuator not found")
            return
        }

        // Comprobar que el dispositivo pertenece al usuario
        let device = await devicesModel.findOne({
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

        res.status(200).send("Program associated")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}