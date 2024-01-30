import * as jose from 'jose'
import bcrypt from 'bcrypt'
import userModel from '../../users/models/userModel.js'
/*
    El token se crea utilizando el NIF y la password del usuario.
    El token se firma con la clave privada del servidor.
*/
export const createToken = async (req, res) => {
    try {
        // Comprobar que el usuario existe
        if (req.body.email === undefined) {
            res.status(400).send("Missing email")
            return
        }

        if (req.body.password === undefined) {
            res.status(400).send("Missing password")
            return
        }

        let user = await userModel.findOne({ where: { email: req.body.email } })
        if (user === null) {
            res.status(401).send("User not found")
            return
        }

        // Comprobar que la contraseña pasada por el usuario es correcta
        let password = await bcrypt.compare(req.body.password, user.password)
        if (password === false) {
            res.status(401).send("Invalid password")
            return
        }

        // Crear token
        const token = new jose.SignJWT({
            email: req.body.email,
            password: req.body.password
        }).setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('2h')
            .sign(Uint8Array.from((process.env.SECRET_KEY).split("").map(x => x.charCodeAt())))
        token.then((token) => {
            res.status(200).json({ token })
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const verifyToken = (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        jose.jwtVerify(token, Uint8Array.from((process.env.SECRET_KEY).split("").map(x => x.charCodeAt())))
        .then(async (data) => {
            // Comprobar que el token no ha expirado
            if (data.payload.expired == 0) {
                res.status(401).send("Token expirado")
            }

            // Comprobar que el usuario existe
            if (data.payload.email === undefined) {
                res.status(401).send("Invalid token")
                return
            }

            let user = await userModel.findOne({ where: { email: data.payload.email } })
            if (user === null) {
                res.status(401).send("User not found")
                return
            }

            // Comprobar que la contraseña pasada por el usuario es correcta
            if (data.payload.password === undefined) {
                res.status(401).send("Invalid token")
                return
            }

            let password = await bcrypt.compare(data.payload.password, user.password)
            if (password === false) {
                res.status(401).send("Invalid password")
                return
            }
            
            res.status(200).send("Token verificado")
        }).catch((error) => {
            res.status(401).send(error.message)
        })
    } catch (error) {
        res.status(401).send(error.message)
    }
}

export const getTokenInfo = async (token) => {
    let check = await jose.jwtVerify(token, Uint8Array.from((process.env.SECRET_KEY).split("").map(x => x.charCodeAt())))
    .then(async (data) => {
        if (data.payload.expired == 0) {
            return undefined
        }
        if (data.payload.email === undefined) {
            return undefined
        }
        if (data.payload.password === undefined) {
            return undefined
        }
        let user = await userModel.findOne({ where: { email: data.payload.email } })
        if (user === null) {
            return undefined
        }

        let password = bcrypt.compare(data.payload.password, user.password)
        if (password === false) {
            return undefined
        }

        return data.payload.email
    }).catch((error) => {
        return undefined
    })
    return check
}