use std::time::Duration;
use tokio::time::Instant;

use serde_json::{Value, json};
use crate::device::actuadores::Actuador;

use super::mqtt_client::MqttClient;

pub struct Program {
    id: String,
    name: String,
    start_time: u64,
    duration: u64,
    user: String,
    days: u8
}

impl Program {
    pub fn new(id: Value, name: Value, start_time: Value, duration: Value, user: Value, days: Value) -> Option<Program> {
        if id.is_null() || name.is_null() || start_time.is_null() || duration.is_null() || user.is_null() || days.is_null() {
            println!("Elemento nulo");
            println!("id: {}", id.is_null());
            println!("name: {}", name.is_null());
            println!("start_time: {}", start_time.is_null());
            println!("duration: {}", duration.is_null());
            println!("user: {}", user.is_null());
            println!("days: {}", days.is_null());
            return None;
        }

        let id_val: Option<String> = id.is_string().then(|| id.as_str().unwrap().to_string());
        let name_val: Option<String> = name.is_string().then(|| name.as_str().unwrap().to_string());
        let start_time_val: Option<u64> = start_time.is_u64().then(|| start_time.as_u64().unwrap());
        let duration_val: Option<u64> = duration.is_u64().then(|| duration.as_u64().unwrap());
        let user_val: Option<String> = user.is_string().then(|| user.as_str().unwrap().to_string());
        let days_val: Option<u8> = days.is_u64().then(|| days.as_u64().unwrap() as u8);

        if id_val.is_none() || name_val.is_none() || start_time_val.is_none() || duration_val.is_none() || user_val.is_none() || days_val.is_none() {
            println!("Error al obtener los valores");
            return None;
        }

        Some(Program {
            id: id_val.unwrap(),
            name: name_val.unwrap(),
            start_time: start_time_val.unwrap(),
            duration: duration_val.unwrap(),
            user: user_val.unwrap(),
            days: days_val.unwrap()
        })
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_duration(&self) -> u64 {
        self.duration
    }

    pub fn irrigate_now (&self, time: u64) -> bool{
        true
    }

}


