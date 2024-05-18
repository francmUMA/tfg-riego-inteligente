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
    temp: i8,
    hum: i8,
    soil_temp: i8,
}

impl ESP32info {
    pub fn new(
        id: String,
        time: u64,
        temp: i8,
        hum: i8,
        soil_temp: i8
    ) -> ESP32info {
        ESP32info {
            id,
            time,
            temp,
            hum,
            soil_temp
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_time(&self) -> u64 {
        self.time
    }

    pub fn get_temp(&self) -> i8 {
        self.temp
    }

    pub fn get_hum(&self) -> i8 {
        self.hum
    }

    pub fn get_soil_temp(&self) -> i8 {
        self.soil_temp
    }
}   

pub fn get_esp32_info(payload: String) -> ESP32info {
    let time = crate::utils::time::create_unix_timestamp();
    let json_payload: Value = serde_json::from_str(&payload).unwrap();
    let analog = &json_payload["ANALOG"];
    let am3201 = &json_payload["AM2301"];
    println!("Payload: {}", payload);
    println!("Analog: {:?}", analog);
    println!("AM2301: {:?}", am3201);
    return ESP32info::new("0".to_string(), time, 0, 0, 0)
}