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
            device_json["Latitud"].as_f64().unwrap(),
            device_json["Longitud"].as_f64().unwrap(),
            device_json["usuario"].to_string(),
            device_json["ip"].to_string(),
            device_json["available"].as_u64().unwrap() as u8,
            device_json["area"].to_string()
        );
        return Ok(device);
    }
    Err("No se ha podido obtener la información del dispositivo".to_string())

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