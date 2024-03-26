import mqtt from "mqtt";

export const publish_msg = (topic, payload, ip) => {
    const protocol = "mqtt";
    const host = ip;
    const port = 1883;
    const client_id = "server";
    const url = `${protocol}://${host}:${port}`
    const client = mqtt.connect(url, {
        clientId: client_id,
        clean: true,
        connectTimeout: 4000
    })
    client.on("connect", () => {
        console.log("Conectado al broker");
        client.publish(topic, payload);
        client.end();
    })
}