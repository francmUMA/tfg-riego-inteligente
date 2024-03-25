use std::error::Error;

use serde_json::de;


pub struct Device {
    id: String,
    name: String,
    latitud: f64,
    longitud: f64,
    usuario: String,
    ip: String,
    available: bool,
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
        available: bool, 
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

    // Si hace falta, se pueden agregar más métodos
    pub fn get_id(&self) -> &String {
        &self.id
    }

    pub fn get_usuario(&self) -> &String {
        &self.usuario
    }
    

}

#[tokio::main]
pub async fn get_device_info(uuid: String) -> Result<Device, String> {
    use crate::utils::net;
    let ip = "192.168.1.137";
    let port = "3000";
    let address = net::ip_port_concat(ip.to_string(), port.to_string());
    let url = net::mk_url("http".to_string(), address, "api/devices/uuid/".to_string() + &uuid);
    
    use reqwest::Client;
    let client = Client::new();
    let res = client.get(url).send().await;
    if let Err(_) = res {
        return Err("Error al obtener la información del dispositivo".to_string());
    }
    
    use serde_json::Value;
    let body = res.unwrap();
    if body.status().is_success() {
        let body_json: Result<Value, _> = body.json().await;
        if let Err(_) = body_json {
            return Err("Error al obtener la información del dispositivo".to_string());
        }
        let device_json = body_json.unwrap();
        let device: Device = Device::new(
            device_json["id"].to_string(),
            device_json["name"].to_string(),
            device_json["latitud"].as_f64().unwrap(),
            device_json["longitud"].as_f64().unwrap(),
            device_json["usuario"].to_string(),
            device_json["ip"].to_string(),
            device_json["available"].as_bool().unwrap(),
            device_json["area"].to_string()
        );
        println!("Dispositivo: {}\nName: {}\nip: {}\nAvailable: {}\nLatitud: {}", device.id, device.name, device.ip, device.available, device.latitud);
        return Err("Hola".to_string());
    }
    Err("Hola".to_string())

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