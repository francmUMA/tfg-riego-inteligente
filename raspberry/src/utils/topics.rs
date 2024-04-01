use std::borrow::{Borrow, BorrowMut};

use crate::{device::{actuadores::{self, Actuador}, info::Device}, sensors::{self, Sensor}};
use mqtt::{client, QOS_0};
use serde_json::{to_string, Value};
use paho_mqtt as mqtt;

use super::mqtt_client::MqttClient;

//------------------------------------- SENSORES ----------------------------------------------------------------------------------------
fn manage_topic_sensors(topic: &str, sensors: &mut Vec<Sensor>, payload: &str, mqtt_client: &mut MqttClient){
    if topic.contains("new"){
        let payload_json: Value = serde_json::from_str(payload).unwrap();
        let sensor = Sensor::new(
            payload_json["id"].as_str().unwrap().to_string(),
            payload_json["device"].as_str().unwrap().to_string(),
            payload_json["device_pin"].clone(),
            payload_json["type"].to_string(),
            payload_json["area"].clone(),
            payload_json["Latitud"].clone(),
            payload_json["Longitud"].clone(),
            payload_json["name"].as_str().unwrap().to_string(),
            payload_json["value"].clone(),
            payload_json["available"].as_u64().unwrap() as u8
        );
        println!("Sensor añadido: {} con id {}", sensor.get_name(), sensor.get_id());
        if !suscribe_sensor_topics(sensor.get_id().clone(), sensor.get_device().clone(), mqtt_client){
            return
        }
        sensors.push(sensor);
    } else if topic.contains("delete"){
        // Hay que eliminar el sensor cuyo id está en el payload
        for sensor in sensors.iter_mut(){
            sensor.clean_pin();
        }
        let index = sensors.iter().position(|sensor| sensor.get_id() == payload).unwrap();
        let sensor = sensors.remove(index);
        println!("Sensor eliminado: {} con id {}", sensor.get_name(), sensor.get_id());
        unsubscribe_sensor_topics(sensor, mqtt_client);
    } else {
        // Se obtiene el id del sensor
        let topic_split: Vec<&str> = topic.split("/").collect();
        let sensor_id = topic_split[3];

        // Se obtiene el sensor
        if let Some(sensor) = sensors.iter_mut().find(|sensor| sensor.get_id() == sensor_id) {
            // Hay que saber que es lo que se va a hacer con el sensor
            if topic.contains("update") && topic.contains("device_pin") {
                let pin = payload.parse::<u8>().unwrap();
                if pin > 0 && pin < 28 {
                    sensor.change_pin(pin);
                    println!("Cambiando el pin del sensor con id {} a {}", sensor.get_id(), pin);
                } else {
                    println!("Pin no válido");
                }
            }
        } else {
            println!("No se ha encontrado el sensor");
        }
    }
}

fn suscribe_sensor_topics(sensor_id: String, device_id: String, mqtt_client: &mut MqttClient) -> bool{
    if !mqtt_client.subscribe(format!("devices/{}/sensores/{}/update/device_pin", device_id, sensor_id).as_str()){
        println!("No se ha podido suscribir al topic de device_pin del sensor con id {}", sensor_id);
        return false;
    }
    true
}

fn unsubscribe_sensor_topics(sensor: Sensor, mqtt_client: &mut MqttClient){
    if !mqtt_client.unsubscribe(format!("devices/{}/sensores/{}/update/device_pin", sensor.get_device().clone(), sensor.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de device_pin del sensor con id {}", sensor.get_id());
    }
}

//------------------------------------- ACTUADORES --------------------------------------------------------------------------------------
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

//------------------------------------- DEVICE -------------------------------------------------------------------------------------------
fn manage_topic_device(topic: &str, payload: &str, device: &mut Device){
    println!("Topic de dispositivos");
}

//------------------------------------- MANAGE MSG ---------------------------------------------------------------------------------------
pub fn manage_msg(topic: &str, payload: &str, device: &mut Device, actuadores: &mut Vec<Actuador>, sensors: &mut Vec<Sensor>, mqtt_client: &mut MqttClient){
    if topic.contains("actuadores") {
        manage_topic_actuadores(topic, payload, actuadores, mqtt_client);
    } else if topic.contains("sensors") {
        manage_topic_sensors(topic, sensors, payload, mqtt_client);
    } else {
        manage_topic_device(topic, payload, device);
    }
}