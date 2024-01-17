use std::fmt::Error;

pub fn get_temperature() -> Result<f32, Error> {
    // Importamos la librería para ejecutar comandos del sistema
    use std::process::Command;

    // Ejecutamos el script que obtiene la temperatura
    let cmd_output = Command::new("./scripts/get_temperature.sh")
        .output()
        .expect("Fallo al ejecutar el comando");

    // Una vez obtenida la salida del comando, hay que convertirla al formato necesario
    let temperature = String::from_utf8_lossy(&cmd_output.stdout).to_string();
    Ok(temperature.parse::<f32>().unwrap())
}