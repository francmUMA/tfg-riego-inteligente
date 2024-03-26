use std::borrow::BorrowMut;

use crate::device::{actuadores::{self, Actuador}, info::Device};

fn manage_topic_actuadores(topic: &str, payload: &str, actuadores: &mut Vec<Actuador>){
    // Se obtiene el id del actuador
    let topic_split: Vec<&str> = topic.split("/").collect();
    let actuador_id = topic_split[3];

    // Se obtiene el actuador
    if let Some(actuador) = actuadores.iter_mut().find(|actuador| actuador.get_id() == actuador_id) {
        // Hay que saber que es lo que se va a hacer con el actuador
        if topic.contains("update") && topic.contains("status") {
            // Hay que saber si el payload es 1 o 0
            match payload {
                "1" => {
                    actuador.open();
                    println!("Abriendo el actuador con id {}", actuador.get_id());
                }
                "0" => {
                    actuador.close();
                    println!("Cerrando el actuador con id {}", actuador.get_id());
                }
                _ => println!("Payload no reconocido"),
            }
        }
    } else {
        println!("No se ha encontrado el actuador");
    }
}

fn manage_topic_device(topic: &str, payload: &str, device: &mut Device){
    println!("Topic de dispositivos");
}

pub fn manage_msg(topic: &str, payload: &str, device: &mut Device, actuadores: &mut Vec<Actuador>){
    println!("Mensaje recibido en el topic: {}", topic);
    // Hay que saber si el topic es de un actuador o de un dispositivo
    if topic.contains("actuadores") {
        manage_topic_actuadores(topic, payload, actuadores);
    } else {
        manage_topic_device(topic, payload, device);
    }
}