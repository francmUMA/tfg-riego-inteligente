import { getArea } from "@/src/app/lib/areasUtils";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { MdLocationOn, MdEditLocationAlt, MdSignalWifiStatusbarNotConnected, MdOutlineDownloadDone } from "react-icons/md"
import { IoPlayCircleSharp, IoWifi, IoPauseCircleSharp, IoWaterOutline } from "react-icons/io5"
import { PiPolygon } from "react-icons/pi"

export const ActuadorMarkerInfo = ({ actuador }) => {
    const [area, setArea] = useState(undefined)

    const fetchArea = async () => {
        const token = getCookie("token")
        let area = await getArea(actuador.area, token)
        if (area !== undefined) {
            setArea(area)
        }
    }

    useEffect(() => {
        if (actuador !== undefined) fetchArea()
    }, [actuador])

    return (
        <main className="w-full h-full flex flex-col">
            <header className="w-full h-full flex-row">
                <p className="text-lg font-semibold">{actuador.name}</p>
            </header>
            <section className="w-full h-full flex flex-col gap-y-1">
                <div className="flex flex-row gap-x-2 items-center w-full h-full">
                    
                    
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                    
                    
                </div>
                <div className="w-full flex flex-row items-center gap-x-2">
                    <MdLocationOn size={18} className="text-indigo-600"/>
                    <p>{actuador.Latitud}</p>
                    <p>{actuador.Longitud}</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                    <PiPolygon size={18} className="text-indigo-600"/>
                    <p>{area !== undefined ? area.name : "No asignado"}</p>
                </div>
            </section>
            
            
        </main>
    );
}