import {isMainThread, parentPort} from 'worker_threads'
import mqtt from "mqtt"
import sensorsModel from './sensors/models/sensorsModel.js'
import { registerDevice } from './devices/controllers/deviceController.js'
import deviceModel from './devices/models/deviceModel.js'
import actuadoresModel from './actuadores/models/actuadoresModel.js'

if (!isMainThread){
    const client = mqtt.connect(`mqtt://${process.env.BROKER_IP}:1883`, {
        clientId: 'server_recv',
        clean: true,
        connectTimeout: 4000
    })
    client.on('connect',async () => {
        console.log("Conectando")
        try {
            client.subscribe('devices/new', (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: devices/new")
                }
            })
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

    client.on('message', async (topic, message) => {
        console.log(`Received message: ${message.toString()} from topic: ${topic}`)
        if (topic === 'devices/new'){
            registerDevice(message.toString())
        } else if (topic.includes('start')){
            let device_data = await deviceModel.findOne({id: message.toString()})
            if (device_data == null) {
                console.log("No se ha encontrado el dispositivo")
                return
            }
            client.publish(`devices/${device_data.id}/info`, JSON.stringify(device_data), (err) => {
                if (err) {
                    console.log("No se ha podido enviar la información del dispositivo")
                }
            })
            let sensors = await sensorsModel.findAll({device: device_data.id})
            if (sensors == null) {
                console.log("No se han encontrado sensores")
            }

            for (let sensor of sensors){
                client.publish(`devices/${device_data.id}/sensors/info`, JSON.stringify(sensor), (err) => {
                    if (err) {
                        console.log("No se ha podido enviar la información del sensor: " + sensor.id)
                    }
                })
            }

            let actuadores = await actuadoresModel.findAll({device: device_data.id})
            if (actuadores == null) {
                console.log("No se han encontrado actuadores")
            }

            for (let actuador of actuadores){
                client.publish(`devices/${device_data.id}/actuadores/info`, JSON.stringify(actuador), (err) => {
                    if (err) {
                        console.log("No se ha podido enviar la información del actuador: " + actuador.id)
                    }
                })
            }
        }
        else {
            let data = JSON.parse(message.toString())
            console.log(data)
        }
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
