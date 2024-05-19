import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesUtils"
import { getActuadores } from "../../lib/actuadorUtils"
import { FaFaucetDrip } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa";

const ActuadorInfo = ({ actuador, devices }) => {
    return(
        <main className="w-full h-full px-2 items-center flex flex-row gap-x-10 justify-center">
            <p className="font-semibold w-full flex flex-row gap-x-3 items-center justify-start">
                <FaFaucetDrip size={18} className="text-indigo-600"/>
                {actuador.name}
            </p>
            <p className="flex flex-row w-full justify-start items-center gap-x-2">
                <IoWaterOutline size={18} className="text-indigo-600"/>
                {actuador.status ? "Regando" : "Parado"}
            </p> 
            <p className="flex flex-row  w-full justify-start items-center gap-x-3">
                <HiMiniCpuChip size={18} className="text-indigo-600"/>
                {devices.find((device) => device.id == actuador.device)?.name}
            </p> 
            <p className="flex flex-row w-full justify-start items-center gap-x-3">
                <FaRobot size={18} className="text-indigo-600"/>
                {actuador.mode ? "Automático" : "Manual"}
            </p>
        </main>
    )
}

export default function ActuadoresInfo({ areas }) {
    const [actuadores, setActuadores] = useState([])
    const [devices, setDevices] = useState([])

    const fetchDevices = async (token) => {
        let devices = await getDevices(token)
        if (devices !== undefined && devices.length > 0) {
            setDevices(devices)
        }
    }
    

    const fetchActuadores = async (token) => {
        let resActuadores = []
        for (let device of devices) {
            let deviceActuadores = await getActuadores(device.id, token)
            resActuadores.push(...deviceActuadores)
        }
        setActuadores(resActuadores)
    }

    useEffect(() => {
        const token = getCookie("token")
        fetchDevices(token)
    }, [])

    useEffect(() => {
        const token = getCookie("token")
        fetchActuadores(token)
    }, [devices])

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="h-1/5 w-full flex items-center justify-center">
                <h1 className="font-bold text-lg">Actuadores</h1>
            </header>
            <main id="actuadores-list" className="h-full w-full rounded-md flex flex-col items-center overflow-y-auto">
                {
                    actuadores.length > 0 && areas === undefined
                    ?    actuadores.map((actuador, index) => {
                            return (
                                <div id={actuador.id} className={`w-full h-12 flex ${
                                    index % 2 == 0 ? "bg-blue-100" : "bg-gray-50"
                                    } flex-row items-center justify-center`}>
                                    <ActuadorInfo actuador={actuador} devices={devices} />
                                </div>
                            )
                        })
                    : actuadores.length > 0 && areas !== undefined && actuadores.filter((actuador) => areas.find((area) => area.id == actuador.area) !== undefined).length > 0
                    ?   actuadores.map((actuador, index) => {
                        if (areas.find((area) => area.id == actuador.area) !== undefined){
                            return (
                                <div id={actuador.id} className={`w-full h-12 flex ${
                                    index % 2 == 0 ? "bg-blue-100" : "bg-gray-50"
                                    } flex-row items-center justify-center`}>
                                    <ActuadorInfo actuador={actuador} devices={devices} />
                                </div>
                            )
                        }
                    })
                    : <p className="w-full h-full flex justify-center items-center">No hay actuadores</p>
                }
            </main>
        </div>
    )
}