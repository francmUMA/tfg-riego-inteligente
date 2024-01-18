import Cpu_temp_Model from '../models/Cpu_temp_model.js';

export const add_value = async (req, res) => {
    try {
        console.log(req.body)
        await Cpu_temp_Model.create(req.body)
        res.status(200).send("Value added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}