
import { getCookie } from "cookies-next"
import { notify } from "./notify"
/**
 * 
 * @description Convierte un timestamp a una hora en formato HH:MM:SS
 * @param timestamp Timestamp de la hora desde 1970
 * @returns Hora en formato HH:MM:SS
 * 
 */

export const timestampToTime = (timestamp: number) => {
    const date = new Date(timestamp)
    let currentTime = date.toLocaleTimeString()
    
    // Eliminamos los segundos
    currentTime = currentTime.slice(0, currentTime.length - 3)
    return currentTime
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

/**
 * @description Obtiene los programas correspondientes a un usuario
 * @returns Array con los programas del usuario
 */

export const getPrograms = async () => {
    const token = getCookie('token')

    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }

    let res = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + '/programs/user', options)
    if (res.status == 200) {
        let data = await res.json()
        return data
    } else {
        return []
    }
}

/**
 * @description Asocia un programa a un actuador
 * @param programId ID del programa
 * @param actuadorId ID del actuador
 * @returns True si se ha asociado correctamente, False si ha habido algún error
 */

export const associateProgram = async (programId: string, actuadorId: string) => {
    const token = getCookie('token')

    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            programId: programId,
            actuatorId: actuadorId
        })
    }

    let res = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + '/programs/', options)
    if (res.status == 200) {
        notify('Programa asociado correctamente', 'success')
        return true
    } else {
        notify('Error al asociar el programa', 'error')
        return false
    }
}