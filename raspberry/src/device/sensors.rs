use rppal::gpio::InputPin;
use rppal::gpio::Gpio;
use serde_json::json;
use serde_json::Value;

pub struct  Sensor {
    id: String,
    device: String,
    area: Option<String>,
    name: String,
    available: u8
}

impl Sensor {
    pub fn new(
        id: String,
        device: String,
        area: Value,
        name: String,
        available: u8
    ) -> Sensor {
        let mut area_value: Option<String> = None;
        if area.is_string() {
            area_value = Some(area.to_string());
        }
        Sensor {
            id,
            device,
            area: area_value,
            name,
            available
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn get_device(&self) -> String {
        self.device.clone()
    }
}

pub struct ESP32info {
    id: String,
    time: u64,
    temp: f64,
    hum: f64,
    soil_temp: u32,
    soil_hum: u32
}

impl ESP32info {
    pub fn new(
        id: String,
        time: u64,
        temp: f64,
        hum: f64,
        soil_temp: u32,
        soil_hum: u32
    ) -> ESP32info {
        ESP32info {
            id,
            time,
            temp,
            hum,
            soil_temp,
            soil_hum
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_time(&self) -> u64 {
        self.time
    }

    pub fn get_temp(&self) -> f64 {
        self.temp
    }

    pub fn get_hum(&self) -> f64 {
        self.hum
    }

    pub fn get_soil_temp(&self) -> u32 {
        self.soil_temp
    }

    pub fn get_soil_hum(&self) -> u32 {
        self.soil_hum
    }

}   

pub fn get_esp32_info(id: String, payload: String) -> ESP32info {
    let time = crate::utils::time::create_unix_timestamp();
    let json_payload: Value = serde_json::from_str(&payload).unwrap();
    let analog = json_payload["ANALOG"].as_object().unwrap();
    let am3201 = json_payload["AM2301"].as_object().unwrap();
    let mut soil_hum = analog["A1"].as_u64().unwrap_or_else(|| 0) as u32;
    soil_hum = ((3876 - soil_hum) as f32/(3876-1100) as f32)*100 as u32;
    let temp = am3201["Temperature"].as_f64().unwrap_or_else(|| 0.0);
    let hum = am3201["Humidity"].as_f64().unwrap_or_else(|| 0.0);
    let soil_temp = 0;
    return ESP32info::new(id, time, temp, hum,soil_temp, soil_hum)
}