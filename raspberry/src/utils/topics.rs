use crate::device::{actuadores::{self, Actuador}, info::Device};

pub fn manage_msg(topic: &str, payload: &str, device: &mut Device, actuadores: &mut Vec<Actuador>){
    println!("Mensaje recibido en el topic: {}", topic);
    println!("Payload: {}", payload);
    println!("Device: {}", device.get_id());
}