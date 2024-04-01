use std::sync::MutexGuard;

use crate::utils::{config::update_config_file, mqtt_client::MqttClient};
use uuid::Uuid;

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
    pub fn get_id(&self) -> String {
        self.id.clone()
    }
}

pub async fn get_device_info(device_json: Value) -> Option<Device>{
    None
}

pub fn register_device(mqtt_client: MutexGuard<'_,MqttClient>) -> bool{
    let uuid = Uuid::new_v4().to_string();
    if !mqtt_client.publish("devices/new", uuid.as_str()){
        return false;
    }
    if !update_config_file("device_uuid".to_string(),uuid.clone()){
        return false;
    }
    println!("Dispositivo registrado con UUID: {}", uuid);
    true
}

#[tokio::main]
pub async fn get_my_uuid() -> String {
    use crate::utils::net;
    let mut uuid = String::new();
    let ip = "192.168.1.137";
    let port = "3000";
    let address = net::ip_port_concat(ip.to_string(), port.to_string());
    let url = net::mk_url("http".to_string(), address, "api/devices/uuid".to_string());

    use reqwest::Client;
    let client = Client::new();
    let res = client.get(url).send().await;
    if let Err(_) = res {
        println!("Error al obtener el UUID");
        return uuid;
    } 
    let body = res.unwrap();
    if body.status().is_success() {
        let body_json = body.json().await;
        if let Err(_) = body_json {
            println!("Error al obtener el UUID");
            return uuid;
        }
        uuid = body_json.unwrap();
    } else {
        println!("Error al obtener el UUID");
    }
    uuid
}