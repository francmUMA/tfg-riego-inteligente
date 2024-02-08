import areasModel from "../models/areasModel.js";
import { get_nif_by_token } from "../../users/controllers/UserController.js";

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
    if (req.body.id === undefined || req.body.id === null || req.body.id == "") {
        res.status(400).send("Missing id")
        return
    }
    if (req.body.name.length > 45) {
        res.status(400).send("Name too long")
        return
    }
    // ------------------- Crear area ---------------------------
    console.log(nif)
    try {
        let area = {
            id: req.body.id,
            name: req.body.name,
            user: nif
        }
        await areasModel.create(area)
        res.status(200).send("Area created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

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