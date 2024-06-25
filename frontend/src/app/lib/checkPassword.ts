export default async function checkPassword(password: string, email: string) {
    let data = {
        email: email,
        password: password
    }
    const response = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + '/users/password-check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}