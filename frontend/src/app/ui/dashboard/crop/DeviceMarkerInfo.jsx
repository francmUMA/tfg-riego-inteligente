import { getArea } from "@/src/app/lib/areasUtils";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { MdLocationOn, MdEditLocationAlt, MdSignalWifiStatusbarNotConnected, MdOutlineDownloadDone } from "react-icons/md"
import { IoPlayCircleSharp, IoWifi, IoPauseCircleSharp, IoWaterOutline } from "react-icons/io5"
import { PiPolygon } from "react-icons/pi"

export const DeviceMarkerInfo = ({ device }) => {
    const [area, setArea] = useState(undefined)

    const fetchArea = async () => {
        const token = getCookie("token")
        let area = await getArea(device.area, token)
        if (area !== undefined) {
            setArea(area)
        }
    }

    useEffect(() => {
        if (device !== undefined) fetchArea()
    }, [device])

    return (
        <main className="w-full h-full flex flex-col">
            <header className="w-full h-full flex-row">
                <p className="text-lg font-semibold">{device.name}</p>
            </header>
            <section className="w-full h-full flex flex-col gap-y-1">
                <div className="flex flex-row gap-x-2 items-center w-full h-full">
                    <IoWifi size={18} className="text-indigo-600"/>
                    <p>{device.ip}</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                    <MdSignalWifiStatusbarNotConnected size={18} className="text-indigo-600"/>
                    <p className={`min-w-24 max-w-40 h-1/2 px-2 rounded-xl shadow-sm ${
                        device.available == true
                            ? "bg-green-300 text-green-600"
                            : "bg-red-300 text-red-600"
                        } flex items-center justify-center`}>
                        {device.available == true ? " Connected" : " Not Connected"}
                    </p>
                </div>
                <div className="w-full flex flex-row items-center gap-x-2">
                    <MdLocationOn size={18} className="text-indigo-600"/>
                    <p>{device.Latitud}</p>
                    <p>{device.Longitud}</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                    <PiPolygon size={18} className="text-indigo-600"/>
                    <p>{area !== undefined ? area.name : "No asignado"}</p>
                </div>
            </section>
            
            
        </main>
    );
}