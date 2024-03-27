use std::borrow::{Borrow, BorrowMut};

use crate::{device::{actuadores::{self, Actuador}, info::Device}, utils::token::get_token};
use mqtt::{client, QOS_0};
use serde_json::{to_string, Value};
use paho_mqtt as mqtt;

use super::mqtt_client::MqttClient;

fn suscribe_actuador_topics(actuador_id: String, device_id: String, mqtt_client: &mut MqttClient) -> bool{
    if !mqtt_client.subscribe(format!("devices/{}/actuadores/{}/update/status", device_id, actuador_id).as_str()){
        println!("No se ha podido suscribir al topic de status del actuador con id {}", actuador_id);
        return false;
    }

    if !mqtt_client.subscribe(format!("devices/{}/actuadores/{}/update/device_pin", device_id, actuador_id).as_str()){
        println!("No se ha podido suscribir al topic de device_pin del actuador con id {}", actuador_id);
        return false;
    }

    true
}

fn unsuscribe_actuador_topics(actuador: Actuador, mqtt_client: &mut MqttClient){
    if !mqtt_client.unsubscribe(format!("devices/{}/actuadores/{}/update/status", actuador.get_device(), actuador.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de status del actuador con id {}", actuador.get_id());
    }

    if !mqtt_client.unsubscribe(format!("devices/{}/actuadores/{}/update/device_pin", actuador.get_device(), actuador.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de device_pin del actuador con id {}", actuador.get_id());
    }
}

fn manage_topic_actuadores(topic: &str, payload: &str, actuadores: &mut Vec<Actuador>, mqtt_client: &mut MqttClient){
    if topic.contains("new"){
        let payload_json: Value = serde_json::from_str(payload).unwrap();
        let actuador = Actuador::new(
            payload_json["id"].as_str().unwrap().to_string(),
            payload_json["device"].as_str().unwrap().to_string(),
            payload_json["device_pin"].clone(),
            payload_json["area"].clone(),
            payload_json["mode"].clone(),
            payload_json["Latitud"].clone(),
            payload_json["Longitud"].clone(),
            payload_json["status"].clone(),
            payload_json["name"].as_str().unwrap().to_string(),
        );
        println!("Actuador añadido: {} con id {}", actuador.get_name(), actuador.get_id());
        if !suscribe_actuador_topics(actuador.get_id().clone(), actuador.get_device().clone(), mqtt_client){
            return
        }
        actuadores.push(actuador);
    } else if topic.contains("delete"){
        // Hay que eliminar el actuador cuyo id está en el payload
        for act in actuadores.iter_mut(){
            act.close();
            act.clean_pin();
        }
        let index = actuadores.iter().position(|actuador| actuador.get_id() == payload).unwrap();
        let actuador = actuadores.remove(index);
        println!("Actuador eliminado: {} con id {}", actuador.get_name(), actuador.get_id());
        unsuscribe_actuador_topics(actuador, mqtt_client);
    }else {
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
            } else if topic.contains("update") && topic.contains("device_pin"){
                let pin = payload.parse::<u8>().unwrap();
                if pin > 0 && pin < 28 {
                    actuador.change_pin(pin);
                    println!("Cambiando el pin del actuador con id {} a {}", actuador.get_id(), pin);
                } else {
                    println!("Pin no válido");
                }
            }
        } else {
            println!("No se ha encontrado el actuador");
        }
    }
    
}

fn manage_topic_device(topic: &str, payload: &str, device: &mut Device){
    println!("Topic de dispositivos");
}

pub fn manage_msg(topic: &str, payload: &str, device: &mut Device, actuadores: &mut Vec<Actuador>, mqtt_client: &mut MqttClient){
    // Hay que saber si el topic es de un actuador o de un dispositivo
    if topic.contains("actuadores") {
        manage_topic_actuadores(topic, payload, actuadores, mqtt_client);
    } else {
        manage_topic_device(topic, payload, device);
    }
}