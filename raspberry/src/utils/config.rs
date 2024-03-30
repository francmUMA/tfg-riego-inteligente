use std::fs;
use serde_json::Value;
use serde_json::json;

pub fn update_config_file() -> bool {
    true
}

pub fn read_config_file(attribute: String) -> Option<String> {
    let config_json = fs::read_to_string("config.json");
    if config_json.is_err() {
        println!("Error al leer el archivo de configuración");
        return None;
    }

    let config_json = config_json.unwrap();
    let config_json: Result<Value, _> = serde_json::from_str(config_json.as_str());
    if config_json.is_err() {
        println!("Error al parsear el archivo de configuración");
        return None;
    }

    let config_json = config_json.unwrap();
    println!("Config: {}", config_json.to_string());

    Some(config_json.to_string())
}

pub fn create_config_file() -> bool {
    let config = json!({
        "device_uuid": "Esto es una prueba",
        "device_name": "device",
        "device_pin": 1,
        "mqtt_broker": "192.168.1.137"
    });

    let config = serde_json::to_string(&config);
    if config.is_err() {
        println!("Error al crear el archivo de configuración");
        return false;
    }

    let config = config.unwrap();

    let write_result = fs::write("config.json", config);
    if write_result.is_err() {
        println!("Error al escribir el archivo de configuración");
        return false;
    }

    true
}