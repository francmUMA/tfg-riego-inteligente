use std::{borrow::{Borrow, BorrowMut}, thread::sleep};

use crate::{device::{actuadores, info::get_my_uuid, sensors}, utils::{mqtt_client, token::get_token}};
use mqtt::{client, topic, Message, QOS_0};
use paho_mqtt as mqtt;
use tokio::net::unix::pipe::Receiver;
use utils::topics::manage_msg;
use std::time::Duration;

// Definir módulos
mod device;
mod sends;
mod utils;


fn main() {
    // let ip = "192.168.1.148";
    // let port = "3000";
    // let device_id = 1;
    // loop {
    //     let time_now = utils::time::create_unix_timestamp();
    //     let res = sends::temperature::send_temperature(ip.to_string(), port.to_string(), device_id, time_now);
    //     if res {
    //         println!("Información enviada");
    //     } else {
    //         println!("Error al enviar la información");
    //     }
    //     std::thread::sleep(std::time::Duration::from_secs(60));
    // }

    // Inicilización de datos básicos
    let token = get_token("test@gmail.com".to_string(), "test_pass".to_string()); 
    if token.is_none() {
        println!("Error al obtener el token");
        return;
    }
    let device_uuid = get_my_uuid();
    let mut device = device::info::get_device_info(device_uuid.clone());
    if let Err(_) = device {
        println!("Error al obtener la información del dispositivo");
        return;
    }
    let mut device = device.unwrap();
    
    // Cliente de mqtt
    let ip = "192.168.1.137";
    let mut client = mqtt_client::MqttClient::new(ip.to_string(), device_uuid.clone());
    if client.is_none() {
        println!("Error al crear el cliente mqtt");
        return;
    }
    let mut client = client.unwrap();

    // Creación de los topics
    let mut topics: Vec<String> = Vec::new();

    // Devices topics
    topics.push(format!("devices/{}/update/lat", device_uuid));
    topics.push(format!("devices/{}/update/lng", device_uuid));
    topics.push(format!("devices/{}/update/area", device_uuid));
    topics.push(format!("devices/{}/update/name", device_uuid));

    // Sensors topics

    // Actuadores topics
    topics.push(format!("devices/{}/actuadores/new", device_uuid));
    let mut actuadores = actuadores::get_actuators_device(device_uuid.clone(), token.unwrap());
    if actuadores.is_none() {
        println!("Error al obtener los actuadores");
        return;
    } 
    
    let mut actuadores = actuadores.unwrap();
    for actuador in actuadores.iter() {
        topics.push(format!("devices/{}/actuadores/{}/update/status", device_uuid, actuador.get_id()));
        topics.push(format!("devices/{}/actuadores/{}/update/device_pin", device_uuid, actuador.get_id()));
    }
    

    // Suscripción a los topics
    for topic in topics {
        if !client.subscribe(topic.as_str()) {
            println!("Error al suscribirse al topic: {}", topic);
        }
    }

    // Mostrar mensajes recibidos
    use serde_json::Value;
    let receiver = client.start_consuming();
    client.subscribe("test/msg");
    loop {
        let msg = receiver.recv().unwrap();
        let topic = msg.topic();
        let payload = msg.payload_str();
        println!("Mensaje recibido en el topic: {}", topic);
        // manage_msg(topic, payload.as_ref(), &mut device, &mut actuadores,  &mut client);
    }
}
