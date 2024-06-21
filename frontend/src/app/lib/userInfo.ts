import { getCookie } from "cookies-next"
import { notify } from "./notify"

export const fetchUserInfo = async (token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/token", options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } else {
        notify("Error al obtener la información del usuario", "error")
        return undefined
    }
}

export const updateNameSurname = async (name: string, surname: string, token: string) => {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            apellidos: surname
        })
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/", options)
    if (request.status === 200) {
        notify("Usuario actualizado", "success")
        return true
    } else {
        notify("Error al actualizar el usuario", "error")
        return false
    }
}

export const getEvents = async (token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/events", options)
    if (request.status === 200) {
        let response = await request.json()
        let data = []
        data.push(response.event1)
        data.push(response.event2)
        data.push(response.event3)
        data.push(response.event4)
        data.push(response.event5)
        data.push(response.event6)
        return data
    } else {
        notify("Error al obtener los eventos", "error")
        return undefined
    }
}

export const updateEvent = async (event: number, value: number) => {
    const token = getCookie("token")
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            value: value
        })
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/events/" + event, options)
    if (request.status === 200) {
        return true
    } else {
        notify("Error al actualizar el evento", "error")
        return false
    }
} 