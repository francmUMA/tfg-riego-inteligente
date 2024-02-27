'use client'
import { deleteDevice, getDeviceCpuTemperature, getDeviceInfo, updateDeviceArea } from "@/src/app/lib/devicesUtils";
import { Sensor, addSensor, checkSensorId, deleteSensor, getSensors, updateSensorArea, updateSensorPin } from "@/src/app/lib/sensorsUtils";
import { checkToken } from "@/src/app/lib/token";
import { ChartComponent } from "@/src/app/ui/dashboard/devicesCharts";
import { ElemPlacer } from "@/src/app/ui/dashboard/ElemPlacer"

import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon, WifiIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogTitle } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosCellular } from "react-icons/io";

import { Actuador, addActuador, checkActuador, deleteActuador, getActuadores, updateActuadorArea, updateActuadorMode, updateActuadorPin } from "@/src/app/lib/actuadorUtils";
import { Area, getAreas } from "@/src/app/lib/areasUtils";


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
        fetchDeviceActuadores(id as string, token as string)
        fetchAreas()
    }, [deviceId, router]) 

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
        let deviceActuadores = await getActuadores(deviceId as string, token as string)
        setDeviceActuadores(deviceActuadores)
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
    const [deviceSensors, setDeviceSensors] = useState<[Sensor]>([{id: "", type: "", area: 0, device_pin: 0, device: 0}])

    const fetchDeviceSensors = async (id: string, token: string) => {
        let res = await getSensors(id, token)
        setDeviceSensors(res)
    }
    //--------------------------------------------------------------------------------------------------
    // ------------------------------ Actuadores -------------------------------------------
    const [deviceActuadores, setDeviceActuadores] = useState<[Actuador]>([{id: "", area: 0, device_pin: 0, device: 0, mode: 0}])

    const fetchDeviceActuadores = async (id: string, token: string) => {
        let res = await getActuadores(id, token)
        setDeviceActuadores(res)
    }

    //--------------------------------------------------------------------------------------------------
    // ------------------------------ Añadir sensores o actuadores -------------------------------------
    const [sensorActuador, setSensorActuador] = useState(true)
    const [IsOpenSensorActuadorDialog, setIsOpenSensorActuadorDialog] = useState(false)

    const [sensorId, setSensorId] = useState("")
    const [validSensorId, setValidSensorId] = useState(false)
    const [emptySensorId, setEmptySensorId] = useState(true)


    const [actuadorId, setActuadorId] = useState("")
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

    const handleActuadorId = (e: any) => {
        if (e.target.value == "") {
            setEmptyActuadorId(true)
            setValidActuadorId(false)
        } else {
            setEmptyActuadorId(false)
            let check = checkActuador(deviceActuadores, e.target.value)
            if (check) {
                setValidActuadorId(true)
                setActuadorId(e.target.value)
            } else {
                setValidActuadorId(false)
            }
        }
    }

    const handleAddActuador = async () => {
        if (validActuadorId) {
            const token = getCookie("token");
            let res = await addActuador(actuadorId, deviceId as string, token as string)
            if (res) {
                alert("Actuador añadido correctamente")
            } else {
                alert("Error al añadir el actuador")
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
                                                    shadow-sm rounded-lg ${
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
                                        <input onChange={handleActuadorId} onBlur={handleActuadorId} name="id" type="text" placeholder="Identificador" required
                                                    className={`transition easy-in-out duration-200
                                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                                    shadow-sm rounded-lg ${
                                                        emptyActuadorId
                                                            ? "border-[#d6d3d1]"
                                                            : validActuadorId
                                                                ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                                                : "border-red-500 text-red-500 bg-gray-500/5"
                                                    }`}/>
                                        <div className="w-full h-full flex flex-col pt-3">
                                            <button onClick={handleAddActuador} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
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
    //----------------------------------------------------------------------------------
    // ------------------------------ Modificar modo -----------------------------------
    const handleActuadorMode = async (index: number) => {
        const token = getCookie("token");
        let actuador = deviceActuadores[index]
        let res = await updateActuadorMode(actuador.id, actuador.mode ? 0 : 1, token as string)
        if (res) {
            let newActuadores = await getActuadores(deviceId as string, token as string)
            setDeviceActuadores(newActuadores)
        } 
    }
    // ---------------------------------------------------------------------------------
    // ------------------------------ Modificar Pin ------------------------------------
    const [newActuadorPin, setNewActuadorPin] = useState(1)

    const [IsOpenUpdateActuadorPinDialog, setIsOpenUpdateActuadorPinDialog] = useState(false)
    const [actuadorIndex, setActuadorIndex] = useState(0)

    const handleActuadorPin = async () => {
        const token = getCookie("token");
        let actuador = deviceActuadores[actuadorIndex]
        let res = await updateActuadorPin(actuador.id, newActuadorPin, token as string)
        if (res) {
            let newActuadores = await getActuadores(deviceId as string, token as string)
            setDeviceActuadores(newActuadores)
            closeUpdateActuadorPinDialog()
        }
    }

    const handleSelectNewActuadorPin = (e: any) => {
        setNewActuadorPin(e.target.value)
    }

    const closeUpdateActuadorPinDialog = async () => {
        setIsOpenUpdateActuadorPinDialog(false)
        setNewActuadorPin(1)
    }

    const handleOpenUpdateActuadorPinDialogButton = (index: number) => {
        setActuadorIndex(index)
        setIsOpenUpdateActuadorPinDialog(true)
    }

    const updateActuadorPinDialog = () => {
        return (
            <Dialog open={IsOpenUpdateActuadorPinDialog} onClose={closeUpdateActuadorPinDialog}>
                <DialogTitle className="w-full h-full border">Añade un nuevo pin</DialogTitle>
                <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <div className="w-full h-full">
                        <label className="font-medium">Elige un pin</label>
                    </div>
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <select className="w-full h-10" onChange={handleSelectNewActuadorPin}>
                            {
                                Array.from({length: 40}, (_, i) => i + 1).map((pin, index) => {
                                    return (
                                        <option key={index} value={pin}>{pin}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={handleActuadorPin} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            <p>Actualizar pin</p>
                        </button>
                    </div>
                </div>
            </Dialog>
        )
    }
    // ---------------------------------------------------------------------------------
    // ------------------------------ Area ---------------------------------------------
    const [areas, setAreas] = useState<[Area]>([{id: 0, name: ""}])

    const fetchAreas = async () => {
        const token = getCookie("token")
        let res = await getAreas(token as string)
        if (res.length > 0) {
        setAreas(res)
        setNewActuadorArea(res[0].id)
        } else {
            setAreas([{id: 0, name: ""}])
        }
    }

    // ------------------------------ Modificar Area -----------------------------------
    const [newActuadorArea, setNewActuadorArea] = useState(areas[0] === undefined ? 0 : areas[0].id)
    const [IsOpenUpdateActuadorAreaDialog, setIsOpenUpdateActuadorAreaDialog] = useState(false)

    const handleActuadorArea = async () => {
        const token = getCookie("token");
        let actuador = deviceActuadores[actuadorIndex]
        let res = await updateActuadorArea(actuador.id, newActuadorArea, token as string)
        if (res) {
            let newActuadores = await getActuadores(deviceId as string, token as string)
            setDeviceActuadores(newActuadores)
            closeUpdateActuadorAreaDialog()
        }
    }

    const handleSelectNewActuadorArea = (e: any) => {
        setNewActuadorArea(e.target.value)
    }

    const closeUpdateActuadorAreaDialog = async () => {
        setIsOpenUpdateActuadorAreaDialog(false)
        setNewActuadorArea(areas[0].id)
    }

    const handleOpenUpdateActuadorAreaDialogButton = (index: number) => {
        setActuadorIndex(index)
        setIsOpenUpdateActuadorAreaDialog(true)
    }

    const updateActuadorAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateActuadorAreaDialog} onClose={closeUpdateActuadorAreaDialog}>
                <DialogTitle className="w-full h-full border">Modifica la zona del actuador</DialogTitle>
                {/* <ElemPlacer /> */}
            </Dialog>
        )
    }
    // ----------------------------------------------------------------------------------------------------
    // ------------------------------ Modificar area del sensor -------------------------------------------
    const [newSensorArea, setNewSensorArea] = useState(areas[0] === undefined ? 0 : areas[0].id)
    const [IsOpenUpdateSensorAreaDialog, setIsOpenUpdateSensorAreaDialog] = useState(false)
    const [sensorIndex, setSensorIndex] = useState(0)

    const handleSensorArea = async () => {
        const token = getCookie("token");
        let sensor = deviceSensors[sensorIndex]
        let res = await updateSensorArea(sensor.id, newSensorArea, token as string)
        if (res) {
            let newSensors = await getSensors(deviceId as string, token as string)
            setDeviceSensors(newSensors)
            closeUpdateSensorAreaDialog()
        }
    }

    const handleSelectNewSensorArea = (e: any) => {
        console.log(e.target.value)
        setNewSensorArea(e.target.value)
    }

    const closeUpdateSensorAreaDialog = async () => {
        setIsOpenUpdateSensorAreaDialog(false)
        setNewSensorArea(areas[0].id)
    }

    const handleOpenUpdateSensorAreaDialogButton = (index: number) => {
        setSensorIndex(index)
        setIsOpenUpdateSensorAreaDialog(true)
    }

    const updateSensorAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateSensorAreaDialog} onClose={closeUpdateSensorAreaDialog}>
                <DialogTitle className="w-full h-full border">Modifica la zona del sensor</DialogTitle>
                {/* <ElemPlacer /> */}
            </Dialog>
        )
    }

    // ----------------------------------------------------------------------------------------------------
    // ------------------------------ Modificar pin del sensor --------------------------------------------
    const [newSensorPin, setNewSensorPin] = useState(1)

    const [IsOpenUpdateSensorPinDialog, setIsOpenUpdateSensorPinDialog] = useState(false)

    const handleSensorPin = async () => {
        const token = getCookie("token");
        let sensor = deviceSensors[sensorIndex]
        let res = await updateSensorPin(sensor.id, newSensorPin, token as string)
        if (res) {
            let newSensors = await getSensors(deviceId as string, token as string)
            setDeviceSensors(newSensors)
            closeUpdateSensorPinDialog()
        }
    }

    const handleSelectNewSensorPin = (e: any) => {
        setNewSensorPin(e.target.value)
    }

    const closeUpdateSensorPinDialog = async () => {
        setIsOpenUpdateSensorPinDialog(false)
        setNewSensorPin(1)
    }

    const handleOpenUpdateSensorPinDialogButton = (index: number) => {
        setSensorIndex(index)
        setIsOpenUpdateSensorPinDialog(true)
    }

    const updateSensorPinDialog = () => {
        return (
            <Dialog open={IsOpenUpdateSensorPinDialog} onClose={closeUpdateSensorPinDialog}>
                <DialogTitle className="w-full h-full border">Añade un nuevo pin</DialogTitle>
                <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <div className="w-full h-full">
                        <label className="font-medium">Elige un pin</label>
                    </div>
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <select className="w-full h-10" onChange={handleSelectNewSensorPin}>
                            {
                                Array.from({length: 40}, (_, i) => i + 1).map((pin, index) => {
                                    return (
                                        <option key={index} value={pin}>{pin}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={handleSensorPin} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            <p>Actualizar pin</p>
                        </button>
                    </div>
                </div>
            </Dialog>
        )
    }
    // ----------------------------------------------------------------------------------------------------
    // ------------------------------ Eliminar un elemento ------------------------------------------------
    const [IsOpenDeleteElemDialog, setIsOpenDeleteElemDialog] = useState(false)

    const closeDeleteElemDialog = () => {
        setIsOpenDeleteElemDialog(false)
        setSensorIndex(0)
        setActuadorIndex(0)
    }

    const confirmDeleteElem = async () => {
        const token = getCookie("token")
        if (sensorActuador) {
            let res = await deleteSensor(deviceSensors[sensorIndex].id, deviceId as string, token as string)
            if (res) {
                let newSensors = await getSensors(deviceId as string, token as string)
                setDeviceSensors(newSensors)
            }
        } else {
            let res = await deleteActuador(deviceActuadores[actuadorIndex].id, deviceId as string, token as string)
            if (res) {
                let newActuadores = await getActuadores(deviceId as string, token as string)
                setDeviceActuadores(newActuadores)
            }
        }
        closeDeleteElemDialog()
    }

    const handleOpenDeleteElemDialogButton = (index: number, sensor: boolean) => {
        if (sensor) {
            setSensorActuador(true)
            setSensorIndex(index)
        } else {
            setSensorActuador(false)
            setActuadorIndex(index)
        }
        setIsOpenDeleteElemDialog(true)
    }

    const DeleteElemDialog = () => {
        return (
            <Dialog open={IsOpenDeleteElemDialog} onClose={closeDeleteElemDialog}>
                <DialogTitle className="w-full h-full">¿Seguro que deseas eliminar el {sensorActuador 
                    ? "sensor " + deviceSensors[sensorIndex]?.id
                    : "actuador " + deviceActuadores[actuadorIndex]?.id
                    }?</DialogTitle>
                <div className="flex flex-row p-4 gap-4">
                    <button onClick={closeDeleteElemDialog} className="w-1/2 h-12 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                        <p>Cancelar</p>
                    </button>
                    <button onClick={confirmDeleteElem} className="w-1/2 h-12 text-white rounded-md bg-red-600 hover:bg-red-500 duration-150">
                        <p>Eliminar</p>
                    </button>

                </div>
            </Dialog>
        )
    }
    // ----------------------------------------------------------------------------------------------------
    // ------------------- Update Device Position -------------------
    const [newArea, setNewArea] = useState(areas[0] === undefined ? 0 : areas[0].id)
    const [IsOpenUpdateAreaDialog, setIsOpenUpdateAreaDialog] = useState(false)

    const handleUpdateArea = async () => {
        const token = getCookie("token");
        let res = await updateDeviceArea(deviceId as string, newArea, token as string)
        if (res) {
            alert("Zona actualizada correctamente")
            let newInfo = await getDeviceInfo(deviceId as string, token as string)
            setDevice(newInfo)
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

    const openUpdateAreaDialog = () => {
        setIsOpenUpdateAreaDialog(true)
    }

    const UpdateDeviceAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateAreaDialog} onClose={closeUpdateAreaDialog}>
                <DialogTitle 
                    className="w-96 h-full font-bold text-xl flex justify-center items-center"
                >
                    Coloca el dispositivo
                </DialogTitle>
                <div className="flex items-center justify-center h-96">
                    <ElemPlacer elem={device}/>
                </div>
                
            </Dialog>
        )
    }

    // ---------------------------------------------------------------------------------------------

    return (
        <main className="h-full w-full">
            <div className="w-full h-full p-3 flex flex-col gap-3">
                {deleteDeviceDialog()}
                {SensorActuadorDialog()}
                {updateActuadorPinDialog()}
                {updateActuadorAreaDialog()}
                {updateSensorAreaDialog()}
                {updateSensorPinDialog()}
                {DeleteElemDialog()}
                {UpdateDeviceAreaDialog()}
                <div id="botones" className="w-full h-12 flex flex-row gap-3">
                    <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon onClick={() => {
                            router.push("/dashboard/devices")
                        }} className={`w-6 text-indigo-600`}/>
                    </button>
                    <div className="flex gap-3 justify-end flex-grow">
                        <button onClick={openUpdateAreaDialog} className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
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
                <div id="datos" className="w-full h-full flex flex-col gap-3">
                    <div id="info-general" className="w-full h-96 flex flex-row gap-3 items-center md:justify-center overflow-x-auto">
                        <div className="w-50 h-20 flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
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
                        <div className="w-50 h-20 flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <EnvelopeIcon className="w-8 text-indigo-600"></EnvelopeIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Dirección IP</p>
                                <p>{device.ip}</p>
                            </div>
                        </div>
                        <div className="w-50 h-20 flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <GlobeAltIcon className="w-8 text-indigo-600"></GlobeAltIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Localizacion</p>
                                <p>
                                    { device.area == null
                                        ? "Desconocido"
                                        : areas.map((area) => {
                                            if (area.id == device.area) {
                                                return area.name
                                            }
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="w-50 h-20 flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <IoIosCellular size={26} className="w-9 text-indigo-600"></IoIosCellular>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Elementos</p>
                                <p>
                                    { deviceSensors.length + deviceActuadores.length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="tablas" className="w-full h-full flex flex-col gap-3 items-center justify-center">
                        <div id="actuadores-table" className="w-full h-60 flex flex-col justify-center items-center border shadow-md rounded-md" >
                            <div className="p-3 flex justify-center items-center">
                                <p className="text-slate-400">Actuadores</p>
                            </div>
                            {
                                deviceActuadores.length > 0
                                    ?   <div className="w-full h-full rounded-md overflow-x-scroll">
                                            {
                                                deviceActuadores.map((actuador, index) => {
                                                    return (
                                                        <div key={index} className={`w-dvw md:w-full h-12 flex flex-row gap-3 items-center justify-between ${
                                                            index % 2 == 0
                                                                ? "bg-blue-100"
                                                                : "bg-gray-50"
                                                        }`}>
                                                            <div className="px-3 w-28 h-full flex flex-row justify-between items-center">
                                                                <FaFaucetDrip size={20} className="w-9 text-indigo-600"></FaFaucetDrip>
                                                                {actuador.id}
                                                            </div>
                                                            <div className="px-3 w-48 h-full flex gap-2 items-center">
                                                                <button onClick={() => handleOpenUpdateActuadorAreaDialogButton(index)} className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <MapPinIcon className="w-9 px-2 text-indigo-600"></MapPinIcon>
                                                                </button>
                                                                {
                                                                    actuador.area == null
                                                                        ? "Descolocado"
                                                                        : areas.map((area) => {
                                                                            if (area.id == actuador.area) {
                                                                                return area.name
                                                                            }
                                                                        })
                                                                }
                                                            </div>
                                                            <div className="px-3 w-48 h-full flex flex-row gap-2 items-center">
                                                                <button onClick={() => handleOpenUpdateActuadorPinDialogButton(index)} 
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <LuPin size={24} className="w-9 px-2 text-indigo-600"></LuPin>
                                                                </button>
                                                                {
                                                                    actuador.device_pin == null
                                                                        ? "Desconectado"
                                                                        : actuador.device_pin
                                                                }
                                                            </div>
                                                            <button onClick={() => handleActuadorMode(index)} className="w-16 h-5 flex items-center">
                                                                {
                                                                    actuador.mode == 1
                                                                        ? <FaRobot className="w-full h-full text-indigo-600"></FaRobot>
                                                                        : <FaRobot className="w-full h-full text-indigo-300"></FaRobot>
                                                                }
                                                            </button>
                                                            <div className="px-2 w-12 h-2/3 flex justify-center items-center">
                                                                <button onClick={() => handleOpenDeleteElemDialogButton(index, false)} className="w-full h-full rounded-md flex justify-center items-center shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <FaRegTrashAlt size={24} className="w-9 px-2 text-indigo-600"></FaRegTrashAlt>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    :   <p className="flex w-full h-full justify-center items-center p-3">No hay actuadores disponibles</p>
                            }
                        </div>
                        <div id="sensores-table" className="w-full h-60 flex flex-col justify-center items-center border shadow-md rounded-md">
                            <div className="p-3 flex justify-center items-center">
                                <p className="text-slate-400">Sensores</p>
                            </div>
                            {
                                deviceSensors.length > 0
                                    ?   <div className="w-full h-full overflow-y-auto rounded-md">
                                            {
                                                deviceSensors.map((sensor, index) => {
                                                    return (
                                                        <div key={index} className={`w-dvw md:w-full h-12 flex flex-row gap-3 items-center justify-between ${
                                                            index % 2 == 0
                                                                ? "bg-blue-100"
                                                                : "bg-gray-50"
                                                        }`}>
                                                            <p className="px-3 w-28 h-full flex flex-row justify-center items-center">
                                                                {
                                                                    sensor.type == "DHT"
                                                                        ? <WiHumidity size={24} className="w-9 text-indigo-600"></WiHumidity>
                                                                        : sensor.type == "TMP"
                                                                            ? <FaTemperatureQuarter size={22} className="w-9 text-indigo-600"></FaTemperatureQuarter>
                                                                            : sensor.type == "CAU"
                                                                                ? <IoWaterOutline size={22} className="w-9 text-indigo-600"></IoWaterOutline>
                                                                                : <p>?</p>
                                                                }
                                                                {sensor.id}
                                                            </p>
                                                            <div className="px-3 w-48 h-full flex flex-row gap-2 items-center">
                                                                <button onClick={() => handleOpenUpdateSensorAreaDialogButton(index)} className="h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <MapPinIcon className="w-9 px-2 text-indigo-600"></MapPinIcon>
                                                                </button>
                                                                {
                                                                    sensor.area == null
                                                                        ? "Descolocado"
                                                                        : areas.map((area, index) => {
                                                                            if (area.id == sensor.area) {
                                                                                return area.name
                                                                            }
                                                                        })
                                                                }
                                                            </div>
                                                            <div className="px-3 w-44 h-full flex flex-row gap-2 items-center">
                                                                <button
                                                                    onClick={() => handleOpenUpdateSensorPinDialogButton(index)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <LuPin size={24} className="w-9 px-2 text-indigo-600"></LuPin>
                                                                </button>
                                                                {
                                                                    sensor.device_pin == null
                                                                        ? "Desconectado"
                                                                        : sensor.device_pin
                                                                }
                                                            </div>                                                   
                                                            <div className="px-2 w-12 h-2/3 flex justify-center items-center">
                                                                <button onClick={() => handleOpenDeleteElemDialogButton(index, true)} className="w-full h-full rounded-md flex justify-center items-center shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <FaRegTrashAlt size={24} className="w-9 px-2 text-indigo-600"></FaRegTrashAlt>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    :   <p className="flex w-full h-full justify-center items-center p-3">No hay sensores disponibles</p>
                            }
                        </div>
                    </div>
                    <div id="graficas" className="w-full h-full flex flex-col md:flex-row gap-3 items-center justify-center">
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