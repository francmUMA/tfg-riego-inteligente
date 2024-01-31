'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDevices } from "../../lib/devicesInfo"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem } from "@mui/material"

export default function Page() {
    const [devices, setDevices] = useState([])
    const [showDevicesInfo, setShowDevicesInfo] = useState<Array<boolean>>([])
    const [IsOpenAddDeviceDialog, setIsOpenAddDeviceDialog] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) router.push("/login")
        const fetchDevices = async (token: string) => {
            const devices = await getDevices(token)
            if (devices === undefined) {
                 console.log("No se han obtenido los dispositivos")
                 setDevices([])
            } else {
                setDevices(devices)
                setShowDevicesInfo(devices.map(() => true))
            }
        }
        fetchDevices(token as string)
    }, [])

    const handleDeviceInfoButton = (device_index: any) => {
        setShowDevicesInfo(showDevicesInfo.map((show, index) => {
            console.log(device_index + " " + show)
            if (index == device_index) {
                return !show
            }
            else return show
        })
        )
        console.log(showDevicesInfo)
    }
    
    const DeviceInfo = (device: any) => {
        return (
            <main className="w-full h-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <Image className="p-3" src="/rasp-image.png" alt="" width="600" height="0"></Image>
                </div>
                <div className="w-full h-full flex-1 justify-center items-center p-12 w-full h-full">
                    <p>Ip: {device.ip}</p>
                    <p>Activo: {device.available ? "Si" : "No"}</p>
                    <p>Latitud: {device.Latitud}</p>
                    <p>Longitud: {device.Longitud}</p>
                </div>
            </main>
        )
    }

    const handleAddDeviceButton = () => {
        setIsOpenAddDeviceDialog(true)
    }

    const closeDialog = () => {
        setIsOpenAddDeviceDialog(false)
    }

    const [ip, setIp] = useState("")
    const [validIp, setValidIp] = useState(false)
    const [emptyIp, setEmptyIp] = useState(true)
    const [id, setId] = useState("")
    const [validId, setValidId] = useState(false)
    const [emptyId, setEmptyId] = useState(true)

    const handleIP = (event: any) => {
        // Cadena no vacia
        if (event.target.value.length < 0){
            setEmptyIp(true)
            setValidIp(false)
            return
        }

        // Formato de la IP
        let ip_split = event.target.value.split(".")
        if (ip_split.length != 4) {
            setValidIp(false)
            setEmptyIp(false)
            return
        }
        for (let i = 0; i < 4; i++) {
            if (ip_split[i].length < 0 || ip_split[i].length > 3) {
                setValidIp(false)
                setEmptyIp(false)
                return
            }
            if (parseInt(ip_split[i]) < 0 || parseInt(ip_split[i]) > 255) {
                setValidIp(false)
                setEmptyIp(false)
                return
            }
        }

        // IP valida
        setValidIp(true)
        setEmptyIp(false)
        setIp(event.target.value)
        return
    }

    const handleId = (event: any) => {
    }

    const AddDeviceDialog = () => {
        return (
            <Dialog open={IsOpenAddDeviceDialog} onClose={closeDialog}>
                <DialogTitle className="border">Completa la IP y el identificador del dispositivo</DialogTitle>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-full p-4">
                        <label> Identificador</label>
                        <input className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg`} type="text" />
                    </div>
                    <div className="w-full h-full p-4">
                        <label> IP</label>
                        <input 
                                onBlur={handleIP}
                                className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg${
                                    validIp ? " border-green-600" : " border-red-600"
                                
                                }`} type="text" />
                    </div>
                    <div className="w-full h-full p-4">
                        <button className="w-full h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 active:bg-indigo-600 transition duration-150"> Añadir dispositivo</button>
                    </div>
                </div>
            </Dialog>
        )
    }

    const manageButton = () => {
        return (
            <div className="w-full h-full p-2 gap-4 flex flex-col justify-center items-center">
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Ajustar posición</button>
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Modificar IP</button>
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Test de conexion </button>
                <button className="w-full h-full bg-red-200 border border-red-300 text-red-600 hover:bg-red-300 rounded-md"> Eliminar dispositivo </button>
            </div>
        )
    }

    return (
        <main>
            <AddDeviceDialog />
            <div className="pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16">
                <button onClick={handleAddDeviceButton} className="w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Añadir Dispositivo</button>
                <div></div>
                <div></div>
            </div>
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                devices.map((devices, index) => {
                    return (
                        <Link
                            key={devices}
                            href={"/dashboard/devices/"}
                            className="bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            <div className="w-full h-full flex justify-center items-center grid grid-rows-4 hover:bg-gray-100">
                                <div className="w-full h-full row-span-3">
                                    {showDevicesInfo[index] ? DeviceInfo(devices) : manageButton()}
                                </div>
                                <div className="grid grid-cols-5 flex justify-between bg-white w-full h-full border-t rounded-md">
                                    <h1 className="col-span-4 p-5 text-2xl">#{devices.id}</h1>
                                    <button
                                        onClick={() => handleDeviceInfoButton(index)}
                                        className="border-l flex justify-center items-center rounded-md hover:bg-gray-50">
                                        <EllipsisVerticalIcon className="w-1/2 h-1/2"/>
                                    </button>
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