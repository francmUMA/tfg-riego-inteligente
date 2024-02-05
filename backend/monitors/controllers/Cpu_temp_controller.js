import Cpu_temp_Model from '../models/Cpu_temp_model.js';
import { get_nif_by_token } from '../../users/controllers/userController.js';

export const add_value = async (req, res) => {
    try {
        await Cpu_temp_Model.create(req.body)
        res.status(200).send("Value added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_values_by_device = async (req, res) => {
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
    if (req.params.id === undefined || req.params.id == "") {
        res.status(400).send("Missing id")
        return
    }
    // ----------------------------------------------------------
    try {
        let values = await Cpu_temp_Model.findAll({ where: { device: req.params.id } })
        if (values === null) {
            res.status(404).send("Values not found")
            return
        }
        // Enviar solamente time y value
        let response = []
        for (let i = 0; i < values.length; i++) {
            response.push({ time: values[i].time, value: values[i].value })
        }
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error.message)
    }

}