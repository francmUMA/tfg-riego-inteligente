import { getCookie } from "cookies-next"

export interface Actuador {
    id: string,
    mode: number,
    device: string,
    device_pin: number,
    area: string,
    Latitud: number,
    Longitud: number,
    status: number,
    name: string
}
export function checkActuador(actuadores: any, id: string) {
    return !(actuadores.find((actuador: any) => actuador.id == id))
}

export async function getActuadores(device: string, token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/" + device, options)
    if (response.status === 200) {
        return await response.json()
    } else {
        return []
    }
}

export async function getUserActuadores() {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'  
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/all", options)
    if (response.status === 200) {
        return await response.json()
    } else {
        return []
    }
}

export async function addActuador(name: string, device: string, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/" + device, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateActuadorMode(id: string, mode: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, mode: mode})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/mode", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateActuadorArea(id: string, area: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, area: area})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/area", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateActuadorPin(id: string, pin: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, device_pin: pin})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/pin", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function deleteActuador(id: string, device: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/" + device, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updatePositionActuador(id: string, Latitud: number, Longitud: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, Latitud: Latitud, Longitud: Longitud})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/position", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateActuadorStatus(id: string, status: number, token: string){
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, status: status})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/status", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export const getActuadorLogs = async (actuador: string) => {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/logs/actuador/" + actuador, options)
    if (response.status == 200) {
        let data = await response.json()
        console.log("logs", data)
        return data
    } else {
        return []
    }
}

export const updateActuadorFlowmeter = async (id: string, flowmeter: number, token: string) => {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({actuadorId: id, flowmeterId: flowmeter})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/flowmeter", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export const removeActuadorFlowmeter = async (id: string, token: string) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({actuadorId: id})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/flowmeter", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}