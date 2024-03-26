use std::thread::sleep;

use crate::{device::{actuadores, info::get_my_uuid, sensors}, utils::token::get_token};
use mqtt::{client, topic, QOS_0};
use paho_mqtt as mqtt;
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
    // use crate::device::info;
    // let token = get_token("test@gmail.com".to_string(), "test_pass".to_string()); 
    // if token.is_none() {
    //     println!("Error al obtener el token");
    //     return;
    // }
    // let uuid = get_my_uuid();
    // loop {
    //     let device = info::get_device_info(uuid.clone());
    //     if let Err(_) = device {
    //         println!("Error al obtener la información del dispositivo");
    //     } else {
    //         println!("Información del dispositivo obtenida");
    //     }

    //     let sensors = sensors::get_sensors_device(uuid.clone(), token.clone().unwrap());
    //     if let Err(_) = sensors {
    //         println!("Error al obtener la información de los sensores");
    //     } else if sensors.unwrap().len() == 0 {
    //         println!("No hay sensores disponibles");
    //     }

    //     let actuadores_wrapped = actuadores::get_actuators_device(uuid.clone(), token.clone().unwrap());
    //     if let None = actuadores_wrapped {
    //         println!("Error al obtener la información de los actuadores");
    //     } 
    //     let mut actuadores = actuadores_wrapped.unwrap();
    //     if actuadores.len() == 0 {
    //         println!("No hay actuadores disponibles");
    //     } else {
    //         println!("Status: {}", actuadores[0].get_status() == 0);
    //         if actuadores[0].get_status() == 0 {
    //             println!("Abriendo actuador");
    //             actuadores[0].open();
    //             println!("Status después de abrir: {}", actuadores[0].get_status());
    //         } else {
    //             println!("Cerrando actuador");
    //             actuadores[0].close();
    //         }
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
    
    // Cliente de mqtt
    let ip = "192.168.1.137";
    let client_id = format!("dev-{}", device_uuid);
    let uri = format!("tcp://{}:1883", ip);
    let opts = mqtt::CreateOptionsBuilder::new()
            .server_uri(uri)
            .client_id(client_id)
            .finalize();
    let con_opts = mqtt::ConnectOptionsBuilder::new()
            .keep_alive_interval(Duration::from_secs(20))
            .clean_session(true)
            .finalize();
    let client = paho_mqtt::Client::new(opts);
    if let Err(_) = client {
        println!("No se ha podido crear el cliente");
    }
    let client = client.unwrap();
    if let Err(_) = client.connect(con_opts) {
        println!("No se ha podido conectar");
    }
    let data = client.start_consuming();

    // Creación de los topics
    let mut topics: Vec<String> = Vec::new();

    // Devices topics
    topics.push(format!("devices/{}/update/lat", device_uuid));
    topics.push(format!("devices/{}/update/lng", device_uuid));
    topics.push(format!("devices/{}/update/area", device_uuid));
    topics.push(format!("devices/{}/update/name", device_uuid));

    // Sensors topics

    // Actuadores topics
    let mut actuadores = actuadores::get_actuators_device(device_uuid.clone(), token.unwrap());
    if actuadores.is_none() {
        println!("Error al obtener los actuadores");
    } else {
        let actuadores = actuadores.unwrap();
        for actuador in actuadores {
            topics.push(format!("devices/{}/actuadores/{}/update/status", device_uuid, actuador.get_id()));
        }
    }

    // Suscripción a los topics
    for topic in topics {
        if let Err(_) = client.subscribe(&topic, QOS_0) {
            println!("No se ha podido suscribir al topic: {}", topic);
        }
        println!("Suscrito al topic: {}", topic);
    }

    // // Mostrar mensajes recibidos
    // loop {
    //     let msg = data.recv().unwrap().unwrap();
    //     let topic = msg.topic();
    //     let payload = msg.payload_str();
    //     println!("Topic: {} \nPayload: {}", topic, payload);
    // }


}
