export default async function registerUser(user: any) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    let request = await fetch("http://192.168.1.148:3000/api/users/", options)
    if (request.status === 200) {
        return true
    } else {
        return false
    }
}