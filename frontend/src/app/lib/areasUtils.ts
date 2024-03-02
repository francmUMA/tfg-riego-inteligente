export interface Area {
    id: string,
    name: string,
    user: string,
    color: string
}

export async function getAreas(token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/areas", options)
    if (request.status === 200) {
        return request.json()
    } else {
        return []
    }
}

export async function addArea(name: string, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, color: '5833FF'})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/areas", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function deleteArea(id: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/areas/" + id, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateColorArea(color: string, id: string, token: string) {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({color: color})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/areas/color/" + id, options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}