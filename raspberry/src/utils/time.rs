use std::time::{self, Duration};
use tokio::time::{sleep, Instant};
use std::sync::mpsc::Sender;

use crate::device::actuadores::Actuador;

use super::mqtt_client::MqttClient;

pub fn create_unix_timestamp() -> u64 {
    let now = time::SystemTime::now();
    let since_the_epoch = now.duration_since(time::UNIX_EPOCH).expect("Error al obtener el tiempo actual.");
    since_the_epoch.as_secs() 
}

pub struct TimerWrapper {
    id: String,
    actuador_id: String,
    stopped: u8
}

impl TimerWrapper {
    pub fn new(id: String, actuador_id: String) -> TimerWrapper {
        TimerWrapper {
            id,
            actuador_id,
            stopped: 0 as u8
        }
    }

    pub fn get_id(&self) -> String {
        self.id.clone()
    }

    pub fn get_actuador_id(&self) -> String {
        self.actuador_id.clone()
    }

    pub fn is_stopped(&self) -> bool {
        self.stopped == 2
    }

    pub fn is_timer_to_resume(&self) -> bool {
        self.stopped == 1
    }

    pub fn resume_timer(&mut self) {
        self.stopped = 0;
    }
}

pub async fn init_timer(id: String, tx: Sender<String>, duration: u64) {
    println!("Iniciando temporizador de {} segundos", duration);
    sleep(Duration::from_secs(duration)).await;
    tx.send(id);
}





