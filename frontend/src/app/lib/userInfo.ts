export const fetchUserInfo = async (token: string) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch("http://192.168.1.133:3000/api/users/token", options)
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
    let request = await fetch("http://192.168.1.133:3000/api/users/", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}