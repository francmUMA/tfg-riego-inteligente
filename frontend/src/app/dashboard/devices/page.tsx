'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDevices, checkIP, createDevice, deleteDevice, updateDevicePosition, updateDeviceIp, testDeviceConnection, updateDeviceArea } from "../../lib/devicesUtils"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { EllipsisVerticalIcon, SignalIcon, SignalSlashIcon, EnvelopeIcon, MapPinIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import { Dialog, DialogTitle } from "@mui/material"
import { MdAddLocationAlt } from "react-icons/md";
import { Area, addArea, getAreas } from "../../lib/areasUtils"

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
        fetchAreas(token as string)
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
    const [id, setId] = useState("")
    const [validId, setValidId] = useState(false)
    const [emptyId, setEmptyId] = useState(true)

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
                <button onClick={() => openUpdateAreaDialog(id)} className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Ajustar posición</button>
                <button onClick={() => openUpdateIpDialog(id)} className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Modificar IP</button>
                <button onClick={() => testConnectionButton(id)} className="w-full h-full border bg-white text-gray-400 hover:bg-gray-50 rounded-md"> Test de conexion </button>
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
    // ----------------------------- Update IP -----------------------------------------------------
    const [newIp, setNewIp] = useState("")
    const [validNewIp, setValidNewIp] = useState(false)
    const [emptyNewIp, setEmptyNewIp] = useState(true)
    const [IsOpenUpdateIpDialog, setIsOpenUpdateIpDialog] = useState(false)

    const handleNewIP = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyNewIp(true)
            setValidNewIp(false)
        } else {
            setEmptyNewIp(false)
            let check = checkIP(e.target.value as string)
            if (check) {
                setValidNewIp(true)
                setNewIp(e.target.value)
            } else {
                setValidNewIp(false)
            }
        }
    }

    const openUpdateIpDialog = (id: string) => {
        setIsOpenUpdateIpDialog(true)
        setCurrentId(id)
    }

    const closeUpdateIpDialog = () => {
        setIsOpenUpdateIpDialog(false)
    }

    const updateIpButton = async (id: string, ip: string) => {
        setEmptyNewIp(true)
        setValidNewIp(false)
        const token = getCookie("token")
        let res = await updateDeviceIp(id, ip, token as string)
        if (res) {
            alert("Dirección IP actualizada correctamente")
        } else {
            alert("No se ha podido actualizar el dispositivo")
        }
        closeUpdateIpDialog()
    }

    const UpdateIpDialog = () => {
        return (
            <Dialog open={IsOpenUpdateIpDialog} onClose={closeUpdateIpDialog}>
                <DialogTitle className="w-full h-full border-b">Añade la información del dispositivo</DialogTitle>
                <div className={`p-5 w-full h-full col-span-2 flex justify-center ${
                    IsOpenUpdateIpDialog ? "flex flex-col gap-5 justify-center items-center" : "hidden"
                    }`}>
                    <div className="w-full h-full flex flex-col">
                        <label className="font-medium">Nueva dirección IP</label>
                        <input name="id" type="text" onChange={handleNewIP} onBlur={handleNewIP} placeholder="Nueva dirección IP" required
                                    className={`transition easy-in-out duration-200
                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                    shadow-sm rounded-lg ${
                                        emptyNewIp
                                        ? "border-[#d6d3d1]"
                                        : validNewIp
                                            ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                            : "border-red-500 text-red-500 bg-gray-500/5"
                        }`}/>
                    </div>
                    <button onClick={() => updateIpButton(currentId, newIp)} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Actualizar Dispositivo</button>
                </div>
            </Dialog>
        )
    }

    // ---------------------------------------------------------------------------------------------
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

    //----------------------------------------------------------------------------------------------
    // ----------------------------------- Test de Conexion Boton ----------------------------------
    const testConnectionButton = async (id: string) => {
        const token = getCookie("token")
        let res = await testDeviceConnection(id, token as string)
        if (res) {
            alert("El dispositivo está conectado")
        } else {
            alert("El dispositivo no está conectado")
        }
    }
    //----------------------------------------------------------------------------------------------
    // ----------------------------------- Boton para añadir un area -------------------------------
    const [IsOpenAddAreaDialog, setIsOpenAddAreaDialog] = useState(false)
    const [areas, setAreas] = useState<[Area]>([{id: 0, name: ""}])
    const [areaId, setAreaId] = useState("")
    const [validAreaId, setValidAreaId] = useState(false)
    const [emptyAreaId, setEmptyAreaId] = useState(true)
    const [areaName, setAreaName] = useState("")
    const [validAreaName, setValidAreaName] = useState(false)
    const [emptyAreaName, setEmptyAreaName] = useState(true)

    const fetchAreas = async (token: string) => {
        const areas = await getAreas(token)
        setAreas(areas)
    }

    const openAddAreaDialogButton = () => {
        setIsOpenAddAreaDialog(true)
    }
    const closeAddAreaDialog = () => {
        setIsOpenAddAreaDialog(false)
    }

    const handleAreaId = (e: { target: { value: string } }) => {
        if (e.target.value == ""){
            setEmptyAreaId(true)
            setValidAreaId(false)
        } else {
            setEmptyAreaId(false)
            // Comprobar que el id no existe en las areas
            let exists = areas.find((area: any) => area.id == e.target.value)
            if (exists) {
                setValidAreaId(false)
            } else {
                setValidAreaId(true)
                setAreaId(e.target.value)
            }
        }
    }

    const handleAreaName = (e: { target: { value: string } }) => {
        if (e.target.value == ""){
            setEmptyAreaName(true)
            setValidAreaName(false)
        } else {
            setEmptyAreaName(false)
            let exists = areas.find((area: any) => area.name == e.target.value)
            if (exists || e.target.value.length > 45) {
                setValidAreaName(false)
            } else {
                setValidAreaName(true)
                setAreaName(e.target.value)
            }
        }
    }

    const handleAddAreaButton = async () => {
        if (validAreaId && validAreaName) {
            // Añadir el area
            const token = getCookie("token")
            let res = await addArea(areaId, areaName, token as string)
            if (res) {
                alert("Area añadida correctamente")
            } else {
                alert("No se ha podido añadir el area")
            }
            closeAddAreaDialog()
        }
    }

    const AddAreaDialog = () => {
        return (
            <Dialog open={IsOpenAddAreaDialog} onClose={closeAddAreaDialog}>
                <DialogTitle className="w-full h-full border-b">Añade la información de la nueva zona</DialogTitle>
                <div className={`p-5 w-full h-full col-span-2 flex flex-col gap-5 justify-center`}>
                    <div className="w-full h-full flex flex-col">
                        <label className="font-medium">Identificador</label>
                        <input name="id" type="text" onChange={handleAreaId} onBlur={handleAreaId} placeholder="Identificador" required
                                    className={`transition easy-in-out duration-200
                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                    shadow-sm rounded-lg ${
                                        emptyAreaId
                                        ? "border-[#d6d3d1]"
                                        : validAreaId
                                            ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                            : "border-red-500 text-red-500 bg-gray-500/5"
                        }`}/>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <label>Nombre</label>
                        <input name="id" type="text" onChange={handleAreaName} onBlur={handleAreaName} placeholder="Nombre" required
                                className={`transition easy-in-out duration-200
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                shadow-sm rounded-lg ${
                                    emptyAreaName
                                    ? "border-[#d6d3d1]"
                                    : validAreaName
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                        }`}/>
                    </div>
                    <button onClick={handleAddAreaButton} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                        Añadir Zona
                    </button>
                </div>
            </Dialog>
        )
    }
    // ---------------------------------------------------------------------------------------------
    // ------------------- Update Device Position -------------------
    const [newArea, setNewArea] = useState(areas[0].id)
    const [IsOpenUpdateAreaDialog, setIsOpenUpdateAreaDialog] = useState(false)
    const [currentId, setCurrentId] = useState("")

    const handleUpdateArea = async () => {
        const token = getCookie("token");
        let res = await updateDeviceArea(currentId, newArea, token as string)
        if (res) {
            alert("Zona actualizada correctamente")
            let newDevices = await getDevices(token as string)
            setDevices(newDevices)
            closeUpdateAreaDialog()
        } else {
            alert("No se ha podido actualizar la zona")
        }
    }

    const handleSelectNewArea = (e: any) => {
        setNewArea(e.target.value)
    }

    const closeUpdateAreaDialog = async () => {
        setIsOpenUpdateAreaDialog(false)
        setNewArea(areas[0].id)
    }

    const openUpdateAreaDialog = (index: string) => {
        setCurrentId(index)
        setIsOpenUpdateAreaDialog(true)
    }

    const UpdateDeviceAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateAreaDialog} onClose={closeUpdateAreaDialog}>
                <DialogTitle className="w-full h-full border">Modifica la zona del sensor</DialogTitle>
                <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <div className="w-full h-full">
                        <label className="font-medium">Elige una zona</label>
                    </div>
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <select className="w-full h-10" onChange={handleSelectNewArea}>
                            {
                                areas.map((area, index) => {
                                    return (
                                        <option key={index} value={area.id}>{area.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={handleUpdateArea} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            <p>Actualizar Zona</p>
                        </button>
                    </div>
                </div>
            </Dialog>
        )
    }

    // ---------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------

    return (
        <main className="">
            {AddDeviceDialog()}
            {UpdateDeviceAreaDialog()}
            {UpdateIpDialog()}
            {AddAreaDialog()}
            <div className="flex flex-row justify-between py-4">
                <button onClick={handleAddDeviceButton} className="w-1/3 h-12 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Añadir Dispositivo</button>
                <div className="flex gap-3 justify-end flex-grow">
                    <button 
                        onClick={openAddAreaDialogButton}
                        className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                        <MdAddLocationAlt size={24} className="w-6"/>
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
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                devices.map((devices, index) => {
                    return (
                            <div className="w-full h-full border rounded-md bg-gray-50 flex justify-center items-center grid grid-rows-4 hover:bg-gray-100">
                                <div className="w-full h-full row-span-3">
                                    <Link
                                        key={devices}
                                        href={showDevicesInfo[index] ? "/dashboard/devices/elem?id=" + devices.id : "#"}
                                        className=""
                                    >
                                        {showDevicesInfo[index] ? DeviceInfo(devices) : manageButton(devices.id)}
                                    </Link>
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
                    )
                })
            }
            </div>
        </main>
    )
}