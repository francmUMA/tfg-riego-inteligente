import {isMainThread, parentPort} from 'worker_threads'
import mqtt from "mqtt"
import sensorsModel from './sensors/models/sensorsModel.js'
import { registerDevice } from './devices/controllers/deviceController.js'
import deviceModel from './devices/models/deviceModel.js'
import actuadoresModel from './actuadores/models/actuadoresModel.js'
import { addValue } from './monitors/controllers/monitorController.js'
import { addLog } from './logs/controllers/logController.js'
import programsModel from './programs/models/programsModel.js'
import { registerSensor } from './sensors/controllers/sensorsController.js'

if (!isMainThread){
    const client = mqtt.connect(`mqtt://${process.env.BROKER_IP}:1883`, {
        clientId: 'server_recv',
        clean: true,
        connectTimeout: 4000
    })
    client.on('connect',async () => {
        console.log("Conectando")
        try {
            client.subscribe('server/discover/sensors', (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: server/discover")
                }
            })
            client.subscribe('logs', (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: logs")
                }
            })
            client.subscribe('devices/new', (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: devices/new")
                }
            })
            client.subscribe('devices/start', (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: devices/start")
                }
            })
            let devices = await deviceModel.findAll()
            for (let device of devices){
                client.subscribe(`devices/${device.id}/available`, (err) => {
                    if (err) {
                        console.log("No se ha podido suscribir al topic: devices/" + device.id + "/start")
                    }
                })
            }

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
            client.publish('server/available', '1', (err) => {
                if (err) {
                    console.log("No se ha podido enviar el mensaje de servidor listo")
                }
            })
        } catch (error) {
            console.log(error)
        }
    })

    client.on('message', async (topic, message) => {
        console.log(`Received message: ${message.toString()} from topic: ${topic}`)
        if (topic === 'devices/new'){
            registerDevice(message.toString())
        } else if (topic.includes('start')){
            let device_data = await deviceModel.findOne({where: {id: message.toString()}})
            if (device_data == null) {
                console.log("No se ha encontrado el dispositivo")
                return
            }

            client.publish(`devices/${device_data.id}/info`, JSON.stringify(device_data), (err) => {
                if (err) {
                    console.log("No se ha podido enviar la información del dispositivo")
                }
            })

            client.subscribe(`devices/${device_data.id}/available`, (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: devices/" + device_data.id + "/available")
                }
            })

            client.subscribe(`devices/${device_data.id}/temperature`, (err) => {
                if (err) {
                    console.log("No se ha podido suscribir al topic: devices/" + device_data.id + "/available")
                }
            })

            let sensors = await sensorsModel.findAll({where: {device: device_data.id}})
            if (sensors == null) {
                console.log("No se han encontrado sensores")
            }

            for (let sensor of sensors){
                client.publish(`devices/${device_data.id}/sensors/new`, JSON.stringify(sensor), (err) => {
                    if (err) {
                        console.log("No se ha podido enviar la información del sensor: " + sensor.id)
                    }
                })
                client.subscribe(`devices/${device_data.id}/sensors/${sensor.id}/value`, (err) => {
                    if (err) {
                        console.log("No se ha podido suscribir al topic: devices/" + device_data.id + "/sensors/" + sensor.id + "/value")
                    }
                })
            }

            let actuadores = await actuadoresModel.findAll({where: {device: device_data.id}})
            if (actuadores == null) {
                console.log("No se han encontrado actuadores")
            }

            for (let actuador of actuadores){
                client.publish(`devices/${device_data.id}/actuadores/new`, JSON.stringify(actuador), (err) => {
                    if (err) {
                        console.log("No se ha podido enviar la información del actuador: " + actuador.id)
                    }
                })

                if (actuador.activeProgram != null) {
                    let program = await programsModel.findOne({where: {id: actuador.activeProgram}})
                    if (program == null) {
                        console.log("No se ha encontrado el programa para enviar al actuador")
                    }
                    client.publish(`devices/${device_data.id}/programs/new`, JSON.stringify(program), (err) => {
                        if (err) {
                            console.log("No se ha podido enviar la información del programa: " + program.id)
                        }
                    })
                }
            }
        } else if (topic.includes('available')){
            let device_id = topic.split('/')[1]
            let device_data = await deviceModel.findOne({where: {id: device_id}})
            if (device_data == null) {
                console.log("No se ha encontrado el dispositivo")
                return
            }
            device_data.available = 1
            device_data.save()
            console.log("Dispositivo "+ device_id + " activo")
        } else if (topic.includes('value')){
            let sensor_id = topic.split('/')[3]
            let jsonData = JSON.parse(message.toString())
            addValue({
                sensorCode: sensor_id,
                type: 0,
                value: jsonData.temperature,
                time: jsonData.time
            })
            addValue({
                sensorCode: sensor_id,
                type: 1,
                value: jsonData.soilTemperature,
                time: jsonData.time
            })
            addValue({
                sensorCode: sensor_id,
                type: 2,
                value: jsonData.humidity,
                time: jsonData.time
            })
        } else if (topic.includes('logs')){
            let logData = JSON.parse(message.toString())
            addLog(logData)
        } else if (topic.includes('temperature')){
            let device_id = topic.split('/')[1]
            let jsonData = JSON.parse(message.toString())
            addValue({
                deviceCode: device_id,
                value: jsonData.value,
                time: jsonData.time
            })
        } else if (topic.includes('discover')){
            // Comprobar si el dispositivo de lectura ya existe
            let sensor = await sensorsModel.findOne({where: {id: message.toString()}})
            if (sensor != null){
                return
            }
            console.log("Sensor descubierto -> " + message.toString())
            // let res = registerSensor(message.toString())
            // if (res){
            //     console.log("Sensor registrado correctamente")
            // } else {
            //     console.log("No se ha podido registrar el sensor")
            // }
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
        } else if (data.command === 'register'){
            client.publish(data.topic, data.payload, (err) => {
                if (err) {
                    console.log("No se ha podido registrar el dispositivo")
                }
            })
        }
    })

}
