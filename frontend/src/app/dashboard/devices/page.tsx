'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDevices, checkIP, createDevice, deleteDevice } from "../../lib/devicesInfo"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { EllipsisVerticalIcon, SignalIcon, SignalSlashIcon, EnvelopeIcon, MapPinIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import { Dialog, DialogTitle } from "@mui/material"

export default function Page() {
    const [devices, setDevices] = useState([])
    const [showDevicesInfo, setShowDevicesInfo] = useState<Array<boolean>>([])
    const [IsOpenAddDeviceDialog, setIsOpenAddDeviceDialog] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token")
        console.log(token)
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
                <div className="w-full h-2 flex justify-center items-center">
                    <Image className="p-3" src="/rasp-image.png" alt="" width="600" height="0"></Image>
                </div>
                <div className="w-full h-5/6 p-3 bg-white mx-2 flex flex-col border shadow-sm rounded-md">
                    <div className="w-full px-2 h-full flex items-center">
                        <p className="flex items-center gap-2 "><EnvelopeIcon className="w-5"/> {device.ip}</p>
                    </div>
                    <div className="w-full h-full px-2 flex flex-col justify-center">
                        <p className={`min-w-36 max-w-40 h-1/2 px-2 text-sm rounded-xl shadow-sm ${
                            device.available == true
                                ? "bg-green-300 text-green-600"
                                : "bg-red-300 text-red-600"
                        } flex items-center`}>
                            {device.available == true ? <SignalIcon className="w-5 mr-2" /> : <SignalSlashIcon className="w-5 mr-2" />}
                            {device.available == true ? " Connected" : " Not Connected"}
                        </p>
                    </div>
                    <div className="w-full h-full px-2 grid grid-cols-4 grid-rows-2 flex items-center">
                        <div className="flex items-center"><MapPinIcon className="w-6" /></div>
                        <div className="col-span-3 flex items-center"> {
                            device.Latitud === null
                                ? "Sin latitud"
                                : device.Latitud
                        }</div>
                        <div></div>
                        <div className="col-span-3 flex items-center"> {
                            device.Longitud === null
                                ? "Sin longitud"
                                : device.Longitud
                        }</div>
                    </div>
                </div>
            </main>
        )
    }

    const handleAddDeviceButton = () => {
        setIsOpenAddDeviceDialog(!IsOpenAddDeviceDialog)
    }

    const closeDialog = () => {
        setIsOpenAddDeviceDialog(false)
    }

    const [ip, setIp] = useState("")
    const [validIp, setValidIp] = useState(false)
    const [emptyIp, setEmptyIp] = useState(true)
    const [id, setId] = useState("")
    const [validId, setValidId] = useState(false)
    const [validIdMessage, setValidIdMessage] = useState("")
    const [emptyId, setEmptyId] = useState(true)
    const [validIpMessage, setValidIpMessage] = useState("")

    const handleIP = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyIp(true)
            setValidIp(false)
        } else {
            setEmptyIp(false)
            let check = checkIP(e.target.value as string)
            if (check) {
                setValidIp(true)
                setIp(e.target.value)
            } else {
                setValidIp(false)
                setValidIpMessage('')
            }
        }
    }

    const handleId = (e: {target: { value: string }}) => {
        if (e.target.value.length < 0){
            setEmptyId(true)
            setValidId(false)
            return
        }
        setValidId(true)
        setEmptyId(false)
        setId(e.target.value)
    }

    const AddDeviceDialog = () => { 
        return (
            <Dialog open={IsOpenAddDeviceDialog} onClose={closeDialog}>
                <DialogTitle className="w-full h-full border-b">Añade la información del dispositivo</DialogTitle>
                <div className={`p-5 w-full h-full col-span-2 flex justify-center ${
                    IsOpenAddDeviceDialog ? "flex flex-col gap-5 justify-center items-center" : "hidden"
                    }`}>
                    <div className="w-full h-full flex flex-col">
                        <label className="font-medium">Identificador</label>
                        <input name="id" type="text" onChange={handleId} onBlur={handleId} placeholder="Identificador" required
                                    className={`transition easy-in-out duration-200 
                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                    shadow-sm rounded-lg ${
                                        emptyId 
                                        ? "border-[#d6d3d1]"
                                        : validId
                                            ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                            : "border-red-500 text-red-500 bg-gray-500/5"
                        }`}/>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <label>Dirección IP</label>
                        <input name="id" type="text" onChange={handleIP} onBlur={handleIP} placeholder="Dirección IP" required
                                className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg ${
                                    emptyIp
                                    ? "border-[#d6d3d1]"
                                    : validIp
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                        }`}/>
                    </div>
                    <button onClick={createDeviceButton} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Añadir Dispositivo</button>
                </div>
            </Dialog>
        )
    }

    const manageButton = (id: string) => {
        return (
            <div className="w-full h-full p-2 gap-4 flex flex-col justify-center items-center">
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Ajustar posición</button>
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Modificar IP</button>
                <button className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Test de conexion </button>
                <button className="w-full h-full bg-red-200 border border-red-300 text-red-600 hover:bg-red-300 rounded-md" 
                    onClick={() => deleteDeviceButton(id)}> Eliminar dispositivo </button>
            </div>
        )
    }

    const createDeviceButton = async () => {
        setEmptyId(true)
        setEmptyIp(true)
        if (validId && validIp) {
            const token = getCookie("token")
            let addDevice = await createDevice(id, ip, token as string)
            if (addDevice) {
                alert("Dispositivo añadido correctamente")
                setIsOpenAddDeviceDialog(false)
            } else {
                alert("No se ha podido añadir el dispositivo")
            }
        }
    }

    const deleteDeviceButton = async (id: string) => {
        const token = getCookie("token")
        let res = await deleteDevice(id, token as string)
        if (res) {
            alert("Dispositivo eliminado correctamente")
        } else {
            alert("No se ha podido eliminar el dispositivo")
        }
    }

    return (
        <main className="">
            <div className="pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16">
                <button onClick={handleAddDeviceButton} className="w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Añadir Dispositivo</button>
                {AddDeviceDialog()} 
                <div className="w-full h-full bg-gray-100 justify-self-end">
                    <button className="h-full w-10 flex items-center justify-center font-medium hover:bg-gray-100 border rounded-lg duration-150">    <ArrowPathIcon className="w-6"/> 
                    </button>
                </div>
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
                                    {showDevicesInfo[index] ? DeviceInfo(devices) : manageButton(devices.id)}
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