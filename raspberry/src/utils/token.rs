use serde_json::json;

#[tokio::main]
pub async fn get_token(email: String, password: String) -> Option<String> {
    let ip = "192.168.1.137";
    let port = "3000";
    let url = format!("http://{}:{}/api/auth/login", ip, port);
    let client = reqwest::Client::new();
    let body = json!({
        "email": email,
        "password": password
    });
    println!("{:?}", body);
    let res = client.post(url)
        .json(&body)
        .send()
        .await;
    if let Ok(res) = res {
        let status = res.status();
        if status.is_success() {
            let body = res.json::<serde_json::Value>().await;
            if let Ok(body) = body {
                let token = body["token"].as_str().unwrap();
                return Some(token.to_string());
            }
        } else {
            println!("{:?}", res);
        }
    } else {
        println!("Error en la petición");
    }
    None
}