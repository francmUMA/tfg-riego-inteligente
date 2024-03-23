import { getCookie } from "cookies-next"

export const getCrops = async () => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops", options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    }
    return []
}

export const addCrop = async (name: string) => {
    const token = getCookie("token")
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify({name})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops", options)
    if (request.status === 200) {
        return true
    }
    return false
}

export const getCrop = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops/" + id, options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } 
    return undefined
}

export const getCropAreas = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops/areas/" + id, options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    }
    return []
}

export const deleteCrop = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify({id})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops", options)
    if (request.status === 200) {
        return true
    }
    return false
}

export const getCropDevices = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops/devices/" + id, options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } else {
        return []
    }
}

export const getCropSensors = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops/sensors/" + id, options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } else {
        return []
    }
}

export const getCropActuadores = async (id: string) => {
    const token = getCookie("token")
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/crops/actuadores/" + id, options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } else {
        return []
    }
}