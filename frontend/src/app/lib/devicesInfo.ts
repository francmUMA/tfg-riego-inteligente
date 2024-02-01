export async function getDevices (token: string) {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let request = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices", options)
    if (request.status == 200) {
        let response = await request.json()
        return response
    } else {
        return undefined
    }
}

export function checkIP(ip: string) {
    const patronIP: RegExp = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (patronIP.test(ip)) {
        const octetos: number[] = ip.split('.').map(Number);

        // Verifica que cada octeto esté en el rango adecuado (0-255)
        if (octetos.every(octeto => octeto >= 0 && octeto <= 255)) {
            return true
        }
    }

    return false;
}

export async function createDevice (id: string, ip: string, token: string) {
    let options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, ip: ip})
    }
    console.log(options)
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/", options)
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function deleteDevice (id: string, token: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/devices/" + id, options)
    if (response.status == 200) {
        return true
    } else {
        return false
    }
}