import {Worker, isMainThread, parentPort} from 'worker_threads'
import mqtt from "mqtt"
import sensorsModel from './sensors/models/sensorsModel.js'

if (!isMainThread){
    let client

    client.on('connect',async () => {
        try {
            let sensors = await sensorsModel.findAll()
            sensors.forEach(sensor => {
                let topic = `devices/${sensor.device_id}/sensors/${sensor.sensor_id}/value`
                client.subscribe(topic, (err) => {
                    if (err) {
                        console.log("No se ha podido suscribir al topic: " + topic)
                    }
                })
            })
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
        } else if (data.command === 'start'){
            try {
                client = mqtt.connect(`mqtt://${process.env.BROKER_IP}:1883`)
                console.log("Conexión con el broker MQTT exitosa")
            } catch (error) {
                console.log(error)
            }
        }
    })
}
