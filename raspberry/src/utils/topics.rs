use std::borrow::BorrowMut;

use crate::device::{actuadores::{self, Actuador}, info::Device};

fn manage_topic_actuadores(topic: &str, payload: &str, actuadores: &mut Vec<Actuador>){
    // Se obtiene el id del actuador
    let topic_split: Vec<&str> = topic.split("/").collect();
    let actuador_id = topic_split[3];

    // Se obtiene el actuador
    let actuador = actuadores.iter().find(|actuador| actuador.get_id() == actuador_id);
    if actuador.is_none() {
        println!("No se ha encontrado el actuador");
        return;
    }
    let actuador = actuador.unwrap().borrow_mut();

    // Hay que saber que es lo que se va a hacer con el actuador
    if topic.contains("update") {
        // Hay que actualizar alguno de los atributos del actuador
        if topic.contains("status") {
            // Hay que saber si el payload es 1 o 0
            if payload == "1" {
                actuador.open();
                println!("Abriendo el actuador con id {}", actuador.get_id());
            } else if payload == "0" {
                actuador.close();
                println!("Cerrando el actuador con id {}", actuador.get_id());
            }
        }
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