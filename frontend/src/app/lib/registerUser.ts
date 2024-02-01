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