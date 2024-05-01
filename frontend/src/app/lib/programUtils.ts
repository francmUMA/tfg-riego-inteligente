
/**
 * 
 * @description Convierte un timestamp a una hora en formato HH:MM:SS
 * @param timestamp Timestamp de la hora desde 1970
 * @returns Hora en formato HH:MM:SS
 * 
 */

import { duration } from "@mui/material"
import { getCookie } from "cookies-next"
import { get } from "http"

export const timestampToTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
}

/**
 * 
 * @description Añade un nuevo programa a la base de datos
 * @param data JSON con los datos que tiene que recibir el servidor
 * @returns True si se ha añadido correctamente, False si ha habido algún error
 * 
 */

export const addProgram = async (data: any) => {
    const token = getCookie('token')

    let days = 0
    for (let i = 0; i < data.days.length; i++) {
        days += data.days[i] ? Math.pow(2, i) : 0
    }

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            startTime: data.startTime,
            duration: data.duration,
            days: days
        })
    }

    let res = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + '/programs/', options)
    if (res.status == 200) {
        return true
    } else {
        return false
    }
}