use std::fs;
use serde_json::Value;
use serde_json::json;

use crate::utils::mqtt_client::MqttClient;

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

    use uuid::Uuid;
    let uuid = Uuid::new_v4();

    let config = json!({
        "device_uuid": uuid.to_string(),
        "device_name": "-",
        "nif": "00000000A",
        "mqtt_broker": "172.16.52.142"
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

    // Registrar el device en el server
    let aux_client = MqttClient::new("172.16.52.142".to_string(), uuid.to_string().clone());
    if aux_client.is_none() {
        println!("Error al crear el cliente mqtt");
        return false;
    }
    return aux_client.unwrap().publish("devices/new", uuid.to_string().as_str());
}