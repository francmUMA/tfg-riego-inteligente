import cropModel from '../models/cropModel.js'
import areasModel from '../../areas/models/areasModel.js'
import deviceModel from '../../devices/models/deviceModel.js'
import actuadoresModel from '../../actuadores/models/actuadoresModel.js'
import sensorsModel from '../../sensors/models/sensorsModel.js'
import { get_nif_by_token } from '../../users/controllers/UserController.js'
import { v4, validate } from 'uuid'

/**
 * 
 * @description Crea un cultivo dado su nombre
 * @param {
 *  name: string,
 * }
 * 
 */
export const createCrop = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.body.name === undefined || req.body.name === null || req.body.name == "") {
        res.status(400).send("Missing name")
        return
    }

    if (req.body.name.length > 45) {
        res.status(400).send("Name too long")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Crear el cultivo ----------------------
    let uuid = v4()
    try {
        let crop = {
            id: uuid,
            name: req.body.name,
            user: nif
        }
        console.log(crop)
        await cropModel.create(crop)
        res.status(200).send("Crop created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Elimina un cultivo dado su id
 * @param {
 *  id: string
 * }
 * 
 */

export const deleteCrop = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (!validate(req.body.id)) {
        res.status(400).send("Invalid id")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Eliminar cultivo ----------------------
    try {
        await cropModel.destroy({
            where: {
                id: req.body.id,
                user: nif
            }
        })
        res.status(200).send("Crop deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Obtiene todos los cultivos del usuario
 * 
 */

export const getCrops = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Obtener cultivos ----------------------
    try {
        let crops = await cropModel.findAll({
            where: {
                user: nif
            }
        })
        res.status(200).send(crops)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Modifica el nombre de un cultivo
 * @param {
 *  id: string,
 *  name: string
 * }
 * 
 */

export const updateCrop = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (!validate(req.body.id)) {
        res.status(400).send("Invalid id")
        return
    }
    if (req.body.name === undefined || req.body.name === null || req.body.name == "") {
        res.status(400).send("Missing name")
        return
    }
    if (req.body.name.length > 45) {
        res.status(400).send("Name too long")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Modificar cultivo ---------------------
    try {
        await cropModel.update({
            name: req.body.name
        }, {
            where: {
                id: req.body.id,
                user: nif
            }
        })
        res.status(200).send("Crop updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * 
 * @description Obtiene un cultivo dado su id
 * @param {
 *  id: string
 * }
 * 
 */

export const getCrop = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Obtener cultivo -----------------------
    try {
        let crop = await cropModel.findOne({
            where: {
                id: req.params.id,
                user: nif
            }
        })
        if (crop === null) {
            res.status(404).send("Crop not found")
            return
        }
        res.status(200).send(crop)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las areas de un cultivo
 * @param {
 *  id: string
 * }
 */
export const getCropAreas = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Obtener areas -------------------------
    try {
        let crop = await cropModel.findOne({
            where: {
                id: req.params.id,
                user: nif
            }
        })
        if (crop === null) {
            res.status(404).send("Crop not found")
            return
        }
        let areas = await areasModel.findAll({
            where: {
                crop: req.params.id
            }
        })
        res.status(200).send(areas)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las dispositivos de un cultivo
 * @param {
 *  id: string
 * }
 */

export const getCropDevices = async (req, res) => {
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
    // ----------------------------------------------------------
    // ------------------- Validar datos -------------------------
    if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (!validate(req.params.id)) {
        res.status(400).send("Invalid id")
        return
    }
    // ----------------------------------------------------------
    // ------------------- Obtener dispositivos -----------------
    try {
        let areas = await areasModel.findAll({
            where: {
                crop: req.params.id
            }
        })
        let devices = []
        for (let i = 0; i < areas.length; i++) {
            let areaDevices = await deviceModel.findAll({
                where: {
                    area: areas[i].id
                }
            })
            devices.push(...areaDevices)
        }
        res.status(200).send(devices)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene las sensores de un cultivo
 * @param {
*  id: string
* }
*/

export const getCropSensors = async (req, res) => {
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
   // ----------------------------------------------------------
   // ------------------- Validar datos -------------------------
   if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
       res.status(400).send("Missing id")
       return
   }
   if (!validate(req.params.id)) {
       res.status(400).send("Invalid id")
       return
   }
   // ----------------------------------------------------------
   // ------------------- Obtener dispositivos -----------------
   try {
       let areas = await areasModel.findAll({
           where: {
               crop: req.params.id
           }
       })
       let sensors = []
       for (let i = 0; i < areas.length; i++) {
           let areaSensors = await sensorsModel.findAll({
               where: {
                   area: areas[i].id
               }
           })
           sensors.push(...areaSensors)
       }
       res.status(200).send(sensors)
   } catch (error) {
       res.status(500).send(error.message)
   }
}

/**
 * @description Obtiene las actuadores de un cultivo
 * @param {
*  id: string
* }
*/

export const getCropActuadores = async (req, res) => {
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
   // ----------------------------------------------------------
   // ------------------- Validar datos -------------------------
   if (req.params.id === undefined || req.params.id === null || req.params.id == "") {
       res.status(400).send("Missing id")
       return
   }
   if (!validate(req.params.id)) {
       res.status(400).send("Invalid id")
       return
   }
   // ----------------------------------------------------------
   // ------------------- Obtener dispositivos -----------------
   try {
       let areas = await areasModel.findAll({
           where: {
               crop: req.params.id
           }
       })
       let actuadores = []
       for (let i = 0; i < areas.length; i++) {
           let areaActuadores = await actuadoresModel.findAll({
               where: {
                   area: areas[i].id
               }
           })
           actuadores.push(...areaActuadores)
       }
       res.status(200).send(actuadores)
   } catch (error) {
       res.status(500).send(error.message)
   }
}