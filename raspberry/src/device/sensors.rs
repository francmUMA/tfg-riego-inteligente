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
            sensor_type: sensor_type.chars().filter(|c| c.to_ascii_lowercase() != '"'.to_ascii_lowercase()).collect::<String>(),
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
        println!("Tipo de sensor: {}", self.sensor_type);
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

pub fn get_sensors_device() -> Option<Vec<Sensor>> {
    None
}