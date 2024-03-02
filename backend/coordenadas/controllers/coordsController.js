import coordsModel from "../models/coordsModel.js"
import { get_nif_by_token } from "../../users/controllers/UserController.js"
import areasModel from "../../areas/models/areasModel.js"
import { validate } from "uuid"

/*
    @description: Función que crea una coordenada asociada a un area
    @params: identificador del área
             {
                Latitud: float,
                Longitud: float,
                index: int
             }
*/

export const addCoords = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
    let nif
    try {
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined || nif == null) {
        res.status(401).send("Invalid token")
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Validar datos ---------------------------------------------------------
    if (req.body.Latitud === undefined || req.body.Latitud === null) {
        res.status(400).send("Invalid latitude")
        return
    }

    if (req.body.Longitud === undefined || req.body.Longitud === null) {
        res.status(400).send("Invalid longitude")
        return
    }

    if (req.body.index === undefined || req.body.index === null || req.body.index < 0) {
        res.status(400).send("Invalid index")
        return
    }

    if (req.params.area === undefined || req.params.area === null) {
        res.status(400).send("Invalid area")
        return
    }

    if (!validate(req.params.area)) {
        res.status(400).send("Invalid area")
        return
    }

    try {
        let area = areasModel.findOne({ where: { id: req.params.area, user: nif } })
        if (area === null) {
            res.status(404).send("Area not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Añadir coordenadas ----------------------------------------------------
    try {
        await coordsModel.create({
            Latitud: req.body.Latitud,
            Longitud: req.body.Longitud,
            area: req.params.area,
            index: req.body.index
        })
        res.status(200).send("Coordinates added")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/*
    @description: Función que devuelve las coordenadas de un área
    @params: identificador del área
*/

export const getCoordsByArea = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
    let nif
    try {
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined || nif == null) {
        res.status(401).send("Invalid token")
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Validar datos ---------------------------------------------------------
    if (req.params.area === undefined || req.params.area === null) {
        res.status(400).send("Invalid area")
        return
    }

    if (!validate(req.params.area)) {
        res.status(400).send("Invalid area")
        return
    }

    try {
        let area = areasModel.findOne({ where: { id: req.params.area, user: nif } })
        if (area === null) {
            res.status(404).send("Area not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Recuperar coordenadas ----------------------------------------------------
    try {
        let coords = await coordsModel.findAll({ where: { area: req.params.area } })
        res.status(200).send(coords)
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/*
    @description: Función que devuelve las coordenadas de un área
    @params: identificador del área
*/

export const deleteCoordsByArea = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
    let nif
    try {
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined || nif == null) {
        res.status(401).send("Invalid token")
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Validar datos ---------------------------------------------------------
    if (req.params.area === undefined || req.params.area === null) {
        res.status(400).send("Invalid area")
        return
    }

    if (!validate(req.params.area)) {
        res.status(400).send("Invalid area")
        return
    }

    try {
        let area = areasModel.findOne({ where: { id: req.params.area, user: nif } })
        if (area === null) {
            res.status(404).send("Area not found")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Recuperar coordenadas ----------------------------------------------------
    try {
        await coordsModel.destroy({ where: { area: req.params.area } })
        res.status(200).send("Coordinates deleted")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

/*
    @description: Función que actualiza una coordenada
    @params: identificador de la coordenada
    @body: {
        Latitud: float,
        Longitud: float
    }
*/

export const updateCoord = async (req, res) => {
    //------------------------------------- Validar token ---------------------------------------------------------
    let nif
    try {
        nif = await get_nif_by_token(req.header('Authorization').replace('Bearer ', ''))
    } catch (error) {
        res.status(401).send("Invalid token")
        return
    }

    if (nif === undefined || nif == null) {
        res.status(401).send("Invalid token")
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Validar datos ---------------------------------------------------------
    if (req.params.coord === undefined || req.params.coord === null) {
        res.status(400).send("Invalid coord id")
        return
    }
    let coord
    try {
        coord = await coordsModel.findOne({ where: { id: req.params.coord } })
        if (coord === null) {
            res.status(404).send("Coord not found")
            return
        }
         
        let area = await areasModel.findOne({ where: { id: coord.area, user: nif } })
        if (area === null) {
            res.status(404).send("Area doesnt belong to this user")
            return
        }
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    // -----------------------------------------------------------------------------------------------------------
    // ----------------------------------- Actualizar coordenada -------------------------------------------------
    try {
        await coordsModel.update({
            Latitud: req.body.Latitud,
            Longitud: req.body.Longitud
        }, { where: { id: req.params.coord } })
        res.status(200).send("Coord updated")
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}
