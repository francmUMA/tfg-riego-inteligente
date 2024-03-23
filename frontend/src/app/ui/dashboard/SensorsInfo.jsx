import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesUtils"
import { FaFaucetDrip } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa";
import { getSensors } from "../../lib/sensorsUtils";

const SensorInfo = ({ sensor, devices }) => {
    return(
        <main className="w-full h-full px-2 items-center flex flex-row gap-x-10 justify-center">
            <p className="font-semibold w-full flex flex-row gap-x-3 items-center justify-start">
                <FaFaucetDrip size={18} className="text-indigo-600"/>
                {sensor.name}
            </p>
            <p className="flex w-full flex-row justify-start items-center gap-x-2">
                <IoWaterOutline size={18} className="text-indigo-600"/>
                {sensor.available ? "Conectado" : "Desconectado"}
            </p> 
            <p className="flex w-full flex-row justify-start items-center gap-x-3">
                <HiMiniCpuChip size={18} className="text-indigo-600"/>
                {devices.find((device) => device.id == sensor.device)?.name}
            </p> 
            <p className="flex w-full flex-row justify-start items-center gap-x-3">
                <FaRobot size={18} className="text-indigo-600"/>
                {sensor.value == null ? "-" : sensor.value}
            </p>
        </main>
    )
}

export default function SensorsInfo({  }) {
    const [sensores, setSensores] = useState([])
    const [devices, setDevices] = useState([])

    const fetchDevices = async (token) => {
        let devices = await getDevices(token)
        if (devices !== undefined && devices.length > 0) {
            setDevices(devices)
        }
    }
    

    const fetchSensores = async (token) => {
        let resSensores = []
        for (let device of devices) {
            let deviceSensors = await getSensors(device.id, token)
            resSensores.push(...deviceSensors)
        }
        setSensores(resSensores)
    }

    useEffect(() => {
        const token = getCookie("token")
        fetchDevices(token)
    }, [])

    useEffect(() => {
        const token = getCookie("token")
        fetchSensores(token)
    }, [devices])

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="h-1/5 w-full flex items-center justify-center">
                <h1 className="font-bold text-lg">Sensores</h1>
            </header>
            <main id="sensores-list" className="h-full w-full rounded-md flex justify-center items-center overflow-y-auto">
                {
                    sensores.length > 0 ?
                    sensores.map((sensor, index) => {
                        return (
                            <div id={sensor.id} className={`w-full h-12 flex ${
                                index % 2 == 0 ? "bg-blue-100" : "bg-gray-50"
                                } flex-row items-center justify-center`}>
                                <SensorInfo sensor={sensor} devices={devices} />
                            </div>
                        )
                    })
                    : <p className="text-center">No hay sensores disponibles</p>
                }
            </main>
        </div>
    )
}