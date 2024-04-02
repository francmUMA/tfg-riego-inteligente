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

    pub fn set_name(&mut self, name: String) {
        self.name = name;
    }

    pub fn set_latitud(&mut self, latitud: Option<f64>) {
        if latitud.is_none() {
            return;
        }
        self.latitud = latitud.unwrap();
    }

    pub fn set_longitud(&mut self, longitud: Option<f64>) {
        if longitud.is_none() {
            return;
        }
        self.longitud = longitud.unwrap();
    }

    pub fn set_usuario(&mut self, usuario: String) {
        self.usuario = usuario;
    }

    pub fn set_ip(&mut self, ip: String) {
        self.ip = ip;
    }

    pub fn set_available(&mut self, available: u8) {
        self.available = available;
    }

    pub fn set_area(&mut self, area: Option<String>) {
        if area.is_none() {
            return;
        }
        self.area = area.unwrap();
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
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

pub fn register_device(uuid: String, mqtt_client: MutexGuard<'_,MqttClient>) -> bool{
    if !mqtt_client.publish("devices/new", uuid.as_str()){
        return false;
    }
    println!("Dispositivo registrado con UUID: {}", uuid);
    true
}
