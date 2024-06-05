import { getCookie } from "cookies-next"
import { Suspense, useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesUtils"
import { FaFaucetDrip } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { getSensors } from "../../lib/sensorsUtils";
import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline";
import CircularIndeterminate from "./info/CircularFallback";

const SensorInfo = ({ sensor, devices }) => {
    return(
        <main className="w-full h-full px-2 items-center flex flex-row gap-x-10 justify-center">
            <p className="font-semibold w-full flex flex-row gap-x-3 items-center justify-start">
                <FaFaucetDrip size={18} className="text-indigo-600"/>
                {sensor.name}
            </p>
            <p className="flex w-full flex-row justify-start items-center gap-x-2">
                {<p className={`min-w-36 w-full max-w-40 h-1/2 px-2 text-sm rounded-xl shadow-sm ${
                sensor.available == true
                    ? "bg-green-300 text-green-600"
                    : "bg-red-300 text-red-600"
                } 
                flex items-center`}>
                {sensor.available == true ? <SignalIcon className="w-5 mr-2" /> : <SignalSlashIcon className="w-5 mr-2" />}
                {sensor.available == true ? " Connected" : " Not Connected"}
            </p>}
            </p> 
            <p className="flex w-full flex-row justify-start items-center gap-x-3">
                <HiMiniCpuChip size={18} className="text-indigo-600"/>
                {devices.find((device) => device.id == sensor.device)?.name}
            </p> 
        </main>
    )
}

export default function SensorsInfo() {
    const [sensores, setSensores] = useState([])
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)

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
        setLoading(false)
    }, [])

    useEffect(() => {
        const token = getCookie("token")
        fetchSensores(token)
        setLoading(false)
    }, [devices])

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="h-1/6 w-full flex items-center justify-center">
                <h1 className="text-slate-400">Sensores</h1>
            </header>
            <Suspense fallback={<CircularIndeterminate />}>
                {loading ? <CircularIndeterminate />
                :
                <div id="sensores-list" className="h-full w-full rounded-md flex flex-col items-center overflow-y-auto">
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
                        : <p className="w-full h-full flex justify-center items-center">No hay sensores disponibles</p>
                    }
                </div>
                }
                
            </Suspense>
        </div>
    )
}