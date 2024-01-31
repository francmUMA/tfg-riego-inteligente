export default async function checkPassword(password: string, email: string) {
    let data = {
        email: email,
        password: password
    }
    const response = await fetch('http://192.168.1.148:3000/api/users/password-check', {
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