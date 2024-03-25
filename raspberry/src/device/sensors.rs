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
        device_pin: u8,
        sensor_type: String,
        area: String,
        latitud: f64,
        longitud: f64,
        name: String,
        value: u32,
        available: u8
    ) -> Sensor {
        Sensor {
            id,
            device,
            device_pin,
            sensor_type,
            area,
            latitud,
            longitud,
            name,
            value,
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
        println!("{:?}", sensors_json);
        let mut sensors: Vec<Sensor> = Vec::new();
        for sensor in sensors_json.as_array().unwrap() {
            let sensor = Sensor::new(
                sensor["id"].to_string(),
                sensor["device"].to_string(),
                sensor["device_pin"].as_u64().unwrap() as u8,
                sensor["sensor_type"].to_string(),
                sensor["area"].to_string(),
                sensor["latitud"].as_f64().unwrap(),
                sensor["longitud"].as_f64().unwrap(),
                sensor["name"].to_string(),
                sensor["value"].as_u64().unwrap() as u32,
                sensor["available"].as_u64().unwrap() as u8
            );
            sensors.push(sensor);
        }
        return Ok(sensors);
    }
    
    Err("No se pudo obtener la información de los sensores".to_string())
}