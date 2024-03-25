use rppal::gpio::{Gpio, OutputPin};
pub struct Actuador {
    id: String,
    device: String,
    device_pin: OutputPin,
    area: Option<String>,
    mode: u8,
    latitud: Option<f64>,
    longitud: Option<f64>,
    status: u8,
    name: String,
}

use serde_json::Value;

impl Actuador {
    pub fn new(
        id: String,
        device: String,
        device_pin: Value,
        area: Value,
        mode: Value,
        latitud: Value,
        longitud: Value,
        status: Value,
        name: String,
    ) -> Actuador {
        let mut device_gpio = Gpio::new();
        let mut area_value: Option<String> = None;
        let mut latitud_value: Option<f64> = None;
        let mut longitud_value: Option<f64> = None;
        let mut status_value: u8 = 0;
        if device_pin.is_u64() {
            println!("Pin: {}", device_pin.as_u64().unwrap() as u8);
            device_gpio.unwrap().get(device_pin.as_u64().unwrap() as u8).unwrap().into_output();
        }
        if area.is_string() {
            area_value = Some(area.to_string());
        }
        if latitud.is_f64() {
            latitud_value = Some(latitud.as_f64().unwrap());
        }
        if longitud.is_f64() {
            longitud_value = Some(longitud.as_f64().unwrap());
        }
        if status.is_u64() {
            status_value = status.as_u64().unwrap() as u8;
        }
        Actuador {
            id,
            device,
            device_pin: device_gpio,
            area: area_value,
            mode: mode.as_u64().unwrap() as u8,
            latitud: latitud_value,
            longitud: longitud_value,
            status: status_value,
            name,
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn open(&mut self) -> bool{
        self.device_pin.set_high();
        self.status = 1;
        true
    }
}

#[tokio::main]
pub async fn get_actuators_device(uuid: String, token: String) -> Option<Vec<Actuador>> {
    let ip = "192.168.1.137";
    let port = "3000";
    let url = format!("http://{}:{}/api/actuadores/{}", ip, port, uuid);
    let client = reqwest::Client::new();
    let res = client
        .get(url)
        .header("Authorization", "Bearer ".to_string() + &token)
        .send()
        .await;
    if let Err(_) = res {
        return None;
    }

    let body = res.unwrap();
    if  !body.status().is_success() {
        return None;
    }

    let data: Result<Value, _> = body.json().await;
    if let Err(_) = data {
        return None;
    }

    // Datos listos
    let mut actuadores = Vec::new();
    for act in data.unwrap().as_array().unwrap() {
        let actuator = Actuador::new(
            act.get("id").unwrap().as_str().unwrap().to_string(),
            act.get("device").unwrap().as_str().unwrap().to_string(),
            act.get("device_pin").unwrap().clone(),
            act.get("area").unwrap().clone(),
            act.get("mode").unwrap().clone(),
            act.get("Latitud").unwrap().clone(),
            act.get("Longitud").unwrap().clone(),
            act.get("status").unwrap().clone(),
            act.get("name").unwrap().as_str().unwrap().to_string(),
        );
        actuadores.push(actuator);
    }
    Some(actuadores) 
}




