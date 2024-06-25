// Devuelve true si el email es válido y falso si está duplicado
export async function checkRegisterEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(email)){
    // Comprobar si está duplicado
    let check = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/email/" + email)
    if (check.status === 200) {
        return 2;
    }
    return 0
  } else {
    return 1;
  }
}

export async function checkLoginEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(email)){
    // Comprobar si existe
    let check = await fetch(process.env.NEXT_PUBLIC_GLOBAL_API_URL + "/users/email/" + email)
    if (check.status === 200) {
        return true;
    }
    return false
  } else {
    return false
  }
}