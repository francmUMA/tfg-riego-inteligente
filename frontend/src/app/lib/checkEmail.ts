// Devuelve true si el email es válido y falso si está duplicado
export default async function checkEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  if (re.test(email)){
    // Comprobar si está duplicado
    let check = await fetch("http://192.168.1.141:3000/api/users/email/" + email)
    if (check.status === 200) {
        return false;
    }
    return true
  } else {
    return false;
  }
}