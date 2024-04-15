import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesUtils"
import { CiMail } from "react-icons/ci"
import { HiMiniCpuChip } from "react-icons/hi2";
import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"

const DeviceInfo = ({ device }) => {
    return(
        <main className="w-full h-full px-2 items-center flex flex-row gap-x-10 justify-center">
            <p className="font-semibold w-full flex flex-row gap-x-3 items-center justify-start">
                <HiMiniCpuChip size={18} className="text-indigo-600"/>
                {device.name}
            </p>
            <p className="flex flex-row w-full justify-start items-center gap-x-2">
                <CiMail size={18} className="text-indigo-600"/>
                {device.ip}
            </p> 
            <p className={`min-w-36 w-full max-w-40 h-1/2 px-2 text-sm rounded-xl shadow-sm ${
                device.available == true
                    ? "bg-green-300 text-green-600"
                    : "bg-red-300 text-red-600"
                } 
                flex items-center`}>
                {device.available == true ? <SignalIcon className="w-5 mr-2" /> : <SignalSlashIcon className="w-5 mr-2" />}
                {device.available == true ? " Connected" : " Not Connected"}
            </p>
        </main>                    
    )
}

export default function DevicesInfo({  }) {
    const [devices, setDevices] = useState([])

    const fetchDevices = async (token) => {
        let devices = await getDevices(token)
        if (devices !== undefined && devices.length > 0) {
            setDevices(devices)
        }
    }

    useEffect(() => {
        const token = getCookie("token")
        fetchDevices(token)
    }, [])

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="h-1/5 w-full flex items-center justify-center">
                <h1 className="font-bold text-lg">Dispositivos</h1>
            </header>
            <main id="devices-list" className="h-full w-full rounded-md flex flex-col items-center overflow-y-auto">
                {
                    devices.length > 0 
                    ?    devices.map((device, index) => {
                            return (
                                <div id={device.id} className={`w-full h-12 flex ${
                                    index % 2 == 0 ? "bg-blue-100" : "bg-gray-50"
                                    } flex-row items-center justify-center`}>
                                    <DeviceInfo device={device} />
                                </div>
                            )
                        })
                    : <p className="w-full h-full flex justify-center items-center">No hay dispositivos</p>
                }
            </main>
        </div>
    )
}