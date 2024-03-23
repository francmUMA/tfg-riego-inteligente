use std::fmt::Error;

struct Device {
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

// #[tokio::main]
// pub async fn get_device_info() -> Device {
//     use crate::utils::net;
//     let ip = "192.168.1.137";
//     let port = "3000";
//     let address = net::ip_port_concat(ip.to_string(), port.to_string());
//     let url = net::mk_url("http".to_string(), address, "device".to_string());
// }

#[tokio::main]
pub async fn get_my_uuid() -> String {
    use crate::utils::net;
    let mut uuid = String::new();
    let ip = "192.168.1.137";
    let port = "3000";
    let address = net::ip_port_concat(ip.to_string(), port.to_string());
    let url = net::mk_url("http".to_string(), address, "api/devices/uuid".to_string());

    use reqwest::get;
    let res = get(url)
        .await;
    if let Err(e) = res {
        println!("Error al obtener el uuid");
        return "".to_string();
    } else {
        if res.unwrap().status().is_success() {
            //TO-DO --- Sacar el uuid del json

            uuid
        } else {
            "".to_string()
        }
    }
}