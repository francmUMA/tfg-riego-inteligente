import { getDeviceLogs } from "@/src/app/lib/devicesUtils"
import { useEffect, useState } from "react"

export const LogInfo = ({ elemId, type }) => {

    const [logs, setLogs] = useState([])

    const fetchLogs = async () => {
        let deviceLogs = await getDeviceLogs(elemId)
        setLogs(deviceLogs)
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
            <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">Logs</h1>
            {
                logs.length > 0 ? (
                    <div className="w-full h-full flex flex-col items-center overflow-y-auto">
                        {
                            logs.map((log, index) => (
                                <div key={index} className="w-full h-12 flex flex-row gap-x-2 justify-between items-center px-4 border border-gray-300">
                                    <p>{timestampToDate(log.timestamp)}</p>
                                    <p>{log.description}</p>
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