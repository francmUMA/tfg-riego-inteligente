import { getCookie } from "cookies-next"
import { notify } from "./notify"

export async function getDevices (token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices", options)
    if (request.status == 200) {
        let response = await request.json()
        return response
    } else {
        notify("Error al obtener dispositivos", "error")
        return []
    }
}

export function checkIP(ip: string) {
    const patronIP: RegExp = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (patronIP.test(ip)) {
        const octetos: number[] = ip.split('.').map(Number);

        // Verifica que cada octeto esté en el rango adecuado (0-255)
        if (octetos.every(octeto => octeto >= 0 && octeto <= 255)) {
            return true
        }
    }

    return false;
}

export async function createDevice (id: string, name: string, ip: string, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, name: name, ip: ip})
    }
    console.log(options)
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/", options)
    if (response.status == 200) {
        notify("Dispositivo creado", "success")
        return true
    } else {
        notify("Error al crear dispositivo", "error")
        return false
    }
}

export async function deleteDevice (id: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/" + id, options)
    if (response.status == 200) {
        notify("Dispositivo eliminado", "success")
        return true
    } else {
        notify("Error al eliminar dispositivo", "error")
        return false
    }
}

export async function updateDevicePosition (id: string, lat: number, lon: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, Latitud: lat, Longitud: lon})
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/position", options)
    if (response.status == 200) {
        notify("Posición actualizada", "success")
        return true
    } else {
        notify("Error al actualizar posición", "error")
        return false
    }
}

export async function updateDeviceIp (id: string, ip: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, ip: ip})
    }

    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/ip", options)
    if (response.status == 200) {
        notify("IP actualizada", "success")
        return true
    } else {
        notify("Error al actualizar IP", "error")
        return false
    }
}

export async function testDeviceConnection (id: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/test/" + id, options)
    if (response.status == 200) {
        notify("Conexión exitosa", "success")
        return true
    } else {
        notify("Error al conectar con dispositivo", "error")
        return false
    }
}

export async function getDeviceInfo (id: string, token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/id/" + id, options)
    if (response.status == 200) {
        let data = await response.json()
        return data
    } else {
        notify("Error al obtener información del dispositivo", "error")
        return undefined
    }
}

export async function updateDeviceArea (id: string, area: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, area: area})
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/area", options)
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}

export const getDeviceName = async (device: string) => {
    const token = getCookie("token")
    let info = await getDeviceInfo(device, token as string)
    if (info !== undefined) {
        return info.name
    }
    return "Sin device"
}

export const getDeviceLogs = async (device: string) => {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/logs/device/" + device, options)
    if (response.status == 200) {
        let data = await response.json()
        return data
    } else {
        return []
    }
}

export const getTemperatureValues = async (device: string) => {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/monitor/temperature/all/" + device, options)
    if (response.status == 200) {
        let data = await response.json()
        return data
    } else {
        return []
    }
}

export const getDeviceTempLast24 = async (device: string) => {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/monitor/temperature/last24/" + device, options)
    if (response.status == 200) {
        let data = await response.json()
        return data
    } else {
        return []
    }
}