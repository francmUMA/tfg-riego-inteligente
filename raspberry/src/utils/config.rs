use std::fs;
use serde_json::Value;
use serde_json::json;

pub fn update_config_file(attribute: String, value: String) -> bool {
    let config_json = fs::read_to_string("config.json");
    if config_json.is_err() {
        println!("Error al leer el archivo de configuración");
        return false;
    }

    let mut config_json = config_json.unwrap();
    let config_json: Result<Value, _> = serde_json::from_str(config_json.as_str());
    if config_json.is_err() {
        println!("Error al parsear el archivo de configuración");
        return false;
    }

    let mut config_json = config_json.unwrap();
    config_json[attribute.as_str()] = Value::String(value);

    let config = serde_json::to_string(&config_json);
    if config.is_err() {
        println!("Error al actualizar la configuración");
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
    let att_data = config_json[attribute.as_str()].as_str();
    if att_data.is_none() {
        println!("No se ha podido obtener el atributo: {}", attribute);
        return None;
    }

    Some(att_data.unwrap().to_string())
}

pub fn create_config_file() -> bool {
    let file = fs::File::create("config.json");
    if file.is_err() {
        println!("Error al crear el archivo de configuración");
        return false;
    }

    let config = json!({
        "device_uuid": "-",
        "device_name": "-",
        "email": "-",
        "password": "-",
        "mqtt_broker": "192.168.1.137"
    });

    let config = serde_json::to_string(&config);
    if config.is_err() {
        println!("Error al crear la configuración");
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