export const fetchUserInfo = async (token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/token", options)
    if (request.status === 200) {
        let response = await request.json()
        return response
    } else {
        return undefined
    }
}

export const updateNameSurname = async (name: string, surname: string, token: string) => {
    let options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            apellidos: surname
        })
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}

export const getEvents = async (token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/events", options)
    if (request.status === 200) {
        let response = await request.json()
        let data = []
        for (let event of response) {
            data.push(event)
        }
        console.log(data)
        return data
    } else {
        return undefined
    }
}