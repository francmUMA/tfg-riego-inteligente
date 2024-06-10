import { getActuadorLogs } from "@/src/app/lib/actuadorUtils"
import { getDeviceLogs } from "@/src/app/lib/devicesUtils"
import { getSensorLogs } from "@/src/app/lib/sensorsUtils"
import { useEffect, useState } from "react"
import { FaRegClock } from "react-icons/fa"
import { FaRegNewspaper } from "react-icons/fa6"

export const LogInfo = ({ elemId, type }) => {

    const [logs, setLogs] = useState([])

    const orderLogs = (logs) => {
        return logs.sort((a, b) => b.timestamp - a.timestamp)
    }

    const fetchLogs = async () => {
        let logs = []
        if (type == 0) logs = await getDeviceLogs(elemId)
        else if (type == 1) logs = await getSensorLogs(elemId)
        else if (type == 2) logs = await getActuadorLogs(elemId)
        setLogs(orderLogs(logs))
    }

    const timestampToDate = (timestamp) => {
        let date = new Date(timestamp*1000)
        return date.toLocaleTimeString() + " " + date.toLocaleDateString()
    }
    
    useEffect(() => {
        if (elemId !== undefined && type !== undefined) fetchLogs()
    }, [elemId, type])

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">Eventos</h1>
            {
                logs.length > 0 && elemId !== undefined ? (
                    <div className="w-full h-full flex flex-col items-center rounded-md overflow-y-auto">
                        {
                            logs.map((log, index) => (
                                <div key={index} className={`w-full h-12 flex flex-row gap-x-2 justify-between items-center px-4 ${
                                    index % 2 === 0 ? "bg-indigo-200/30" : " bg-slate-100/50"
                                }`}>
                                    <div className="w-full h-full min-w-32 flex flex-row items-center gap-x-2">
                                        <FaRegClock className="text-indigo-600" size={18}/> 
                                        <p className="w-full h-full flex items-center">{timestampToDate(log.timestamp)}</p>
                                    </div>
                                    <div className="w-full h-full flex flex-row items-center gap-x-2">
                                        <FaRegNewspaper className="text-indigo-600" size={18}/>
                                        <p className="w-full h-full overflow-x-auto">{log.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <p className="w-full h-full flex justify-center items-center">No se han encontrado logs</p>
                )
            }
        </div>
    )
}

