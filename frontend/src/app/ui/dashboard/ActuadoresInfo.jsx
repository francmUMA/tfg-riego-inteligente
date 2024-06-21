import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesUtils"
import { getActuadores } from "../../lib/actuadorUtils"
import { FaClock, FaFaucetDrip } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa";
import CircularIndeterminate from "./info/CircularFallback";
import { getProgramName } from "../../lib/programUtils";

export const ActuadorProgramName = ({programId}) => {

    const [program, setProgram] = useState(undefined)
    const fetchProgram = async () => {
        let program = await getProgramName(programId)
        setProgram(program)
    }

    useEffect(() => {
        if (programId === undefined || programId == null) return
        fetchProgram()
    }, [programId])

    return(
        <div className="flex flex-row h-full w-full justify-start items-center gap-x-2">
            <button
                className="w-9 h-2/3 flex justify-center items-center rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                <FaClock size={16} className="text-indigo-600"/>
            </button>
            <p className="h-full flex items-center">{program === undefined || program == null ? "Indefinido" : program}</p>
 
        </div>
        
    )
}

const ActuadorInfo = ({ actuador, devices, showStatus }) => {
    return(
        <main className="w-full h-full px-2 items-center flex flex-row gap-x-10 justify-center">
            <p className="font-semibold w-full flex flex-row gap-x-3 items-center justify-start">
                <FaFaucetDrip size={20} className="text-indigo-600"/>
                {actuador.name}
            </p>
            {
                showStatus 
                    ?   <p className="flex flex-row w-full justify-start items-center gap-x-2">
                            <IoWaterOutline size={20} className="text-indigo-600"/>
                            {actuador.status ? "Regando" : "Parado"}
                        </p>
                    : <></>
            } 
            <div className="flex flex-row w-full justify-start items-center gap-x-3">
                <HiMiniCpuChip size={20} className="text-indigo-600"/>
                <p className="w-full h-full flex justify-start items-center">{devices[0].name}</p>
            </div> 
            <p className="flex flex-row w-full justify-start items-center gap-x-3">
                <FaRobot size={20} className="text-indigo-600"/>
                {actuador.mode ? "Automático" : "Manual"}
            </p>
        </main>
    )
}

export default function ActuadoresInfo({ areas, filter, showStatus }) {
    const [actuadores, setActuadores] = useState([])
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)

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
        if (filter === undefined) {
            setActuadores(resActuadores)
            return   
        }
        if (filter == "status-on"){
            setActuadores(resActuadores.filter((actuador) => actuador.status == true))
            return
        }
    }

    useEffect(() => {
        const token = getCookie("token")
        fetchDevices(token)
        setLoading(false)
    }, [])

    useEffect(() => {
        const token = getCookie("token")
        fetchActuadores(token)
        setLoading(false)
    }, [devices])

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            {   loading ? <CircularIndeterminate /> :
                <section id="actuadores-list" className="h-full w-full rounded-md flex flex-col items-center overflow-y-auto">
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
                                        <ActuadorInfo actuador={actuador} devices={devices} showStatus={showStatus}/>
                                    </div>
                                )
                            }
                        })
                        : <p className="w-full h-full flex justify-center items-center">No hay actuadores</p>
                    }
                </section>
            }
        </div>
    )
}