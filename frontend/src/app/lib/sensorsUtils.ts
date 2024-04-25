import { getCookie } from "cookies-next"

export interface Sensor {
    id: string,
    type: string,
    device: string,
    device_pin: number,
    area: string,
    Latitud: number,
    Longitud: number,
    name: string,
    value: number,
    available: number
}

export async function getUserSensors() {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'  
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/all", options)
    if (response.status === 200) {
        return await response.json()
    } else {
        return []
    }
}

export async function getSensors(device: string, token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/" + device, options)
    if (request.status === 200) {
        let sensors = await request.json()
        for (let sensor of sensors) {
            let lastValue = await getSensorLastValue(sensor.id, token)
            if (lastValue !== undefined) {
                sensor.value = lastValue ? lastValue.value : 0
                console.log(lastValue.id)
            }
        }
        return sensors
    } else {
        return []
    }
}

export async function checkSensorId(sensors: any, id: string){
    return !(sensors.find((sensor: any) => sensor.id == id))
}

export async function addSensor(name: string, device: string, token: string, type: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, type: type})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/" + device, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateSensorArea(id: string, area: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, area: area})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/area", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateSensorPin(id: string, pin: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, device_pin: pin})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/pin", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function deleteSensor(id: string, device: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/" + device, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateSensorPosition(id: string, Latitud: number, Longitud: number, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, Latitud: Latitud, Longitud: Longitud})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/position", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export const getSensorLastValue = async (id: string, token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/monitor/sensor/last/" + id, options)
    if (request.status === 200) {
        return await request.json()
    } else {
        return undefined
    }
}

export const getSensorLast24hValues = async (id: string, token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/monitor/sensor/last24/" + id, options)
    if (request.status === 200) {
        return await request.json()
    } else {
        return undefined
    }
}

export const getSensorLogs = async (sensor: string) => {
    const token = getCookie("token")
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token as string,
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/logs/sensor/" + sensor, options)
    if (response.status == 200) {
        let data = await response.json()
        console.log("logs", data)
        return data
    } else {
        return []
    }
}