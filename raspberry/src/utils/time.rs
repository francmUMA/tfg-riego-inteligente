use std::time;
use tokio::time::{sleep, Instant};

pub fn create_unix_timestamp() -> u64 {
    let now = time::SystemTime::now();
    let since_the_epoch = now.duration_since(time::UNIX_EPOCH).expect("Error al obtener el tiempo actual.");
    since_the_epoch.as_secs() 
}

#[derive(PartialOrd,Eq)]
pub struct Timer {
    deadline: Instant,
    task: fn(actuador: String),
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
    pub fn new(deadline: Instant, task: fn(actuador: String)) -> Timer {
        Timer {
            deadline,
            task,
        }
    }
}





