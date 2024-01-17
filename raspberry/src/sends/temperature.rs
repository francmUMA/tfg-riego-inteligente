#[tokio::main]
pub async fn send_temperature(ip: String , port: String, device_id: i8) -> Result<bool, reqwest::Error>{
    use crate::device::temperature;
    use crate::utils::net;
    // Obtenemos la temperatura
    let temp = temperature::get_temperature().expect("Fallo al obtener la temperatura");
    println!("Temperatura: {}", temp);

    // Creamos la información
    let address = net::ip_port_concat(ip, port);
    use std::collections::HashMap;
    let mut data: HashMap<&str, i8> = HashMap::new();
    data.insert("device", device_id);
    data.insert("value", temp as i8);

    println!("Dirección: {}", address);
    println!("Información: {:?}", data);

    // Enviamos la información
    use reqwest::Client;
    let cliente = Client::new();
    let res = cliente.post(net::mk_url("http".to_string(), address, "api/cpu_temp".to_string()))
        .json(&data)
        .send()
        .await?;
    Ok(res.status().is_success())
}
