use std::time;
use timer::{Guard, Timer};
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
    deadline: Instant,
    guard: Guard
}

impl TimerWrapper {
    pub fn new(deadline: Instant, tx_clone: Sender<String>) -> TimerWrapper {
        let timer = Timer::new();
        let uuid = uuid::Uuid::new_v4();
        TimerWrapper {
            id: uuid.clone().to_string(),
            deadline,
            guard: timer.schedule_with_delay(chrono::Duration::seconds(2), move || { tx_clone.send(uuid.clone().to_string()); } )
        }
    }
    pub fn get_deadline(&self) -> Instant {
        self.deadline
    }
}





