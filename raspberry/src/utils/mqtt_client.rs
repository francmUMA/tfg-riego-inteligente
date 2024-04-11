use mqtt::{Message, Receiver};
use paho_mqtt as mqtt;
use std::time::Duration;

use crate::device;

pub struct MqttClient {
    client: mqtt::Client,
    topics: Vec<String>
}

impl MqttClient {
    pub fn new(ip: String, device_uuid: String) -> Option<MqttClient> {
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
            return None;
        }
        let mut client = client.unwrap();
        if let Err(_) = client.connect(con_opts) {
            println!("No se ha podido conectar");
            return None;
        }
        Some(MqttClient {
            client,
            topics: Vec::new()
        })
    }

    pub fn subscribe(&mut self, topic: &str) -> bool {
        if let Err(_) = self.client.subscribe(topic, mqtt::QOS_0) {
            println!("No se ha podido suscribir al topic: {}", topic);
            return false;
        }
        self.topics.push(topic.to_string());
        println!("Suscrito al topic: {}", topic);
        true
    }

    pub fn unsubscribe(&mut self, topic: &str) -> bool {
        let index = self.topics.iter().position(|t| t == topic);
        if index.is_none() {
            println!("No se ha podido desuscribir al topic: {}", topic);
            return false;
        }
        self.topics.remove(index.unwrap());
        if let Err(_) = self.client.unsubscribe(topic) {
            println!("No se ha podido desuscribir al topic: {}", topic);
            return false;
        }
        println!("Desuscrito al topic: {}", topic);
        true
    }

    pub fn get_topics(&self) -> &Vec<String> {
        &self.topics
    }

    pub fn start_consuming(&self) -> Receiver<Option<Message>> {
        self.client.start_consuming()
    }

    pub fn publish(&self, topic: &str, payload: &str) -> bool {
        let msg = mqtt::Message::new(topic, payload, mqtt::QOS_0);
        if let Err(_) = self.client.publish(msg) {
            println!("No se ha podido publicar el mensaje");
            return false;
        }
        println!("Mensaje publicado en el topic: {}", topic);
        true
    }
}