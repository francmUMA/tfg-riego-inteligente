use std::error::Error;


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
pub async fn get_device_info(){
    let uuid = get_my_uuid();
    if uuid.len() == 0 {
        println!("Error al obtener el UUID");
        return;
    }
    println!("UUID: {}", uuid);
    
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