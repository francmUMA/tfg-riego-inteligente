export async function getSensors(device: string, token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/" + device, options)
    if (request.status === 200) {
        return await request.json()
    } else {
        return undefined
    }
}

export async function checkSensorId(sensors: any, id: string){
    return !(sensors.find((sensor: any) => sensor.id == id))
}

export async function addSensor(id: string, device: string, token: string, type: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, type: type})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/sensores/" + device, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}