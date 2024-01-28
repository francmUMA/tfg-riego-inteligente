'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesInfo"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

export default function Page() {
    const [devices, setDevices] = useState([])
    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) router.push("/login")
        const fetchDevices = async (token: string) => {
            const devices = await getDevices(token)
            console.log(devices)
            if (devices === undefined) {
                 console.log("No se han obtenido los dispositivos")
                 setDevices([])
            } else {
                setDevices(devices)
            }
        }
        fetchDevices(token as string)
    }, [])

    return (
        <main>
            <div className="pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16">
                <button className="w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Añadir Dispositivo</button>
                <div></div>
                <div></div>
            </div>
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                devices.map((devices) => {
                    return (
                        <Link
                            key={devices}
                            href={"/dashboard/devices/"}
                            className="bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            <div className="w-full h-full flex justify-center items-center grid grid-cols-2 grid-rows-4">
                                <div className="row-span-3 w-full h-full flex justify-center items-center">
                                    <Image className="p-1" src="/rasp-image.png" alt="" width="600" height="0"></Image>
                                </div>
                                <div className="p-5 row-span-3 w-full h-full">
                                    <p>Ip: {devices.ip}</p>
                                    <p>Activo: {devices.available ? "Si" : "No"}</p>
                                    <p>Latitud: {devices.Latitud}</p>
                                    <p>Longitud: {devices.Longitud}</p>
                                </div>
                                <div className="col-span-2 bg-white w-full h-full border-t rounded-md">
                                    <h1 className="p-5 text-2xl">#{devices.id}</h1>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            </div>   
        </main>
    )
}