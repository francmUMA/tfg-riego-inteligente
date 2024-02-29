export async function addCoords(Latitud: number, Longitud: number, area: string, index: number, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Latitud: Latitud,
            Longitud: Longitud,
            index: index
        })
    }
    const response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/coords/" + area, options)
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function deleteCoords(area: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/coords/" + area, options)
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function getCoordsArea(area: string, token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + '/coords/' + area, options)
    if (response.status == 200) {
        let data = await response.json()
        return data
    } else {
        return []
    }
}