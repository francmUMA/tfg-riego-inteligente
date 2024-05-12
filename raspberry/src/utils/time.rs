use std::time::{self, Duration};
use timer::Guard;
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
    pub fn new(uuid: String, deadline: Instant, guard: Guard) -> Timer {
        TimerWrapper {
            id: uuid,
            deadline,
            guard
        }
    }
    pub fn get_deadline(&self) -> Instant {
        self.deadline
    }
}

pub async fn init_timer(id: String){
    sleep(Duration::from_secs(10)).await;
    println!("Timer {} finalizado", id);
}





