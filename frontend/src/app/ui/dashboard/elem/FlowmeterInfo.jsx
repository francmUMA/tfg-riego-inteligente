import { getSensorInfo } from "@/src/app/lib/sensorsUtils"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

export const FlowmeterInfo = ({ elem }) => {
    const [sensorName, setSensorName] = useState("No definido")

    const fetchSensorName = async (id) => {
        const token = getCookie("token")
        let sensor = await getSensorInfo(id, token)
        if (sensor !== undefined) setSensorName(sensor.name)
    }

    useEffect(() => {
        if (elem !== undefined && elem.flowmeter != null) {
            fetchSensorName(elem.flowmeter)
        } else {
            setSensorName("No definido")
        }
    }, [elem])
    return (
        <p>{sensorName}</p>
    )
}