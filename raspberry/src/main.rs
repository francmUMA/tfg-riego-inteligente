// Definir módulos
mod device;
mod sends;
mod utils;


fn main() {
    let ip = "192.168.1.141";
    let port = "3000";
    let device_id = 1;
    let res = sends::temperature::send_temperature(ip.to_string(), port.to_string(), device_id);
    println!("Resultado: {:?}", res);
}
