use std::{borrow::{Borrow, BorrowMut}, thread::sleep};
use std::sync::{Arc, Mutex};

use crate::{device::{actuadores, info::{get_my_uuid, register_device}, sensors}, utils::{config::update_config_file, mqtt_client, token::get_token}};
use mqtt::{client, topic, Message, QOS_0};
use paho_mqtt as mqtt;
use serde_json::{de, json};
use tokio::net::unix::pipe::Receiver;
use utils::{config::{create_config_file, read_config_file}, topics::manage_msg};
use std::time::Duration;

// Definir módulos
mod device;
mod sends;
mod utils;


fn main() {
    // Comprobar si hay fichero de configuración
    let config = read_config_file("config.json".to_string());
    if config.is_none() {
        while !create_config_file() {
            println!("Error al crear el archivo de configuración");
        }
    }

    drop(config);       // Liberar memoria ya que no es necesaria

    // Crear cliente mqtt
    let mqtt_broker_ip: Option<String>;
    while mqtt_broker_ip = read_config_file("mqtt_broker".to_string()).is_none() {
        println!("Error al leer la dirección del broker mqtt");
    }

    let mut client = mqtt_client::MqttClient::new(mqtt_broker_ip.unwrap(), device_uuid.clone());
    while client.is_none() {
        println!("Error al crear el cliente mqtt");
        client = mqtt_client::MqttClient::new(mqtt_broker_ip.unwrap(), device_uuid.clone());
    }
    let mut client = Arc::new(Mutex::new(client.unwrap()));

    let device_uuid: Option<String>;
    while device_uuid = read_config_file("device_uuid".to_string()).is_none() {
        println!("Error al leer el UUID del dispositivo");
    }

    if device_uuid == "-" {
        println!("No se ha registrado el dispositivo, iniciando registro...");
        while !register_device(client.lock().unwrap()){
            println!("Error al registrar el dispositivo");
        }
    }


    // Inicilización de datos básicos
    // let token = get_token("test@gmail.com".to_string(), "test_pass".to_string()); 
    // if token.is_none() {
    //     println!("Error al obtener el token");
    //     return;
    // }
    // let device_uuid = get_my_uuid();
    // let mut device = device::info::get_device_info(device_uuid.clone());
    // if let Err(_) = device {
    //     println!("Error al obtener la información del dispositivo");
    //     return;
    // }
    // let mut device = Arc::new(Mutex::new(device.unwrap()));

    // // Creación de los topics
    // let mut topics: Vec<String> = Vec::new();

    // // Devices topics
    // topics.push(format!("devices/{}/update/lat", device_uuid));
    // topics.push(format!("devices/{}/update/lng", device_uuid));
    // topics.push(format!("devices/{}/update/area", device_uuid));
    // topics.push(format!("devices/{}/update/name", device_uuid));

    // // Sensors topics
    // topics.push(format!("devices/{}/sensors/new", device_uuid));
    // topics.push(format!("devices/{}/sensors/delete", device_uuid));

    // // Actuadores topics
    // topics.push(format!("devices/{}/actuadores/new", device_uuid));
    // topics.push(format!("devices/{}/actuadores/delete", device_uuid));

    // let mut actuadores = actuadores::get_actuators_device(device_uuid.clone(), token.clone().unwrap());
    // if actuadores.is_none() {
    //     println!("Error al obtener los actuadores");
    //     return;
    // } 
    
    // let mut actuadores =Arc::new(Mutex::new(actuadores.unwrap()));
    // for actuador in actuadores.lock().unwrap().iter() {
    //     topics.push(format!("devices/{}/actuadores/{}/update/status", device_uuid, actuador.get_id()));
    //     topics.push(format!("devices/{}/actuadores/{}/update/device_pin", device_uuid, actuador.get_id()));
    // }

    // let mut sensors = sensors::get_sensors_device(device_uuid.clone(), token.clone().unwrap());
    // if sensors.is_err() {
    //     println!("Error al obtener los sensores");
    //     return;
    // }

    // let mut sensors = Arc::new(Mutex::new(sensors.unwrap()));
    // for sensor in sensors.lock().unwrap().iter() {
    //     topics.push(format!("devices/{}/sensors/{}/update/device_pin", device_uuid, sensor.get_id()));
    // }

    // // Suscripción a los topics
    // for topic in topics {
    //     if !client.lock().unwrap().subscribe(topic.as_str()) {
    //         println!("Error al suscribirse al topic: {}", topic);
    //     }
    // }

    // use serde_json::Value;
    // use std::thread;

    // let actuadores_receiver = Arc::clone(&actuadores);
    // let sensors_receiver = Arc::clone(&sensors);
    // let device_receiver = Arc::clone(&device);
    // let client_receiver = Arc::clone(&client);

    // // Hilo de recepción
    // thread::spawn(move || {
    //     let mut receiver = client_receiver.lock().unwrap().start_consuming();
    //     loop {
    //         let msg = receiver.recv().unwrap().unwrap();
    //         let topic = msg.topic();
    //         let payload = msg.payload_str();
    //         println!("Mensaje recibido en el topic: {}", topic);
    //         manage_msg(topic, payload.as_ref(), 
    //                 &mut device_receiver.lock().unwrap(), 
    //             &mut actuadores_receiver.lock().unwrap(),
    //                &mut sensors_receiver.lock().unwrap(), 
    //            &mut client_receiver.lock().unwrap()
    //         );
    //     }
    // });

    // let client_publisher = Arc::clone(&client);
    // let device_uuid_clone = device_uuid.clone();
    // let sensors_publisher = Arc::clone(&sensors);
    // let actuadores_publisher = Arc::clone(&actuadores);

    // // Hilo de publicación
    // thread::spawn(move || {
    //     loop {
    //         //let time_now = utils::time::create_unix_timestamp();
    //         for sensor in sensors_publisher.lock().unwrap().iter_mut() {
    //             let time_now = utils::time::create_unix_timestamp();
    //             let value = sensor.read();
    //             if value.is_none() {
    //                 println!("Error al leer el sensor: {}", sensor.get_id());
    //                 continue;
    //             }
    //             let value = value.unwrap();
    //             let payload = json!({
    //                 "time": time_now,
    //                 "value": value
    //             });
    //             let topic = format!("devices/{}/sensors/{}/value", device_uuid_clone, sensor.get_id());
    //             if !client_publisher.lock().unwrap().publish(topic.as_str(), payload.to_string().as_str()) {
    //                 println!("Error al publicar el mensaje");
    //             }
    //         }
    //         std::thread::sleep(std::time::Duration::from_secs(30));
    //     }
    // });

    // loop {
    //     sleep(Duration::from_secs(1));
    // }
}
