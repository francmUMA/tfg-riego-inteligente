import {isMainThread, parentPort} from 'worker_threads'
import mqtt from "mqtt"
import sensorsModel from './sensors/models/sensorsModel.js'

if (!isMainThread){
    const client = mqtt.connect(`mqtt://${process.env.BROKER_IP}:1883`, {
        clientId: 'server_recv',
        clean: true,
        connectTimeout: 4000
    })
    client.on('connect',async () => {
        console.log("Conectando")
        try {
            let sensors = await sensorsModel.findAll()
            sensors.forEach(sensor => {
                let topic = `devices/${sensor.device}/sensors/${sensor.id}/value`
                client.subscribe(topic, (err) => {
                    if (err) {
                        console.log("No se ha podido suscribir al topic: " + topic)
                    }
                })
                console.log(`Suscrito al topic: ${topic}`)
            })
            console.log("Conexión con el broker MQTT exitosa")
        } catch (error) {
            console.log(error)
        }
    })

    client.on('message', (topic, message) => {
        console.log(`Received message: ${message.toString()} from topic: ${topic}`)
        parentPort.postMessage({topic: topic, message: message.toString()})
    })

    parentPort.on('message', (data) => {
        if (data.command === 'suscribe'){
            client.subscribe(data.topic, (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: " + data.topic)
                }
            })
        } else if (data.command === 'unsuscribe'){
            client.unsubscribe(data.topic, (err) => {
                if (err) {
                    console.log("No se ha podido desuscribir al topic: " + data.topic)
                }
            })
        }
    })
}
