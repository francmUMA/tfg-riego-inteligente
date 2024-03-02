pub fn ip_port_concat (ip: String, port: String) -> String {
    let mut ip_port = String::new();
    ip_port.push_str(&ip);
    ip_port.push_str(":");
    ip_port.push_str(&port);
    ip_port
}

pub fn mk_url (protocol: String, address: String, path: String) -> String {
    let mut url = String::new();
    url.push_str(&protocol);
    url.push_str("://");
    url.push_str(&address);
    url.push_str("/");
    url.push_str(&path);
    println!("URL: {}", url);
    url
}