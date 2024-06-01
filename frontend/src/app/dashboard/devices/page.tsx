'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDevices, checkIP, createDevice } from "../../lib/devicesUtils"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { SignalIcon, SignalSlashIcon, EnvelopeIcon, MapPinIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import { Dialog, DialogTitle } from "@mui/material"
import { Area, getAreas } from "../../lib/areasUtils"
import { IoIosAddCircleOutline } from "react-icons/io"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [devices, setDevices] = useState([])
    const [showDevicesInfo, setShowDevicesInfo] = useState<Array<boolean>>([])
    const [IsOpenAddDeviceDialog, setIsOpenAddDeviceDialog] = useState(false)

    const router = useRouter()

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

    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) router.push("/login")
        fetchAreas(token as string)
        fetchDevices(token as string)
    }, [router])


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
                    <div className="w-full h-full p-2 grid grid-cols-4 grid-rows-2 flex items-center">
                        <div className="flex items-center"><MapPinIcon className="w-6" /></div>
                        <div className="col-span-3 flex items-center"> {
                            device.area === null
                                ? "Descolocado"
                                : areas.find((area: Area) => device.area == area.id)?.name
                        }</div>
                    </div>
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
    const [name, setName] = useState("")
    const [validName, setValidName] = useState(false)
    const [emptyName, setEmptyName] = useState(true)
    const [emptyId, setEmptyId] = useState(true)
    const [id, setId] = useState("")
    const [validId, setValidId] = useState(false)

    const handleId  = (e: { target: { value: string } }) => {
        if (e.target.value.length < 0){
            setEmptyId(true)
            setValidId(false)
            return
        }
        setValidId(true)
        setEmptyId(false)
        setId(e.target.value)
    }

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
            }
        }
    }

    const handleName = (e: {target: { value: string }}) => {
        if (e.target.value.length < 0){
            setEmptyName(true)
            setValidName(false)
            return
        }
        setValidName(true)
        setEmptyName(false)
        setName(e.target.value)
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
                        <input name="name" type="text" onChange={handleId} onBlur={handleId} placeholder="Identificador" required
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
                        <label className="font-medium">Nombre</label>
                        <input name="name" type="text" onChange={handleName} onBlur={handleName} placeholder="Nombre" required
                                    className={`transition easy-in-out duration-200
                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                    shadow-sm rounded-lg ${
                                        emptyName
                                        ? "border-[#d6d3d1]"
                                        : validName
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
                    <button 
                        onClick={createDeviceButton} 
                        className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            Añadir Dispositivo
                    </button>
                </div>
            </Dialog>
        )
    }


    const createDeviceButton = async () => {
        setEmptyName(true)
        setEmptyIp(true)
        setEmptyId(true)
        if (validName && validIp && validId) {
            const token = getCookie("token")
            let addDevice = await createDevice(id, name, ip, token as string)
            if (addDevice) {
                fetchDevices(token as string)
                setIsOpenAddDeviceDialog(false)
            }
        }
    }


    // ---------------------------------------------------------------------------------------------
    const [rotation, setRotation] = useState(180)
    const updateDevicesButton = async () => {
        const token = getCookie("token")
        const devices = await getDevices(token as string)
        if (devices === undefined) {
            console.log("No se han obtenido los dispositivos")
            setDevices([])
        } else {
            setDevices(devices)
            setShowDevicesInfo(devices.map(() => true))
        }
        setRotation(rotation == 180 ? -180 : 180);
    }

    // ----------------------------------- Boton para añadir un area -------------------------------
    const [areas, setAreas] = useState<[Area]>([{id: "", name: "", user: "", color: ""}])

    const fetchAreas = async (token: string) => {
        const areas = await getAreas(token)
        setAreas(areas)
    }

    // ---------------------------------------------------------------------------------------------

    return (
        <main className="h-full">
            <ToastContainer />
            <div className="w-full h-full flex flex-col gap-y-2">
                {AddDeviceDialog()}
                <div className="">
                    <div className="flex gap-3 justify-end flex-grow">
                        <button 
                            onClick={handleAddDeviceButton} 
                            className="w-12 h-12 flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                <IoIosAddCircleOutline size={24} className="w-6"/>
                        </button>
                        <button
                            onClick={updateDevicesButton}
                            className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}
                            >
                            <ArrowPathIcon
                                className={`w-6`} 
                                style={{ transition: 'transform 0.7s ease', transform: `rotate(${rotation}deg)`}}/>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full p-4 justify-center items-center md:items-start grid md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4 overflow-y-auto">
                {
                    devices.map((devices, index) => {
                        return (
                            <div
                            style={
                                {
                                    background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                                }
                            }
                             key={index} className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                                <div className="w-full h-full ">
                                    <Link
                                        key={devices}
                                        href={showDevicesInfo[index] ? "/dashboard/devices/elem?id=" + devices.id : "#"}
                                        className=""
                                    >
                                        {DeviceInfo(devices)}
                                    </Link>
                                </div>
                                <div className="w-full h-14 bg-white border-t">
                                    <h1 className="w-full h-full flex px-4 text-lg justify-center items-center">{devices.name}</h1>
                                </div>
                            </div>
                            
                        )
                    })
                }
                    {/* <div
                        style={
                            {
                                background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                            }
                        }
                        className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                    </div>
                    <div
                        style={
                            {
                                background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                            }
                        }
                        className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                    </div>
                    <div
                        style={
                            {
                                background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                            }
                        }
                        className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                    </div>
                    <div
                        style={
                            {
                                background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                            }
                        }
                        className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                    </div>
                    <div
                        style={
                            {
                                background: "linear-gradient(157deg, rgba(224,243,255,1) 0%, rgba(177,177,255,1) 100%)",
                            }
                        }
                        className="w-full max-w-96 border flex flex-col h-64 shadow-md hover:shadow-lg transition ease-in-out duration-150 hover:border-indigo-600 rounded-md overflow-hidden">
                    </div> */}
                
                </div>
            </div>
        </main>
    )
}