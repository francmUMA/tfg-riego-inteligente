use std::borrow::{Borrow, BorrowMut};

use crate::{device::{self, actuadores::{self, Actuador}, info::Device}, sensors::{self, Sensor}, utils::time::create_unix_timestamp};
use mqtt::{client, QOS_0};
use serde_json::{de, json, to_string, Value};
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
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": sensor.get_device(),
            "deviceName": "---",
            "logcode": 3311,
            "sensorCode": sensor.get_id(),
            "timestamp": timestamp,
            "description": format!("Sensor añadido",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
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
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": sensor.get_device(),
            "deviceName": "---",
            "logcode": 3321,
            "timestamp": timestamp,
            "description": format!("Sensor eliminado con id {}", sensor.get_id()),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
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
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": sensor.get_device(),
                        "deviceName": "---",
                        "logcode": 2201,
                        "sensorCode": sensor.get_id(),
                        "timestamp": timestamp,
                        "description": format!("Pin cambiado",),
                    });
                    mqtt_client.publish("logs", log_data.to_string().as_str());
                } else {
                    println!("Pin no válido");
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": sensor.get_device(),
                        "deviceName": "---",
                        "logcode": 2209,
                        "sensorCode": sensor.get_id(),
                        "timestamp": timestamp,
                        "description": format!("Pin no válido",),
                    });
                    mqtt_client.publish("logs", log_data.to_string().as_str());
                }
            }
        } else {
            println!("No se ha encontrado el sensor");
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": topic_split[1],
                "deviceName": "---",
                "logcode": 3239,
                "timestamp": timestamp,
                "description": format!("No se ha encontrado el sensor con id {}", sensor_id),
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
        }
    }
}

fn suscribe_sensor_topics(sensor_id: String, device_id: String, mqtt_client: &mut MqttClient) -> bool{
    if !mqtt_client.subscribe(format!("devices/{}/sensores/{}/update/device_pin", device_id, sensor_id).as_str()){
        println!("No se ha podido suscribir al topic de device_pin del sensor con id {}", sensor_id);
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": device_id,
            "deviceName": "---",
            "logcode": 3419,
            "timestamp": timestamp,
            "description": format!("No se ha podido suscribir al topic de device_pin del sensor",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
        return false;
    }
    true
}

fn unsubscribe_sensor_topics(sensor: Sensor, mqtt_client: &mut MqttClient){
    if !mqtt_client.unsubscribe(format!("devices/{}/sensores/{}/update/device_pin", sensor.get_device().clone(), sensor.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de device_pin del sensor con id {}", sensor.get_id());
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": sensor.get_device(),
            "deviceName": "---",
            "logcode": 3419,
            "timestamp": timestamp,
            "description": format!("No se ha podido desuscribir al topic de device_pin",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
    }
}

//------------------------------------- ACTUADORES --------------------------------------------------------------------------------------
fn suscribe_actuador_topics(actuador_id: String, device_id: String, mqtt_client: &mut MqttClient) -> bool{
    if !mqtt_client.subscribe(format!("devices/{}/actuadores/{}/update/status", device_id, actuador_id).as_str()){
        println!("No se ha podido suscribir al topic de status del actuador con id {}", actuador_id);
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": device_id,
            "deviceName": "---",
            "logcode": 3419,
            "actuadorCode": actuador_id,
            "timestamp": timestamp,
            "description": format!("No se ha podido suscribir al topic de status del actuador",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
        return false;
    }

    if !mqtt_client.subscribe(format!("devices/{}/actuadores/{}/update/device_pin", device_id, actuador_id).as_str()){
        println!("No se ha podido suscribir al topic de device_pin del actuador con id {}", actuador_id);
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": device_id,
            "deviceName": "---",
            "logcode": 3419,
            "actuadorCode": actuador_id,
            "timestamp": timestamp,
            "description": format!("No se ha podido suscribir al topic de device_pin del actuador",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
        return false;
    }

    true
}

fn unsuscribe_actuador_topics(actuador: Actuador, mqtt_client: &mut MqttClient){
    if !mqtt_client.unsubscribe(format!("devices/{}/actuadores/{}/update/status", actuador.get_device(), actuador.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de status del actuador con id {}", actuador.get_id());
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": actuador.get_device(),
            "deviceName": "---",
            "logcode": 3419,
            "timestamp": timestamp,
            "description": format!("No se ha podido desuscribir de un topic",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
    }

    if !mqtt_client.unsubscribe(format!("devices/{}/actuadores/{}/update/device_pin", actuador.get_device(), actuador.get_id()).as_str()){
        println!("No se ha podido desuscribir al topic de device_pin del actuador con id {}", actuador.get_id());
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": actuador.get_device(),
            "deviceName": "---",
            "logcode": 3419,
            "timestamp": timestamp,
            "description": format!("No se ha podido desuscribir de un topic",),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
    }
}

fn manage_topic_actuadores(device: &mut Device, topic: &str, payload: &str, actuadores: &mut Vec<Actuador>, mqtt_client: &mut MqttClient){
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
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": device.get_id(),
            "deviceName": device.get_name(),
            "logcode": 3311,
            "actuadorCode": actuador.get_id(),
            "timestamp": timestamp,
            "description": format!("Se ha añadido el actuador con id {}", actuador.get_id()),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
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
        let timestamp = create_unix_timestamp();
        let log_data = json!({
            "deviceCode": device.get_id(),
            "deviceName": device.get_name(),
            "logcode": 3321,
            "timestamp": timestamp,
            "description": format!("Se ha eliminado el actuador con id {}", actuador.get_id()),
        });
        mqtt_client.publish("logs", log_data.to_string().as_str());
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
                        let timestamp = create_unix_timestamp();
                        let log_data = json!({
                            "deviceCode": device.get_id(),
                            "deviceName": device.get_name(),
                            "logcode": 1101,
                            "actuadorCode": actuador.get_id(),
                            "timestamp": timestamp,
                            "description": format!("Se ha abierto el actuador con id {}", actuador.get_id()),
                        });
                        mqtt_client.publish("logs", log_data.to_string().as_str());
                    }
                    "0" => {
                        actuador.close();
                        println!("Cerrando el actuador con id {}", actuador.get_id());
                        let timestamp = create_unix_timestamp();
                        let log_data = json!({
                            "deviceCode": device.get_id(),
                            "deviceName": device.get_name(),
                            "logcode": 1101,
                            "actuadorCode": actuador.get_id(),
                            "timestamp": timestamp,
                            "description": format!("Se ha cerrado el actuador con id {}", actuador.get_id()),
                        });
                        mqtt_client.publish("logs", log_data.to_string().as_str());
                    }
                    _ => {
                        println!("Payload no válido");
                        let timestamp = create_unix_timestamp();
                        let log_data = json!({
                            "deviceCode": device.get_id(),
                            "deviceName": device.get_name(),
                            "logcode": 1109,
                            "actuadorCode": actuador.get_id(),
                            "timestamp": timestamp,
                            "description": format!("No se ha podido actuar sobre el actuador con id {}", actuador.get_id()),
                        });
                        mqtt_client.publish("logs", log_data.to_string().as_str());
                    }
                        
                }
            } else if topic.contains("update") && topic.contains("device_pin"){
                let pin = payload.parse::<u8>().unwrap();
                if pin > 0 && pin < 28 {
                    actuador.change_pin(pin);
                    println!("Cambiando el pin del actuador con id {} a {}", actuador.get_id(), pin);
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": actuador.get_device(),
                        "deviceName": device.get_name(),
                        "logcode": 1201,
                        "actuadorCode": actuador.get_id(),
                        "timestamp": timestamp,
                        "description": format!("Se ha cambiado el pin del actuador con id {}", actuador.get_id()),
                    });
                    mqtt_client.publish("logs", log_data.to_string().as_str());
                } else {
                    println!("Pin no válido");
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": actuador.get_device(),
                        "deviceName": device.get_name(),
                        "logcode": 1209,
                        "actuadorCode": actuador.get_id(),
                        "timestamp": timestamp,
                        "description": format!("No se ha podido cambiar el pin del actuador con id {}", actuador.get_id()),
                    });
                    mqtt_client.publish("logs", log_data.to_string().as_str());
                }
            }
        } else {
            println!("No se ha encontrado el actuador");
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3239,
                "timestamp": timestamp,
                "description": format!("No se ha encontrado el actuador con id {}", actuador_id),
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
        }
    }
    
}

//------------------------------------- DEVICE -------------------------------------------------------------------------------------------
fn manage_topic_device(topic: &str, payload: &str, device: &mut Device, mqtt_client: &mut MqttClient){
    if topic.contains("info") {
        let device_json: Value = serde_json::from_str(payload).unwrap();
        device.set_name(device_json["name"].as_str().unwrap().to_string());
        device.set_latitud(device_json["Latitud"].as_f64());
        device.set_longitud(device_json["Longitud"].as_f64());
        device.set_area(device_json["area"].as_str());
        device.set_available(1);
        device.set_usuario(device_json["Usuario"].as_str().unwrap().to_string());
        device.set_ip(device_json["ip"].as_str().unwrap().to_string());
        println!("Información del dispositivo obtenida -> {}", device.get_name());
        let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3121,
                "timestamp": timestamp,
                "description": format!("Se ha obtenido la información del dispositivo")
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
    } else if topic.contains("/register"){
        if device.get_user() == "00000000A" {
            device.set_usuario(payload.to_string());
            println!("Dispositivo dado de alta a usuario {}", payload);
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3101,
                "timestamp": timestamp,
                "description": format!("Dispositivo dado de alta a usuario {}", payload)
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
        } else {
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3109,
                "timestamp": timestamp,
                "description": format!("El dispositivo ya está dado de alta")
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
            println!("El dispositivo ya está dado de alta");
        }
    } else if topic.contains("/unregister"){
        if payload != device.get_user() {
            println!("El usuario no coincide");
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3119,
                "timestamp": timestamp,
                "description": format!("El usuario no coincide")
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
            return
        }
        device.set_usuario("00000000A".to_string());
        println!("Dispositivo dado de baja");
        let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device.get_id(),
                "deviceName": device.get_name(),
                "logcode": 3111,
                "timestamp": timestamp,
                "description": format!("Dispositivo dado de baja")
            });
            mqtt_client.publish("logs", log_data.to_string().as_str());
    } else if topic.contains("/healthcheck"){
        mqtt_client.publish(format!("devices/{}/available", device.get_id()).as_str(), "1");
    }
}

//------------------------------------- MANAGE MSG ---------------------------------------------------------------------------------------
pub fn manage_msg(topic: &str, payload: &str, device: &mut Device, actuadores: &mut Vec<Actuador>, sensors: &mut Vec<Sensor>, mqtt_client: &mut MqttClient){
    if topic.contains("actuadores") {
        manage_topic_actuadores(device, topic, payload, actuadores, mqtt_client);
    } else if topic.contains("sensors") {
        manage_topic_sensors(topic, sensors, payload, mqtt_client);
    } else if topic.contains("server/available") {
        for actuador in actuadores.iter() {
            actuador.clean_pin();
        }
        actuadores.clear();
        for sensor in sensors.iter() {
            sensor.clean_pin();
        }
        sensors.clear();
        mqtt_client.publish("devices/start", device.get_id().as_str());
    } 
    else {
        manage_topic_device(topic, payload, device, mqtt_client);
    }
}