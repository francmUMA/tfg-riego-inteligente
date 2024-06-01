use std::{sync::{Arc, Mutex}, thread::sleep, time::{Duration, Instant}};

use rppal::gpio::{Gpio, InputPin, Level, OutputPin};

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
    active_program: Option<String>,
    flowmeter: Option<InputPin>
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
        let mut flowmeter: Option<InputPin> = None;
        if device_pin.is_u64() {
            device_gpio = Some(Gpio::new().unwrap().get(device_pin.as_u64().unwrap() as u8).unwrap().into_output());
            flowmeter = Some(Gpio::new().unwrap().get(device_pin.as_u64().unwrap() as u8 + 1).unwrap().into_input());
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
            active_program_val = Some(active_program.as_str().unwrap().to_string());
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
            active_program: active_program_val,
            flowmeter
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

    pub fn get_active_program(&self) -> Option<String> {
        self.active_program.clone()
    }

    pub fn change_pin(&mut self, pin: u8) -> bool {
        self.clean_pin();
        self.device_pin = Some(Gpio::new().unwrap().get(pin).unwrap().into_output());
        self.flowmeter = Some(Gpio::new().unwrap().get(pin + 1).unwrap().into_input());
        true
    }

    pub fn clean_pin(&mut self) {
        self.device_pin = None;
        self.flowmeter = None;
    }

    pub fn set_active_program(&mut self, program: String) {
        if program == "null" {
            self.active_program = None;
            return;
        }
        self.active_program = Some(program);
    }

    pub fn get_current_flow(&mut self) -> i64 {
        let mut pulses = Arc::new(Mutex::new(0));
        if self.flowmeter.is_none() {
            return *pulses.lock().unwrap() as i64;
        }
        let mut pulses_clone =Arc::clone(&pulses);
        self.flowmeter.as_mut().unwrap().set_async_interrupt(rppal::gpio::Trigger::FallingEdge, move |_| {
            let mut num = pulses_clone.lock().unwrap();
            *num += 1;
        });

        sleep(Duration::from_secs(1));
        println!("Pulses: {}", *pulses.lock().unwrap());
        self.flowmeter.as_mut().unwrap().clear_async_interrupt();
        let res = *pulses.lock().unwrap();
        
        (res as f32 / 7.5) as i64
    }
    
}

