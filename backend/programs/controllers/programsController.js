
/**
 * 
 * @param days:
 *  - 1: Lunes
 *  - 2: Martes
 *  - 4: Miercoles
 *  - 8: Jueves
 *  - 16: Viernes
 *  - 32: Sabado
 *  - 64: Domingo
 *  @example -> Lunes, Martes y Miercoles: 1 + 2 + 4 = 7
 *  @example -> Todos los dias: 1 + 2 + 4 + 8 + 16 + 32 + 64 = 127
 * 
 * @param {
 *  name: string,
 *  days: number,
 *  startTime: unix timestamp,
 * } req 
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
}