// Definir módulos
mod device;
mod sends;
mod utils;


fn main() {
    let ip = "192.168.1.133";
    let port = "3000";
    let device_id = 1;
    loop {
        let res = sends::temperature::send_temperature(ip.to_string(), port.to_string(), device_id);
        println!("Resultado: {:?}", res);
        std::thread::sleep(std::time::Duration::from_secs(5));
    }
}
