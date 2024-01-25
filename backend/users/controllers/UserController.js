import userModel  from "../models/userModel.js";
import bcrypt from "bcrypt";

export const add_user = async (req, res) => {
    try {
        let user = {
            NIF: req.body.NIF,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: req.body.password
        }

        if (user.NIF == undefined || user.nombre == undefined || user.email == undefined || user.password == undefined) {
            res.status(400).send("Missing parameters")
            return
        }

        // Comprobar formato NIF
        // Longitud
        if (user.NIF.length != 9) {
            res.status(400).send("Invalid NIF")
            return
        }

        // Que no esté duplicado
        let user_NIF = await userModel.findOne({ where: { NIF: user.NIF } })
        if (user_NIF != null) {
            res.status(400).send("NIF exists")
            return
        }

        // Formato
        let regex = new RegExp("[0-9]{8}[A-Z]{1}")
        if (!regex.test(user.NIF)) {
            res.status(400).send("Invalid NIF")
            return
        }

        // Comprobar formato email
        // Longitud
        if (user.email.length > 245) {
            res.status(400).send("Invalid email")
            return
        }

        // Que no esté duplicado
        let user_email = await userModel.findOne({ where: { email: user.email } })
        if (user_email != null) {
            res.status(400).send("Email already in use")
            return
        }

        // Formato
        regex = new RegExp("[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+")
        if (!regex.test(user.email)) {
            res.status(400).send("Invalid email")
            return
        }

        // Encriptar contraseña
        user.password = await bcrypt.hash(user.password, 8)

        // Longitud nombre
        if (user.nombre.length > 45) {
            res.status(400).send("Invalid name")
            return
        }

        // Longitud apellidos, si hay
        if (user.apellidos != undefined && user.apellidos.length > 45) {
            res.status(400).send("Invalid surname")
            return
        }


        await userModel.create(user)
        res.status(200).send("User added")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_user_by_nif = async (req, res) => {
    try {
        let user = await userModel.findOne({ where: { NIF: req.params.NIF } })
        if (user == null) {
            res.status(404).send("User not found")
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_user_by_email = async (req, res) => {
    try {
        let user = await userModel.findOne({ where: { email: req.params.email } })
        if (user == null) {
            res.status(404).send("User not found")
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const check_password = async (req, res) => {
    try {
        let user = await userModel.findOne({ where: { email: req.body.email } })
        if (user == null) {
            res.status(404).send("User not found")
            return
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send("Password match")
        } else {
            res.status(400).send("Password doesnt match")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const update_user = async (req, res) => {
    try {
        // Verificar que el usuario existe
        let user_NIF = await userModel.findOne({ where: { NIF: req.body.NIF } })
        if (user_NIF == null) {
            res.status(404).send("User not found")
            return
        }

        // Una vez comprobado que dicho usuario existe vamos a coger la información que nos llega y vamos a actualizarla
        // Solo se pueden cambiar nombre y apellidos
        let new_info = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
        }

        // Comprobar el campo del nuevo nombre
        if (new_info.nombre != undefined) {
            // Longitud
            if (new_info.nombre.length > 45) {
                res.status(400).send("Invalid name")
                return
            }
        } else {
            res.status(400).send("Missing parameters")
            return
        }

        // Comprobar el campo de los nuevos apellidos (si hay)
        if (new_info.apellidos != undefined) {
            // Longitud
            if (new_info.apellidos.length > 45) {
                res.status(400).send("Invalid surname")
                return
            }
        }

        // Actualizar la información
        await userModel.update(new_info, { where: { NIF: req.body.NIF } })
        res.status(200).send("User updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}
