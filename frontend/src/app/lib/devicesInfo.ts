export async function getDevices (token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch("http://192.168.1.148:3000/api/devices", options)
    if (request.status == 200) {
        let response = await request.json()
        return response
    } else {
        return undefined
    }
}