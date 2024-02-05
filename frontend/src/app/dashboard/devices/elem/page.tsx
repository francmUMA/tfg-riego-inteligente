'use client'
import { deleteDevice, getDeviceCpuTemperature, getDeviceInfo } from "@/src/app/lib/devicesUtils";
import { addSensor, checkSensorId, getSensors } from "@/src/app/lib/sensorsUtils";
import { checkToken } from "@/src/app/lib/token";
import { ChartComponent } from "@/src/app/ui/dashboard/devicesCharts";

import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon, WifiIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogTitle } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";


export default function Page() {
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [device, setDevice] = useState({});
    const [deviceCpuTemp, setDeviceCpuTemp] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async (token: string) => {
            let res = await checkToken(token)
            if (!res) {
                router.push("/login");
            }
        }

        // Verificar el token de autenticación
        const token = getCookie("token");
        if (token === undefined) {
            router.push("/login");
        }
        verifyToken(token as string);
        

        // Recuperar el identificador del dispositivo de la URL
        const url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        if (id === null) {
            router.push("/dashboard/devices")
        }
        setDeviceId(id)

        // Obtener los datos del dispositivo
        const fetchDeviceInfo = async (id: string, token: string) => {
            let deviceInfo = await getDeviceInfo(id, token)
            setDevice(deviceInfo)
        }
        fetchDeviceInfo(id as string, token as string)

        // Obtener los datos de la temperatura del CPU
        const fetchDeviceCpuTemp = async (id: string, token: string) => {
            let deviceCpuTemp = await getDeviceCpuTemperature(id, token)
            setDeviceCpuTemp(deviceCpuTemp)
        }
        fetchDeviceCpuTemp(id as string, token as string)
        fetchDeviceSensors(id as string, token as string)
    }, [deviceId]) 

    // ------------------------------ ROTATION ------------------------------
    const [rotation, setRotation] = useState(0);
    //-----------------------------------------------------------------------
    //------------------------------- Update Info ---------------------------
    const updateInfo = async () => {
        const token = getCookie("token");
        let deviceInfo = await getDeviceInfo(deviceId as string, token as string)
        setDevice(deviceInfo)
        let deviceCpuTemp = await getDeviceCpuTemperature(deviceId as string, token as string)
        setDeviceCpuTemp(deviceCpuTemp)
        let deviceSensors = await getSensors(deviceId as string, token as string)
        setDeviceSensors(deviceSensors)
        setRotation(rotation + 180)
    }
    //-----------------------------------------------------------------------
    // ------------------------------ Eliminar dispositivo ------------------
    const [IsOpenDeleteDeviceDialog, setIsOpenDeleteDeviceDialog] = useState(false);

    const closeDeleteDeviceDialog = () => {
        setIsOpenDeleteDeviceDialog(false);
    }

    const deleteDeviceButton = async () => {
        setIsOpenDeleteDeviceDialog(true);
    }

    const confirmDeleteDevice = async () => {
        const token = getCookie("token");
        // Eliminar el dispositivo
        let res = await deleteDevice(deviceId as string, token as string)
        if (res) {
            alert("Dispositivo eliminado correctamente")
        } else {
            alert("Error al eliminar el dispositivo")
        }

        // Cerrar el diálogo
        closeDeleteDeviceDialog();

        // Redirigir a la página de dispositivos
        if (res) {
            router.push("/dashboard/devices")
        }
    }

    const deleteDeviceDialog = () => {
        return (
            <Dialog open={IsOpenDeleteDeviceDialog} onClose={closeDeleteDeviceDialog}>
                <DialogTitle className="w-full h-full">¿Seguro que deseas eliminar este dispositivo?</DialogTitle>
                <div className="flex flex-row p-4 gap-4">
                    <button onClick={closeDeleteDeviceDialog} className="w-1/2 h-12 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                        <p>Cancelar</p>
                    </button>
                    <button onClick={confirmDeleteDevice} className="w-1/2 h-12 text-white rounded-md bg-red-600 hover:bg-red-500 duration-150">
                        <p>Eliminar</p>
                    </button>

                </div>
            </Dialog>
        )
    }

    //-----------------------------------------------------------------------
    // ------------------------------ Graficos ------------------------------
    const fallback_component = () => {
        return (
            <p>Loading...</p>
        )
    }
    //---------------------------------------------------------------------------
    // ------------------------------ Sensores -----------------------------------
    const [deviceSensors, setDeviceSensors] = useState([])

    const fetchDeviceSensors = async (id: string, token: string) => {
        let res = await getSensors(id, token)
        setDeviceSensors(res)
    }
    //--------------------------------------------------------------------------------------------------
    // ------------------------------ Añadir sensores o actuadores -------------------------------------
    const [sensorActuador, setSensorActuador] = useState(true)
    const [IsOpenSensorActuadorDialog, setIsOpenSensorActuadorDialog] = useState(false)

    const [sensorId, setSensorId] = useState("")
    const [validSensorId, setValidSensorId] = useState(false)
    const [emptySensorId, setEmptySensorId] = useState(true)


    const [actudadorId, setActuadorId] = useState("")
    const [validActuadorId, setValidActuadorId] = useState(false)
    const [emptyActuadorId, setEmptyActuadorId] = useState(true)

    const [sensorType, setSensorType] = useState("DHT")

    const closeSensorActuadorDialog = () => {
        setIsOpenSensorActuadorDialog(false);
    }

    const addSensorActuador = () => {
        setIsOpenSensorActuadorDialog(true);
    }
    
    const handleSelectSensorActuador = (e: any) => {
        if (e.target.value == "sensor") {
            setSensorActuador(true)
        } else {
            setSensorActuador(false)
        }
    }

    const handleSelectType = (e: any) => {
        if (e.target.value == "0") {
            setSensorType("DHT")
        } else if (e.target.value == "1") {
            setSensorType("TMP")
        } else {
            setSensorType("CAU")
        }
    }

    const handleSensorId = async (e: any) => {
        if (e.target.value == "") {
            setEmptySensorId(true)
            setValidSensorId(false)
        } else {
            let check = await checkSensorId(deviceSensors, e.target.value)
            if (check) {
                setEmptySensorId(false)
                setValidSensorId(true)
                setSensorId(e.target.value)
            } else {
                setEmptySensorId(false)
                setValidSensorId(false)
            }
        }
    }

    const handleAddSensor = async () => {
        console.log(sensorType)
        if (validSensorId) {
            const token = getCookie("token");
            let res = await addSensor(sensorId, deviceId as string, token as string, sensorType)
            if (res) {
                alert("Sensor añadido correctamente")
            } else {
                alert("Error al añadir el sensor")
            }
            closeSensorActuadorDialog()
        }
    }

    const SensorActuadorDialog = () => {
        return (
            <Dialog open={IsOpenSensorActuadorDialog} onClose={closeSensorActuadorDialog}>
                <DialogTitle className="w-full h-full border">Añade un nuevo elemento</DialogTitle>
                <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <div className="w-full h-full">
                        <label className="font-medium">Tipo de dispositivo</label>
                    </div>
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <select className="w-full h-10" onChange={handleSelectSensorActuador}>
                            <option value="sensor">Sensor</option>
                            <option value="actuador">Actuador</option>
                        </select>
                        {
                            sensorActuador
                                ?   <div className="w-full h-full flex flex-col">
                                        <label className="font-medium">Identificador</label>
                                        <input onChange={handleSensorId} onBlur={handleSensorId} name="id" type="text" placeholder="Identificador" required
                                                    className={`transition easy-in-out duration-200
                                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                                    shadow-sm rounded-lg${
                                                        emptySensorId
                                                            ? "border-[#d6d3d1]"
                                                            : validSensorId
                                                                ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                                                : "border-red-500 text-red-500 bg-gray-500/5"
                                                    }`}/>
                                        <div className="w-full h-full flex flex-col gap-2 pt-2">
                                            <label className="font-medium ">Tipo de sensor</label>
                                            <select className="w-full h-10" onChange={handleSelectType}>
                                                <option value="0">Humedad</option>
                                                <option value="1">Temperatura</option>
                                                <option value="2">Caudalímetro</option>
                                            </select>
                                            <div className="w-full h-full pt-3">
                                                <button onClick={handleAddSensor} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                                    Añadir sensor
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                :   <div className="w-full h-full flex flex-col">
                                        <label className="font-medium">Identificador</label>
                                        <input name="id" type="text" placeholder="Identificador" required
                                                    className={`transition easy-in-out duration-200
                                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                                    shadow-sm rounded-lg`}/>
                                        <div className="w-full h-full flex flex-col pt-3">
                                            <button className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                                Añadir actuador
                                            </button>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            </Dialog>
        )
    }
    //--------------------------------------------------------------------------------------------------

    return (
        <main className="h-full w-full">
            <div className="w-full h-full p-4 flex flex-col gap-3">
                {deleteDeviceDialog()}
                {SensorActuadorDialog()}
                <div className="w-full h-12 flex flex-row flex-grow gap-3">
                    <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon onClick={() => {
                            router.push("/dashboard/devices")
                        }} className={`w-6 text-indigo-600`}/>
                    </button>
                    <div className="flex gap-3 justify-end flex-grow">
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <MapPinIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button onClick={addSensorActuador}  className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <PlusCircleIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button
                            onClick={() => {deleteDeviceButton()}} 
                            className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-50 border-red-500 duration-150`}>
                            <XMarkIcon className={`w-6 text-red-500`}/>
                        </button>
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <ArrowPathIcon
                            className={`w-6 text-indigo-600`}
                            onClick={() => {updateInfo()}}
                            style={{ transition: 'transform 0.7s ease', transform: `rotate(${rotation}deg)`}}/>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                    <div className="w-full h-16 flex flex-row gap-3 items-center justify-center">
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <WifiIcon className="w-8 text-indigo-600"></WifiIcon>
                            <div className="flex flex-col justify-center">
                                <p className="px-2 text-sm text-slate-400">Estado</p>
                                <p className={`min-w-24 max-w-40 h-1/2 px-2 text-sm rounded-xl shadow-sm ${
                            device.available == true
                                ? "bg-green-300 text-green-600"
                                : "bg-red-300 text-red-600"
                        } flex items-center`}>
                            {device.available == true ? " Connected" : " Not Connected"}
                                </p>
                            </div>
                        </div>
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <EnvelopeIcon className="w-8 text-indigo-600"></EnvelopeIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Dirección IP</p>
                                <p>{device.ip}</p>
                            </div>
                        </div>
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <GlobeAltIcon className="w-8 text-indigo-600"></GlobeAltIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Localizacion</p>
                                <p>(En obras)</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row gap-3 items-center justify-center">
                        <div className="w-full h-60 border shadow-md rounded-md" >
                            
                        </div>
                        <div className="w-full h-60 flex flex-col justify-center items-center border shadow-md rounded-md">
                            <div className="p-3 flex justify-center items-center">
                                <p className="text-slate-400">Sensores</p>
                            </div>
                            {
                                deviceSensors.length > 0
                                    ?   <div className="w-full h-full overflow-y-auto overflow-x-auto rounded-md">
                                            {
                                                deviceSensors.map((sensor, index) => {
                                                    return (
                                                        <div key={index} className={`w-full h-12 flex flex-row gap-3 items-center justify-between ${
                                                            index % 2 == 0
                                                                ? "bg-blue-100"
                                                                : ""
                                                        }`}>
                                                            <p className="px-3 w-full h-full border-r border-indigo-300 flex justify-center items-center">
                                                                {
                                                                    sensor.type == "DHT"
                                                                        ? <WiHumidity size={30} className="w-12 px-2 text-indigo-600"></WiHumidity>
                                                                        : sensor.type == "TMP"
                                                                            ? <FaTemperatureQuarter size={24} className="w-10 px-2 text-indigo-600"></FaTemperatureQuarter>
                                                                            : sensor.type == "CAU"
                                                                                ? <IoWaterOutline size={24} className="w-10 px-2 text-indigo-600"></IoWaterOutline>
                                                                                : <p>?</p>
                                                                }
                                                                {sensor.id}
                                                            </p>
                                                            <p className="px-3 w-full h-full border-r border-indigo-300 flex justify-center items-center">
                                                                <MapPinIcon className="w-9 px-2 text-indigo-600"></MapPinIcon>
                                                            {
                                                                sensor.area == null
                                                                    ? "Sin ubicacion"
                                                                    : sensor.area
                                                            }</p>
                                                            <p className="px-3 w-full h-full flex justify-center items-center">
                                                                <LuPin size={24} className="w-9 px-2 text-indigo-600"></LuPin>
                                                            {
                                                                sensor.device_pin == null
                                                                    ? "Sin conectar"
                                                                    : sensor.device_pin
                                                            }</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    :   <p className="flex w-full h-full justify-center items-center p-3">No hay sensores disponibles</p>
                            }
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row gap-3 items-center justify-center">
                        <div className="w-full h-full flex flex-col justify-center items-center border shadow-md rounded-md">
                            <div className="p-3 flex justify-center items-center">
                                <p className="text-slate-400">Temperatura de la CPU</p>
                            </div>
                            <Suspense fallback={fallback_component()}>
                            {
                                deviceCpuTemp.length > 0
                                    ? <ChartComponent className="w-full h-full flex justify-center items-center p-2" data={deviceCpuTemp}></ChartComponent>
                                    : <p className="flex w-full h-full justify-center items-center p-3">No hay datos para mostrar</p>
                            }
                            </Suspense>
                        </div>
                        <div className="w-full h-full flex justify-center items-center border shadow-md rounded-md">
                            <p>En obras</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}