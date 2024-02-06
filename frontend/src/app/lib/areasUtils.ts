export interface Area {
    id: number,
    name: string
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

export async function addArea(id:string, name: string, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, name: name})
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/areas", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}