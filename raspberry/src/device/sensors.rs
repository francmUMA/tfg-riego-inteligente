use serde_json::Value;

pub struct  Sensor {
    id: String,
    device: String,
    device_pin: u8,
    sensor_type: String,
    area: String,
    latitud: f64,
    longitud: f64,
    name: String,
    value: u32,
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
        let mut device_pin_value: Option<u8> = None;
        let mut area_value: Option<String> = None;
        let mut latitud_value: Option<f64> = None;
        let mut longitud_value: Option<f64> = None;
        let mut value_value: Option<u32> = None;
        if device_pin.as_u64().is_some() {
            device_pin_value = Some(device_pin.as_u64().unwrap() as u8);
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
            value_value = Some(value.as_u64().unwrap() as u32);
        }
        Sensor {
            id,
            device,
            device_pin: device_pin_value.unwrap() as u8,
            sensor_type,
            area: area_value.unwrap(),
            latitud: latitud_value.unwrap(),
            longitud: longitud_value.unwrap(),
            name,
            value: value_value.unwrap(),
            available
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }
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
                sensor["id"].to_string(),
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
        print!("{}", sensors[0].get_id());
        return Ok(sensors);
    }
    
    Err("No se pudo obtener la información de los sensores".to_string())
}