use std::{fs, thread::sleep};
use std::sync::{Arc, Mutex};

use crate::{device::{actuadores, info::{register_device, Device}, sensors::{self, Sensor}}, utils::{config::update_config_file, mqtt_client}};
use mqtt::{client, topic};
use paho_mqtt as mqtt;
use serde_json::{de, json};
use utils::{config::{create_config_file, read_config_file}, topics::manage_msg};
use std::time::Duration;

// Definir módulos
mod device;
mod utils;


fn main() {
    // Comprobar si hay fichero de configuración
    let config = fs::metadata("config.json");
    if config.is_err() {
        while !create_config_file() {
            println!("Error al crear el archivo de configuración");
            sleep(Duration::from_secs(30));
        }
    }
    drop(config);       // Liberar memoria ya que no es necesaria


    let mut device_uuid = read_config_file("device_uuid".to_string());
    while device_uuid.is_none() {
        println!("Error al leer el UUID del dispositivo");
        sleep(Duration::from_secs(30));
        device_uuid = read_config_file("device_uuid".to_string());
    }
    let mut device_uuid = device_uuid.unwrap();

    // Creación de los topics de device
    let mut topics: Vec<String> = Vec::new();

    // Devices topics
    topics.push(format!("devices/{}/update/lat", device_uuid));
    topics.push(format!("devices/{}/update/lng", device_uuid));
    topics.push(format!("devices/{}/update/area", device_uuid));
    topics.push(format!("devices/{}/update/name", device_uuid));
    topics.push(format!("devices/{}/info", device_uuid));
    topics.push(format!("devices/{}/unregister", device_uuid));
    topics.push(format!("devices/{}/actuadores/info", device_uuid));
    topics.push(format!("devices/{}/sensors/info", device_uuid));

    // Crear cliente mqtt
    let mut mqtt_broker_ip = read_config_file("mqtt_broker".to_string());
    while mqtt_broker_ip.is_none() {
        println!("Error al leer la dirección del broker mqtt");
        sleep(Duration::from_secs(30));
        mqtt_broker_ip = read_config_file("mqtt_broker".to_string());
    }
    let mqtt_broker_ip = mqtt_broker_ip.unwrap();
    let mut client = mqtt_client::MqttClient::new(mqtt_broker_ip.clone(), "to-do".to_string());
    while client.is_none() {
        println!("Error al crear el cliente mqtt");
        sleep(Duration::from_secs(30));
        client = mqtt_client::MqttClient::new(mqtt_broker_ip.clone(), "to-do".to_string());
    }
    let mut client = Arc::new(Mutex::new(client.unwrap()));

    // Crear actuadores, sensores y device
    let actuadores: Arc<Mutex<Vec<actuadores::Actuador>>> = Arc::new(Mutex::new(Vec::new()));
    let sensors: Arc<Mutex<Vec<Sensor>>> = Arc::new(Mutex::new(Vec::new()));
    let device: Arc<Mutex<Device>> = Arc::new(Mutex::new(Device::initialize(device_uuid.clone())));

    // Suscribirse a los topics
    for topic in topics {
        while !client.lock().unwrap().subscribe(topic.as_str()) {
            println!("Error al suscribirse al topic: {}", topic);
            sleep(Duration::from_secs(30));
        }
    }

    // Se crea el hilo de recepción
    use std::thread;

    let actuadores_receiver = Arc::clone(&actuadores);
    let sensors_receiver = Arc::clone(&sensors);
    let device_receiver = Arc::clone(&device);
    let client_receiver = Arc::clone(&client);

    thread::spawn(move || {
        let mut receiver = client_receiver.lock().unwrap().start_consuming();
        loop {
            let msg = receiver.recv().unwrap().unwrap();
            let topic = msg.topic();
            let payload = msg.payload_str();
            println!("Mensaje recibido en el topic: {}", topic);
            manage_msg(topic, payload.as_ref(), 
                    &mut device_receiver.lock().unwrap(), 
                &mut actuadores_receiver.lock().unwrap(),
                   &mut sensors_receiver.lock().unwrap(), 
               &mut client_receiver.lock().unwrap()
            );
        }
    });

    let client_publisher = Arc::clone(&client);
    let device_uuid_clone = device_uuid.clone();
    let sensors_publisher = Arc::clone(&sensors);
    let actuadores_publisher = Arc::clone(&actuadores);

    // Hilo de publicación
    thread::spawn(move || {
        loop {
            //let time_now = utils::time::create_unix_timestamp();
            for sensor in sensors_publisher.lock().unwrap().iter_mut() {
                let time_now = utils::time::create_unix_timestamp();
                let value = sensor.read();
                if value.is_none() {
                    println!("Error al leer el sensor: {}", sensor.get_id());
                    continue;
                }
                let value = value.unwrap();
                let payload = json!({
                    "time": time_now,
                    "value": value
                });
                let topic = format!("devices/{}/sensors/{}/value", device_uuid_clone, sensor.get_id());
                if !client_publisher.lock().unwrap().publish(topic.as_str(), payload.to_string().as_str()) {
                    println!("Error al publicar el mensaje");
                }
            }
            std::thread::sleep(std::time::Duration::from_secs(30));
        }
    });

    loop {
        sleep(Duration::from_secs(1));
    }


    // // Sensors topics
    // topics.push(format!("devices/{}/sensors/new", device_uuid));
    // topics.push(format!("devices/{}/sensors/delete", device_uuid));

    // // Actuadores topics
    // topics.push(format!("devices/{}/actuadores/new", device_uuid));
    // topics.push(format!("devices/{}/actuadores/delete", device_uuid));
}
