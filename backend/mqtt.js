import mqtt from "mqtt";

export const publish_msg = (topic, payload) => {
    const protocol = "mqtt";
    const host = "192.168.1.137";
    const port = 1883;
    const client_id = "server";
    const url = `${protocol}://${host}:${port}`
    const client = mqtt.connect(url, {
        clientId: client_id,
        clean: true,
        connectTimeout: 4000
    })
    client.on("connect", () => {
        console.log("Send msg: " + payload + " to topic: " + topic)
        client.publish(topic, payload);
        client.end();
    })
}