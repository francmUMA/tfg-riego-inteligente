use crate::{device::{info::get_my_uuid, sensors}, utils::token::get_token};

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
    use crate::device::info;
    let token = get_token("test@gmail.com".to_string(), "test_pass".to_string()); 
    if token != None {
        println!("Token obtenido");
    } else {
        println!("Error al obtener el token");
    }
    // let uuid = get_my_uuid();
    // loop {
    //     let device = info::get_device_info(uuid.clone());
    //     if let Err(_) = device {
    //         println!("Error al obtener la información del dispositivo");
    //     } else {
    //         println!("Información del dispositivo obtenida");
    //     }
    //     let sensors = sensors::get_sensors_device(uuid.clone(), token.clone());
    //     if let Err(_) = sensors {
    //         println!("Error al obtener la información de los sensores");
    //     } else {
    //         println!("Sensor 1: {}", sensors.unwrap()[0].get_id());
    //     }
    //     std::thread::sleep(std::time::Duration::from_secs(60));
    // }
}
