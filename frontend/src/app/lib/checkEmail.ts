// Devuelve true si el email es válido y falso si está duplicado
export default async function checkEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(email)){
    // Comprobar si está duplicado
    let check = await fetch("http://192.168.1.141:3000/api/users/email/" + email)
    if (check.status === 200) {
        return 2;
    }
    return 0
  } else {
    return 1;
  }
}