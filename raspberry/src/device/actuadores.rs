use rppal::gpio::{Gpio, OutputPin};

pub struct Actuador {
    id: String,
    device: String,
    device_pin: Option<OutputPin>,
    area: Option<String>,
    mode: u8,
    latitud: Option<f64>,
    longitud: Option<f64>,
    status: u8,
    name: String,
    active_program: Option<String>
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
        active_program: Value,
    ) -> Actuador {
        let mut device_gpio: Option<OutputPin> = None;
        let mut area_value: Option<String> = None;
        let mut latitud_value: Option<f64> = None;
        let mut longitud_value: Option<f64> = None;
        let mut status_value: u8 = 0;
        let mut active_program_val: Option<String> = None;
        if device_pin.is_u64() {
            device_gpio = Some(Gpio::new().unwrap().get(device_pin.as_u64().unwrap() as u8).unwrap().into_output());
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
        if active_program.is_string() {
            active_program_val = Some(active_program.to_string());
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
            active_program: active_program_val
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

    pub fn open(&mut self) -> bool{
        self.device_pin.as_mut().unwrap().set_high();
        self.status = 1;
        true
    }

    pub fn close(&mut self) -> bool {
        self.device_pin.as_mut().unwrap().set_low();
        self.status = 0;
        true
    }

    pub fn get_status(&self) -> u8 {
        self.status
    }

    pub fn change_pin(&mut self, pin: u8) -> bool {
        self.device_pin = Some(Gpio::new().unwrap().get(pin).unwrap().into_output());
        true
    }

    pub fn clean_pin(&mut self) {
        self.device_pin = None;
    }

    pub fn set_active_program(&mut self, program: String) {
        self.active_program = Some(program);
    }
}

