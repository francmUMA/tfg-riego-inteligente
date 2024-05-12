use std::collections::BinaryHeap;
use std::sync::mpsc::{Receiver, Sender};
use std::{fs, thread::sleep};
use std::sync::{Arc, Mutex};

use crate::device::temperature::get_temperature;
use crate::utils::programs;
use crate::utils::time::{create_unix_timestamp, init_timer, TimerWrapper};
use crate::{device::{actuadores, info::{register_device, Device}, sensors::{self, Sensor}}, utils::{config::update_config_file, mqtt_client}};
use mqtt::{client, topic};
use paho_mqtt as mqtt;
use serde_json::{de, json};
use utils::{config::{create_config_file, read_config_file}, topics::manage_msg};
use uuid::timestamp;
use std::time::Duration;
use tokio::time::Instant;
use timer::Timer;

// Definir módulos
mod device;
mod utils;


fn main() {
    // Comprobar si hay fichero de configuración
    let config = fs::metadata("config.json");
    if config.is_err() {
        while !create_config_file() {
            sleep(Duration::from_secs(30));
            return;
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
    // topics.push(format!("devices/{}/update/lat", device_uuid));
    // topics.push(format!("devices/{}/update/lng", device_uuid));
    // topics.push(format!("devices/{}/update/area", device_uuid));
    topics.push(format!("server/available"));
    topics.push(format!("devices/{}/update/name", device_uuid));
    topics.push(format!("devices/{}/info", device_uuid));
    topics.push(format!("devices/{}/register", device_uuid));
    topics.push(format!("devices/{}/unregister", device_uuid));
    topics.push(format!("devices/healthcheck"));
    topics.push(format!("devices/{}/actuadores/new", device_uuid));
    topics.push(format!("devices/{}/sensors/new", device_uuid));
    topics.push(format!("devices/{}/programs/new", device_uuid));
    topics.push(format!("devices/{}/actuadores/delete", device_uuid));
    topics.push(format!("devices/{}/sensors/delete", device_uuid));
    topics.push(format!("devices/{}/programs/delete", device_uuid));

    // Crear cliente mqtt
    let mut mqtt_broker_ip = read_config_file("mqtt_broker".to_string());
    while mqtt_broker_ip.is_none() {
        println!("Error al leer la dirección del broker mqtt");
        sleep(Duration::from_secs(30));
        mqtt_broker_ip = read_config_file("mqtt_broker".to_string());
    }
    let mqtt_broker_ip = mqtt_broker_ip.unwrap();
    println!("Broker IP: {}", mqtt_broker_ip);
    let mut client = mqtt_client::MqttClient::new(mqtt_broker_ip.clone(), "device_uuid".to_string());
    while client.is_none() {
        println!("Error al crear el cliente mqtt");
        sleep(Duration::from_secs(30));
        client = mqtt_client::MqttClient::new(mqtt_broker_ip.clone(), "device_uuid".to_string());
    }
    let mut client = Arc::new(Mutex::new(client.unwrap()));

    // Crear actuadores, sensores, device y programas
    let actuadores: Arc<Mutex<Vec<actuadores::Actuador>>> = Arc::new(Mutex::new(Vec::new()));
    let sensors: Arc<Mutex<Vec<Sensor>>> = Arc::new(Mutex::new(Vec::new()));
    let device: Arc<Mutex<Device>> = Arc::new(Mutex::new(Device::initialize(device_uuid.clone())));
    let programs: Arc<Mutex<Vec<programs::Program>>> = Arc::new(Mutex::new(Vec::new()));

    // Suscribirse a los topics
    for topic in topics {
        while !client.lock().unwrap().subscribe(topic.as_str()) {
            println!("Error al suscribirse al topic: {}", topic);
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device_uuid,
                "deviceName": "NC",
                "logcode": 3419,
                "timestamp": timestamp,
                "description": format!("Error al suscribirse a un topic de inicio",),
            });
            client.lock().unwrap().publish("logs", log_data.to_string().as_str());
            sleep(Duration::from_secs(30));
        }
    }

    // Se crea el hilo de recepción
    use std::thread;

    let actuadores_receiver = Arc::clone(&actuadores);
    let sensors_receiver = Arc::clone(&sensors);
    let device_receiver = Arc::clone(&device);
    let client_receiver = Arc::clone(&client);
    let programs_receiver = Arc::clone(&programs);

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
                    &mut programs_receiver.lock().unwrap(),
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
        // Publica en /devices/id/start un 1 para que le mande su información
        let topic = format!("devices/start");
        while !client_publisher.lock().unwrap().publish(topic.as_str(), device_uuid_clone.clone().as_str()) {
            println!("Error al publicar el mensaje de inicio");
            let timestamp = create_unix_timestamp();
            let log_data = json!({
                "deviceCode": device_uuid_clone,
                "deviceName": "NC",
                "logcode": 3429,
                "timestamp": timestamp,
                "description": format!("Error al publicar el mensaje de inicio",),
            });
            client_publisher.lock().unwrap().publish("logs", log_data.to_string().as_str());
            sleep(Duration::from_secs(30));
        }
        loop {
            for sensor in sensors_publisher.lock().unwrap().iter_mut() {
                let time_now = utils::time::create_unix_timestamp();
                let value = sensor.read();
                if value.is_none() {
                    println!("Error al leer el sensor: {}", sensor.get_id());
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": sensor.get_device(),
                        "deviceName": "NC",
                        "sensorCode": sensor.get_id(),
                        "logcode": 2109,
                        "timestamp": timestamp,
                        "description": format!("Error de lectura",),
                    });
                    client_publisher.lock().unwrap().publish("logs", log_data.to_string().as_str());
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
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": device_uuid_clone,
                        "deviceName": "NC",
                        "sensorCode": sensor.get_id(),
                        "logcode": 3429,
                        "timestamp": timestamp,
                        "description": format!("Error al publicar el mensaje del valor del sensor",),
                    });
                    client_publisher.lock().unwrap().publish("logs", log_data.to_string().as_str());
                }
            }
            let temp_val = get_temperature();
            if (temp_val > -1) {
                let timestamp = create_unix_timestamp();
                let payload = json!({
                    "time": timestamp,
                    "value": temp_val
                });
                client_publisher.lock().unwrap().publish(format!("devices/{}/temperature", device_uuid_clone).as_str(), payload.to_string().as_str());
            } else {
                println!("Error al obtener la temperatura");
                let timestamp = create_unix_timestamp();
                let log_data = json!({
                    "deviceCode": device_uuid_clone,
                    "deviceName": "NC",
                    "logcode": 3429,
                    "timestamp": timestamp,
                    "description": format!("Error al obtener la temperatura",),
                });
                client_publisher.lock().unwrap().publish("logs", log_data.to_string().as_str());
            }
            std::thread::sleep(std::time::Duration::from_secs(30));
        }
    });

    // Hilo de gestión de actuadores
    let actuadores_manager = Arc::clone(&actuadores);
    let client_manager = Arc::clone(&client);
    let programs_manager = Arc::clone(&programs);
    let (tx, rx): (Sender<String>, Receiver<String>) = std::sync::mpsc::channel();
    let timers_list: Arc<Mutex<Vec<TimerWrapper>>> = Arc::new(Mutex::new(Vec::new()));
    let timers_list_clone = Arc::clone(&timers_list);

    thread::spawn( move || {
        loop {
            let time_now = Instant::now();
            let rt = tokio::runtime::Runtime::new().unwrap();
            rt.block_on(async {
                let mut actuadores = actuadores_manager.lock().unwrap();
                for actuador in actuadores.iter_mut(){
                    println!("Comprobando programa de actuador: {}", actuador.get_id());
                    if actuador.get_active_program().is_none() {
                        println!("No hay programa activo en el actuador: {}", actuador.get_id());
                        continue;
                    }
                    let active_program = actuador.get_active_program().unwrap();
                    let programs_list = programs_manager.lock().unwrap();
                    let program = programs_list.iter().find(|p| p.get_id() == active_program);
                    if program.is_none(){
                        continue;
                    }
                    let program = program.unwrap();
                    if !program.irrigate_now(time_now) {
                        continue;
                    }
                    tokio::spawn(async move {
                        init_timer(actuador.get_id()).await;
                    });
                    println!("Post init_timer");
                }
            });
            sleep(Duration::from_secs(5));
        }
    });

    thread::spawn(move || {
        let mut receiver = rx;
        loop {
            let msg = receiver.recv().unwrap();
            println!("Mensaje recibido: {}", msg);
        }
    });
    

    loop {
        sleep(Duration::from_secs(1));
    }
}
