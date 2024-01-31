export async function getToken(email: string, password: string) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    }
    let request = await fetch("http://192.168.1.148:3000/api/auth/", options)
    if (request.status === 200) {
        let response = await request.json()
        return response.token
    } else {
        return undefined
    }
}

export async function checkToken(token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch("http://192.168.1.148:3000/api/auth/check", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}