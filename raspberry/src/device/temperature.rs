pub fn get_temperature() -> i8{
    // Importamos la librería para ejecutar comandos del sistema
    use std::process::Command;

    // Ejecutamos el script que obtiene la temperatura
    let cmd_output = Command::new("./scripts/get_temperature.sh")
        .output();
    
    // Una vez obtenida la salida del comando, hay que convertirla al formato necesario
    if let Err(_) =  cmd_output {
        println!("Error al ejecutar el comando");
        return -1
    } else {
        let temperature = String::from_utf8(cmd_output.unwrap().stdout).unwrap().to_string();
        temperature.parse::<f32>().unwrap() as i8
    }   
}