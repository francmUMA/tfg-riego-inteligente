use std::sync::MutexGuard;

use crate::utils::{config::update_config_file, mqtt_client::MqttClient};
use serde_json::Value;

pub struct Device {
    id: String,
    name: String,
    latitud: f64,
    longitud: f64,
    usuario: String,
    ip: String,
    available: u8,
    area: String,
}

impl Device {
    pub fn new(
        id: String, 
        name: String, 
        latitud: f64, 
        longitud: f64, 
        usuario: String, 
        ip: String, 
        available: u8, 
        area: String
                        ) -> Device {
        Device {
            id,
            name,
            latitud,
            longitud,
            usuario,
            ip,
            available,
            area,
        }
    }

    pub fn initialize(
        id: String
    ) -> Device {
        Device {
            id,
            name: "".to_string(),
            latitud: 0.0,
            longitud: 0.0,
            usuario: "00000000A".to_string(),
            ip: "".to_string(),
            available: 0,
            area: "".to_string(),
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }
}

pub fn get_device(device_json: Value) -> Option<Device>{
    None
}

pub fn initialize() -> Option<Device>{
    None
}

pub fn register_device(uuid: String, mqtt_client: MutexGuard<'_,MqttClient>) -> bool{
    if !mqtt_client.publish("devices/new", uuid.as_str()){
        return false;
    }
    println!("Dispositivo registrado con UUID: {}", uuid);
    true
}
