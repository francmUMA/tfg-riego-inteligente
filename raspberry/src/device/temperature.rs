pub fn get_temperature() -> i8{
    // Importamos la librería para ejecutar comandos del sistema
    use std::process::Command;

    // Ejecutamos el script que obtiene la temperatura
    let cmd_output = Command::new("./scripts/get_temperature.sh")
        .output();
    
    // Una vez obtenida la salida del comando, hay que convertirla al formato necesario
    if cmd_output.is_err() {
        println!("Error al ejecutar el comando");
        return -1
    } else {
        let value = cmd_output.unwrap().stdout;
        let temperature = String::from_utf8(value);
        if (temperature.is_err()) {
            println!("Error al obtener la temperatura");
            return -1
        }
        let temperature = temperature.unwrap();
        let res = temperature.parse::<f32>();
        if (res.is_err()) {
            println!("Error al convertir la temperatura");
            return -1
        }
        res.unwrap() as i8
    }   
}