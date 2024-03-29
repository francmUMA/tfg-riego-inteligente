use rppal::gpio::InputPin;
use rppal::gpio::Gpio;
use serde_json::Value;

pub struct  Sensor {
    id: String,
    device: String,
    device_pin: Option<InputPin>,
    sensor_type: String,
    area: Option<String>,
    latitud: Option<f64>,
    longitud: Option<f64>,
    name: String,
    value: Option<u8>,
    available: u8
}

impl Sensor {
    pub fn new(
        id: String,
        device: String,
        device_pin: Value,
        sensor_type: String,
        area: Value,
        latitud: Value,
        longitud: Value,
        name: String,
        value: Value,
        available: u8
    ) -> Sensor {
        let mut device_pin_value: Option<InputPin> = None;
        let mut area_value: Option<String> = None;
        let mut latitud_value: Option<f64> = None;
        let mut longitud_value: Option<f64> = None;
        let mut value_value: Option<u8> = None;
        if device_pin.is_u64() {
            device_pin_value = Some(Gpio::new().unwrap().get(device_pin.as_u64().unwrap() as u8).unwrap().into_input());
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
        if value.is_u64() {
            value_value = Some(value.as_u64().unwrap() as u8);
        }
        Sensor {
            id,
            device,
            device_pin: device_pin_value,
            sensor_type,
            area: area_value,
            latitud: latitud_value,
            longitud: longitud_value,
            name,
            value: value_value,
            available
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn change_pin(&mut self, pin: u8) -> bool {
        self.device_pin = Some(Gpio::new().unwrap().get(pin).unwrap().into_input());
        true
    }

    pub fn read(&mut self) -> Option<u8> {
        println!("Tipo de sensor: {}", self.sensor_type.as_str());
        if self.sensor_type.as_str() == "DHT" {
            self.value = Some(read_humidity(&mut self.device_pin));
        } else if self.sensor_type.as_str() == "TMP" {
            self.value = Some(read_tmp(&mut self.device_pin));
        } else if self.sensor_type.as_str() == "CAU" {
            self.value = Some(read_caudal(&mut self.device_pin));
        }
        
        self.value.clone()
    }

    pub fn get_device(&self) -> String {
        self.device.clone()
    }

    pub fn clean_pin(&mut self) {
        self.device_pin = None;
    }
}

fn read_humidity(pin: &mut Option<InputPin>) -> u8{
    return 1;
}

fn read_tmp(pin: &mut Option<InputPin>) -> u8{
    return 2;
}

fn read_caudal(pin: &mut Option<InputPin>) -> u8{
    return 3;
}

#[tokio::main]
pub async fn get_sensors_device(uuid: String, token: String) -> Result<Vec<Sensor>, String> {
    use crate::utils::net;
    let ip = "192.168.1.137";
    let port = "3000";
    let address = net::ip_port_concat(ip.to_string(), port.to_string());
    let url = net::mk_url("http".to_string(), address, "api/sensores/".to_string() + &uuid);

    use reqwest::Client;
    let client = Client::new();
    let res = client.get(url).header("Authorization", "Bearer ".to_string() + &token).send().await;
    if let Err(_) = res {
        return Err("Error al obtener la información de los sensores".to_string());
    }

    use serde_json::Value;
    let data = res.unwrap();
    if data.status().is_success(){
        let body_json: Result<Value, _> = data.json().await;
        if let Err(_) = body_json {
            return Err("Error al obtener la información de los sensores".to_string());
        }

        let sensors_json = body_json.unwrap();
        let mut sensors: Vec<Sensor> = Vec::new();
        for sensor in sensors_json.as_array().unwrap() {
            let sensor = Sensor::new(
                sensor["id"].as_str().unwrap().to_string(),
                sensor["device"].to_string(),
                sensor["device_pin"].clone(),
                sensor["type"].to_string(),
                sensor["area"].clone(),
                sensor["Latitud"].clone(),
                sensor["Longitud"].clone(),
                sensor["name"].to_string(),
                sensor["value"].clone(),
                sensor["available"].as_u64().unwrap() as u8
            );
            sensors.push(sensor);
        }
        return Ok(sensors);
    }
    
    Err("No se pudo obtener la información de los sensores".to_string())
}