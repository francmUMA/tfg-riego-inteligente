export async function getToken(email: string, password: string) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/auth/", options)
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
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/auth/check", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}