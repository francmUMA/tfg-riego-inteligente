import areasModel from "../models/areasModel.js";
import { get_nif_by_token } from "../../users/controllers/UserController.js";
import { v4, validate } from "uuid"

/** 
    @description: Obtiene las areas de un usuario
    @param { token: token de autenticacion }
*/
export const get_areas = async (req, res) => {
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
    // ------------------- Obtencion de los datos --------------------
    try {
        let areas = await areasModel.findAll( { where: { user: nif } })
        res.status(200).send(areas)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/** 
    @description: Añade un area a un usuario
    @param {
        name: nombre del area,
        color: color del area,
        crop: cultivo del area
    }
*/
export const add_area = async (req, res) => {
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
    if (req.body.color === undefined || req.body.color === null || req.body.color == "") {
        res.status(400).send("Missing color")
        return
    }
    if (req.body.crop === undefined || req.body.crop === null || req.body.crop == "") {
        res.status(400).send("Missing crop")
        return
    }
    if (!validate(req.body.crop)) {
        res.status(400).send("Invalid crop")
        return
    }
    // ------------------- Crear area ---------------------------
    let uuid = v4()
    try {
        let area = {
            id: uuid,
            name: req.body.name,
            user: nif,
            color: req.body.color,
            crop: req.body.crop
        }
        await areasModel.create(area)
        res.status(200).send("Area created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/** 
    @description Elimina un area dada su id
    @param {
        id: string      // identificador del area
    }

*/
export const delete_area = async (req, res) => {
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

    if(!validate(req.params.id)){
        res.status(400).send("Invalid area")
        return
    }

    let area = await areasModel.findOne({ where: { user: nif, id: req.params.id } })
    if (area === null) {
        res.status(404).send("Area not found")
        return
    }
    // ------------------- Borrar area ---------------------------
    try {
        await areasModel.destroy({ where: { user: nif, id: req.params.id } })
        res.status(200).send("Area deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Actualiza el nombre de un area
 * @param {
 *      id: string,     // identificador del area
 * } params
 * @param {
 *      color: string    
 * } body
 */
export const updateColor = async (req, res) => {
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

    if(!validate(req.params.id)){
        res.status(400).send("Invalid area")
        return
    }

    if (req.body.color === undefined || req.body.color === null || req.body.color == "") {
        res.status(400).send("Missing color")
        return
    }
    let area = await areasModel.findOne({ where: { user: nif, id: req.params.id } })
    if (area === null) {
        res.status(404).send("Area not found")
        return
    }
    // ------------------- Actualizar color ---------------------------
    try {
        await areasModel.update({ color: req.body.color }, { where: { user: nif, id: req.params.id } })
        res.status(200).send("Color updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Actualiza el nombre de un area
 * @param {
 *     id: string,     // identificador del area
 * } params
 * @param {
 *    name: string
 * } body
 */
export const updateAreaName = async (req, res) => {
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

    if(!validate(req.params.id)){
        res.status(400).send("Invalid area")
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
    let area = await areasModel.findOne({ where: { user: nif, id: req.params.id } })
    if (area === null) {
        res.status(404).send("Area not found")
        return
    }
    // ------------------- Actualizar nombre ---------------------------
    try {
        await areasModel.update({ name: req.body.name }, { where: { user: nif, id: req.params.id } })
        res.status(200).send("Name updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**
 * @description Obtiene la información de un solo área
 * @param {
 *   id: string,     // identificador del area
 * }
 */

export const get_area = async (req, res) => {
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

    if(!validate(req.params.id)){
        res.status(400).send("Invalid area")
        return
    }
    // ------------------- Obtener area ---------------------------
    try {
        let area = await areasModel.findOne({ where: { user: nif, id: req.params.id } })
        if (area === null) {
            res.status(404).send("Area not found")
            return
        }
        res.status(200).send(area)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
