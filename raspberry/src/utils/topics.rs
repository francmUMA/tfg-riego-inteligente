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
    println!("Actuador encontrado: {}", actuador_id);
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