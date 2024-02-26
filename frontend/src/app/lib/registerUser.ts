export default async function registerUser(user: any) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export async function updateUserLocation (token: string, lat: number, lng: number){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({Latitud: lat, Longitud: lng})
    }

    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/position", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}