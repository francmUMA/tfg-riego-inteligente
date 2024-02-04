// Definir módulos
mod device;
mod sends;
mod utils;


fn main() {
    let ip = "192.168.1.139";
    let port = "3000";
    let device_id = 1;
    loop {
        let res = sends::temperature::send_temperature(ip.to_string(), port.to_string(), device_id);
        let get_time_now = utils::time::create_unix_timestamp();
        println!("Tiempo actual: {}", get_time_now);
        if res {
            println!("Información enviada");
        } else {
            println!("Error al enviar la información");
        }
        std::thread::sleep(std::time::Duration::from_secs(60));
    }
}
