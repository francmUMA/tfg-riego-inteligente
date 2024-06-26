use core::time;
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

use chrono::{naive, DateTime, Datelike, Local, NaiveTime, TimeZone, Timelike, Utc, Weekday};

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
    let timers_list: Arc<Mutex<Vec<TimerWrapper>>> = Arc::new(Mutex::new(Vec::new()));
    let timers_list_receiver: Arc<Mutex<Vec<TimerWrapper>>> = Arc::clone(&timers_list);

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
                    &mut timers_list_receiver.lock().unwrap(),
               &mut client_receiver.lock().unwrap()
            );
        }
    });

    let client_publisher = Arc::clone(&client);
    let device_uuid_clone = device_uuid.clone();
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
            for actuador in actuadores_publisher.lock().unwrap().iter_mut() {
                let timestamp = create_unix_timestamp();
                let data = actuador.get_current_flow();
                if data == -1 {
                    println!("Error al obtener el flujo del actuador");
                    let timestamp = create_unix_timestamp();
                    let log_data = json!({
                        "deviceCode": device_uuid_clone,
                        "deviceName": "NC",
                        "logcode": 3429,
                        "timestamp": timestamp,
                        "description": format!("Error al obtener el flujo del actuador",),
                    });
                    client_publisher.lock().unwrap().publish("logs", log_data.to_string().as_str());
                    continue;
                } else {
                    let payload = json!({
                        "time": timestamp,
                        "value": data
                    });
                    client_publisher.lock().unwrap().publish(format!("devices/{}/actuadores/{}/flow", device_uuid_clone, actuador.get_id()).as_str(), payload.to_string().as_str());
                }
            }
            std::thread::sleep(std::time::Duration::from_secs(30));
        }
    });

    // Hilo de gestión de actuadores
    let actuadores_manager = Arc::clone(&actuadores);
    let client_manager = Arc::clone(&client);
    let programs_manager = Arc::clone(&programs);
    let (tx, rx): (Sender<String>, Receiver<String>) = std::sync::mpsc::channel();
    
    let timers_list_clone = Arc::clone(&timers_list);

    thread::spawn( move || {
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async move{
            loop {
                let now = create_unix_timestamp();
                while actuadores_manager.lock().unwrap().is_empty(){
                    sleep(Duration::from_secs(1));
                }
                println!("Gestionando timers");
                for actuator in actuadores_manager.lock().unwrap().iter_mut() {
                    println!("Gestionando actuador: {}", actuator.get_id());
                    if actuator.get_status() == 1 {
                        println!("El actuador {} ya está activo", actuator.get_id());
                        continue;
                    }
                    // Hay que comprobar si hay algún timer para ese actuador y modificarlo si es necesario
                    let timer_index = timers_list.lock().unwrap().iter().position(|t| t.get_actuador_id() == actuator.get_id());
                    if let Some(index) = timer_index {
                        let mut timers = timers_list.lock().unwrap();
                        if timers[index].is_timer_to_resume() {
                            println!("Reanudando timer");
                            timers[index].resume_timer();
                            actuadores_manager.lock().unwrap().iter_mut().find(|a| a.get_id() == actuator.get_id()).unwrap().open();
                            continue;
                        } 
                    }
                    
                    if actuator.get_active_program().is_none() {
                        println!("No hay programa activo en el actuador {}", actuator.get_id());
                        continue;
                    }
                    let programs = programs_manager.lock().unwrap();
                    let program = programs.iter().find(|p| p.get_id() == actuator.get_active_program().unwrap());
                    if program.is_none() {
                        println!("Error al obtener el programa");
                        continue;
                    }
                    let program = program.unwrap();
                    if !program.irrigate_now(now){
                        println!("No se debe regar hoy");
                        continue;
                    }

                    let timer = TimerWrapper::new(uuid::Uuid::new_v4().to_string(), actuator.get_id());
                    let id = timer.get_id();
                    timers_list.lock().unwrap().push(timer);
                    let tx_clone = tx.clone();
                    let naive_start_time = NaiveTime::from_hms_opt(0, 0, 0).unwrap() + 
                                                                        chrono::Duration::from_std(Duration::from_millis(program.get_start_time() + 3600*1000)).unwrap();
                    let start_time_date = Local::now().date().and_time(naive_start_time).unwrap();
                    let end_time_date = start_time_date + chrono::Duration::from_std(Duration::from_secs(program.get_duration())).unwrap();
                    let datetime = Local.timestamp(now as i64, 0);
                    let duration = end_time_date.timestamp() - datetime.timestamp();
                    println!("Duración: {}", duration);
                    tokio::spawn(async move {
                        init_timer(id,tx_clone, duration as u64).await;
                    });
                    actuator.open();
                }
                sleep(Duration::from_secs(30));
            }
        });
    });

    let actuadores_receiver = Arc::clone(&actuadores);

    thread::spawn(move || {
        let receiver = rx;
        loop {
            let msg = receiver.recv().unwrap();
            let timer_index = timers_list_clone.lock().unwrap().iter().position(|t| t.get_id() == msg);
            if timer_index.is_none() {
                println!("Error al obtener el índice del timer");
                continue;
            }
            let timer_index = timer_index.unwrap();
            let timer = timers_list_clone.lock().unwrap().remove(timer_index);
            println!("Timer finalizado: {}", timer.get_id());
            if timer.is_stopped() {
                println!("Ignorando el timer...");
                continue;
            }
            if let Some(actuator) = actuadores_receiver.lock().unwrap().iter_mut().find(|a| a.get_id() == timer.get_actuador_id()) {
                actuator.close();
                println!("Actuador cerrado: {}", actuator.get_id());
            } else {
                println!("No se ha encontrado el actuador");
                continue;
            }
        }
    });
    
    loop {
        sleep(Duration::from_secs(1));
    }
}
