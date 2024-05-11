use std::time;
use tokio::time::{sleep, Instant};
use std::sync::mpsc::Sender;

use crate::device::actuadores::Actuador;

use super::{mqtt_client::MqttClient, programs::Program};

pub fn create_unix_timestamp() -> u64 {
    let now = time::SystemTime::now();
    let since_the_epoch = now.duration_since(time::UNIX_EPOCH).expect("Error al obtener el tiempo actual.");
    since_the_epoch.as_secs() 
}

#[derive(PartialOrd,Eq)]
pub struct Timer {
    deadline: Instant,
    program: Program,
    actuator: &mut Actuador
}

impl PartialEq for Timer {
    fn eq(&self, other: &Self) -> bool {
        self.deadline == other.deadline
    }
}

impl Ord for Timer {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.deadline.cmp(&other.deadline)
    }
}

impl Timer {
    pub fn new(deadline: Instant, program: Program, actuator: &mut Actuador) -> Timer {
        Timer {
            deadline,
            program,
            actuator
        }
    }
    pub fn get_deadline(&self) -> Instant {
        self.deadline
    }
    pub fn exec_task(&self, client: &mut MqttClient) -> Program {
        self.program.end_timer_handler(self.actuator, client)
    }
}





