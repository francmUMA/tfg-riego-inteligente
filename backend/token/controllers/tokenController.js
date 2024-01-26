import * as jose from 'jose'
/*
    El token se crea utilizando el NIF y la password del usuario.
    El token se firma con la clave privada del servidor.
*/
export const createToken = (req, res) => {
    try {
        const token = new jose.SignJWT({
            email: req.body.email,
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
        .then((data) => {
            if (data.payload.expired == 0) {
                res.status(401).send("Token expirado")
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
    .then((data) => {
        if (data.payload.expired == 0) {
            return undefined
        }
        return data.payload.email
    }).catch((error) => {
        return undefined
    })
    return check
}