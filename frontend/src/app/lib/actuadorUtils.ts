export interface Actuador {
    id: string,
    mode: number,
    device: number,
    device_pin: number,
    area: number

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
    console.log(options)
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/actuadores/" + device, options)
    if (response.status === 200) {
        return await response.json()
    } else {
        return []
    }
}

export async function addActuador(id: string, device: string, token: string) {
    let options = {
        method: 'POST',
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

export async function updateActuadorArea(id: string, area: number, token: string) {
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