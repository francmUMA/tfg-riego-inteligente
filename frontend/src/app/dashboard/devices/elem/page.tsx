'use client'
import { deleteDevice, getDeviceInfo } from "@/src/app/lib/devicesUtils";
import { Sensor, addSensor, checkSensorId, deleteSensor, getSensors } from "@/src/app/lib/sensorsUtils";
import { checkToken } from "@/src/app/lib/token";
import { ElemPlacer } from "@/src/app/ui/dashboard/ElemPlacer"

import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon, WifiIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogTitle } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { IoPauseCircleSharp, IoPlayCircleSharp, IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureArrowDown, FaTemperatureArrowUp, FaWater } from "react-icons/fa6";
import { LuPin } from "react-icons/lu";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosCellular } from "react-icons/io";

import { Actuador, addActuador, checkActuador, deleteActuador, getActuadores, updateActuadorMode, updateActuadorPin, updateActuadorStatus } from "@/src/app/lib/actuadorUtils";
import { Area, getAreas } from "@/src/app/lib/areasUtils";
import ChartDialog from "@/src/app/ui/dashboard/ChartDialog";
import { LogInfo } from "@/src/app/ui/dashboard/info/LogInfo";
import { MdOutlineAddchart } from "react-icons/md";
import { GiWateringCan } from "react-icons/gi"
import { SensorChart } from "@/src/app/ui/dashboard/SensorChart";
import { ActuadorProgramName } from "@/src/app/ui/dashboard/ActuadoresInfo";
import { notify } from "@/src/app/lib/notify";



export default function Page() {
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [device, setDevice] = useState({});
    
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) {
            notify("Sesión expirada", "error")
            router.push("/login")
        }
        const verify = async (token: string) => {
            let check = await checkToken(token)
            if (!check) {
                notify("Sesión expirada", "error")
                router.push("/login")
            } 
        }
        verify(token as string)
        

        // Recuperar el identificador del dispositivo de la URL
        const url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        if (id == null || id == "" || id === undefined) {
            router.push("/dashboard/devices")
        }
        setDeviceId(id)
        // Obtener los datos del dispositivo
        const fetchDeviceInfo = async (id: string, token: string) => {
            let deviceInfo = await getDeviceInfo(id, token)
            setDevice(deviceInfo)
        }
        fetchDeviceInfo(id as string, token as string)

        fetchDeviceSensors(id as string, token as string)
        fetchDeviceActuadores(id as string, token as string)
        fetchAreas()
    }, [deviceId]) 

    // ------------------------------ ROTATION ------------------------------
    const [rotation, setRotation] = useState(0);
    //-----------------------------------------------------------------------
    //------------------------------- Update Info ---------------------------
    const updateInfo = async () => {
        const token = getCookie("token");
        let deviceInfo = await getDeviceInfo(deviceId as string, token as string)
        setDevice(deviceInfo)
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
    // ------------------------------ Sensores -----------------------------------
    const [deviceSensors, setDeviceSensors] = useState<[Sensor]>([{
        id: "", 
        area: "", 
        device: "", 
        Latitud: 0, 
        Longitud: 0, 
        name: "", 
        available: 0
    }])

    const fetchDeviceSensors = async (id: string, token: string) => {
        let res = await getSensors(id, token)
        setDeviceSensors(res)
    }
    //--------------------------------------------------------------------------------------------------
    // ------------------------------ Actuadores -------------------------------------------
    const [deviceActuadores, setDeviceActuadores] = useState<[Actuador]>([{
        id: "", 
        area: "", 
        device_pin: 0, 
        device: "", 
        mode: 0,
        name: "",
        Latitud: 0,
        Longitud: 0,
        status: 0,
        activeProgram: ""
    }])

    const fetchDeviceActuadores = async (id: string, token: string) => {
        let res = await getActuadores(id, token)
        setDeviceActuadores(res)
    }

    //--------------------------------------------------------------------------------------------------
    // ------------------------------ Añadir sensores o actuadores -------------------------------------
    const [sensorActuador, setSensorActuador] = useState(true)
    const [IsOpenSensorActuadorDialog, setIsOpenSensorActuadorDialog] = useState(false)

    const [sensorName, setSensorName] = useState("")
    const [validSensorName, setValidSensorName] = useState(false)
    const [emptySensorName, setEmptySensorName] = useState(true)


    const [actuadorName, setActuadorName] = useState("")
    const [validActuadorName, setValidActuadorName] = useState(false)
    const [emptyActuadorName, setEmptyActuadorName] = useState(true)

    const closeSensorActuadorDialog = () => {
        setIsOpenSensorActuadorDialog(false);
    }

    const addSensorActuador = (isSensor: boolean) => {
        setSensorActuador(isSensor)
        setIsOpenSensorActuadorDialog(true);
    }

    const handleSensorName = async (e: any) => {
        if (e.target.value == "") {
            setEmptySensorName(true)
            setValidSensorName(false)
        } else {
            let check = await checkSensorId(deviceSensors, e.target.value)
            if (check) {
                setEmptySensorName(false)
                setValidSensorName(true)
                setSensorName(e.target.value)
            } else {
                setEmptySensorName(false)
                setValidSensorName(false)
            }
        }
    }


    
    const [sensorId, setSensorId] = useState("")
    const [emptySensorId, setEmptySensorId] = useState(true)

    const handleSensorId = async (e: any) => {
        if (e.target.value == "") {
            setEmptySensorId(true)
        } else {
            setEmptySensorId(false)
            setSensorId(e.target.value)
        }
    }

    const handleAddSensor = async () => {
        if (validSensorName && !emptySensorId) {
            const token = getCookie("token");
            let res = await addSensor(sensorId, sensorName, deviceId as string, token as string)
            if (res) {
                fetchDeviceSensors(deviceId as string, token as string)
            }
            closeSensorActuadorDialog()
        }
    }

    const handleActuadorName = (e: any) => {
        if (e.target.value == "") {
            setEmptyActuadorName(true)
            setValidActuadorName(false)
        } else {
            setEmptyActuadorName(false)
            let check = checkActuador(deviceActuadores, e.target.value)
            if (check) {
                setValidActuadorName(true)
                setActuadorName(e.target.value)
            } else {
                setValidActuadorName(false)
            }
        }
    }

    const handleAddActuador = async () => {
        if (validActuadorName) {
            const token = getCookie("token");
            let res = await addActuador(actuadorName, deviceId as string, token as string)
            if (res) {
                fetchDeviceActuadores(deviceId as string, token as string)
            } else {
                alert("Error al añadir el actuador")
            }
            closeSensorActuadorDialog()
        }
    }

    const SensorActuadorDialog = () => {
        return (
            <Dialog open={IsOpenSensorActuadorDialog} onClose={closeSensorActuadorDialog}>
                <DialogTitle className="w-full h-full border">
                Añade un nuevo {
                    sensorActuador
                        ? "sensor"
                        : "actuador"
                
                }
                </DialogTitle>
                <div className="flex flex-col justify-center items-center p-4 gap-4">
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
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
                                                            : !emptySensorId
                                                                ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                                                : "border-red-500 text-red-500 bg-gray-500/5"
                                        }`}/>
                                        <label className="font-medium pt-2">Nombre</label>
                                        <input onChange={handleSensorName} onBlur={handleSensorName} name="name" type="text" placeholder="Nombre" required
                                                    className={`transition easy-in-out duration-200
                                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                                    shadow-sm rounded-lg ${
                                                        emptySensorName
                                                            ? "border-[#d6d3d1]"
                                                            : validSensorName
                                                                ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                                                : "border-red-500 text-red-500 bg-gray-500/5"
                                        }`}/>
                                        <div className="w-full h-full flex flex-col gap-2 pt-2">
                                            <div className="w-full h-full pt-3">
                                                <button onClick={handleAddSensor} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                                    Añadir sensor
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                :   <div className="w-full h-full flex flex-col">
                                        <label className="font-medium">Nombre</label>
                                        <input onChange={handleActuadorName} onBlur={handleActuadorName} name="name" type="text" placeholder="Nombre" required
                                                    className={`transition easy-in-out duration-200
                                                    w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                                    shadow-sm rounded-lg ${
                                                        emptyActuadorName
                                                            ? "border-[#d6d3d1]"
                                                            : validActuadorName
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
        if (actuador.activeProgram != "" && actuador.activeProgram != null && actuador.mode == 0) {
            notify("No se puede cambiar el modo de un actuador con un programa activo", "warning")
            return
        }
        if (actuador.device_pin == null) {
            notify("No se puede cambiar el modo de un actuador sin un pin asignado", "warning")
            return
        }
        let res = await updateActuadorMode(actuador.id, actuador.mode ? 0 : 1, token as string)
        if (res) {
            let newActuadores = await getActuadores(deviceId as string, token as string)
            notify("Modo cambiado correctamente", "success")
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
    const [areas, setAreas] = useState<[Area]>([{
        id: "",
        name: "",
        user: "",
        color: ""
    }])

    const fetchAreas = async () => {
        const token = getCookie("token")
        let res = await getAreas(token as string)
        if (res.length > 0) {
        setAreas(res)
        } else {
            setAreas([{
                id: "",
                name: "",
                user: "",
                color: ""
            }])
        }
    }

    // ------------------------------ Modificar Area -----------------------------------
    const [IsOpenUpdateActuadorAreaDialog, setIsOpenUpdateActuadorAreaDialog] = useState(false)

    const closeUpdateActuadorAreaDialog = async () => {
        setIsOpenUpdateActuadorAreaDialog(false)
    }

    const handleOpenUpdateActuadorAreaDialogButton = (index: number) => {
        setActuadorIndex(index)
        setIsOpenUpdateActuadorAreaDialog(true)
    }

    const updateActuadorAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateActuadorAreaDialog} onClose={closeUpdateActuadorAreaDialog}>
                <DialogTitle className="w-96 h-full font-bold text-xl flex justify-center items-center">Modifica la zona del actuador</DialogTitle>
                <div className="flex items-center justify-center h-96">
                    <ElemPlacer 
                        closeDialog={closeUpdateActuadorAreaDialog} 
                        elem={deviceActuadores[actuadorIndex]} 
                        elems={deviceActuadores}
                        setElems={setDeviceActuadores}
                        type={2} 
                    />
                </div>
            </Dialog>
        )
    }
    // ----------------------------------------------------------------------------------------------------
    // ------------------------------ Modificar area del sensor -------------------------------------------

    const [IsOpenUpdateSensorAreaDialog, setIsOpenUpdateSensorAreaDialog] = useState(false)
    const [sensorIndex, setSensorIndex] = useState(0)

    const closeUpdateSensorAreaDialog = async () => {
        setIsOpenUpdateSensorAreaDialog(false)
    }

    const handleOpenUpdateSensorAreaDialogButton = (index: number) => {
        setSensorIndex(index)
        setIsOpenUpdateSensorAreaDialog(true)
    }

    const updateSensorAreaDialog = () => {
        return (
            <Dialog open={IsOpenUpdateSensorAreaDialog} onClose={closeUpdateSensorAreaDialog}>
                <DialogTitle className="w-96 h-full font-bold text-xl flex justify-center items-center">Modifica la zona del sensor</DialogTitle>
                <div className="flex items-center justify-center h-96">
                    <ElemPlacer 
                        closeDialog={closeUpdateSensorAreaDialog} 
                        elem={deviceSensors[sensorIndex]} 
                        elems={deviceSensors}
                        setElems={setDeviceSensors}
                        type={1} 
                    />
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
                    ? "sensor " + deviceSensors[sensorIndex]?.name
                    : "actuador " + deviceActuadores[actuadorIndex]?.name
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
    const [IsOpenUpdateAreaDialog, setIsOpenUpdateAreaDialog] = useState(false)

    const closeUpdateAreaDialog = async () => {
        setIsOpenUpdateAreaDialog(false)
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
                    <ElemPlacer closeDialog={closeUpdateAreaDialog} elems={device} type={0} elem={device} setElems={setDevice}/>
                </div>
                
            </Dialog>
        )
    }

    const [chartSensor, setChartSensor] = useState("")
    const [IsOpenChartDialog, setIsOpenChartDialog] = useState(false)
    const [sensorType, setSensorType] = useState(0)

    const openChartDialog = (sensor: string, type: number) => {
        setChartSensor(sensor)
        setIsOpenChartDialog(true)
        setSensorType(type)
    }

    const closeChartDialog = () => {
        setIsOpenChartDialog(false)
        setChartSensor("")
    }

    const [actuadorOpenCloseModal, setActuadorOpenCloseModal] = useState(false)
    const [actuadorToOpen, setActuadorToOpen] = useState<Actuador>({
        id: "", 
        area: "", 
        device_pin: 0, 
        device: "", 
        mode: 0,
        name: "",
        Latitud: 0,
        Longitud: 0,
        status: 0,
        activeProgram: ""
    })
    const [message, setMessage] = useState("")

    const openActuadorOpenCloseModal = (actuador: Actuador, message: string) => {
        setActuadorToOpen(actuador)
        setMessage(message)
        setActuadorOpenCloseModal(true)
    }

    const closeActuadorOpenCloseModal = () => {
        setActuadorOpenCloseModal(false)
    }

    const AdviceOpenCloseModal = (actuador: Actuador, message:string) => {
        return (
            <Dialog open={actuadorOpenCloseModal} onClose={closeActuadorOpenCloseModal}>
                <DialogTitle className="w-full h-full">{message}</DialogTitle>
                <div className="flex flex-row p-4 gap-4">
                    <button onClick={() => openActuador(actuador)} className="w-1/2 h-12 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                        <p>Aceptar</p>
                    </button>
                    <button onClick={closeActuadorOpenCloseModal} className="w-1/2 h-12 text-white rounded-md bg-red-600 hover:bg-red-500 duration-150">
                        <p>Cancelar</p>
                    </button>

                </div>
            </Dialog>
        )
    }

    const openActuador = async (actuador: Actuador) => {
        const token = getCookie('token')
        let res = await updateActuadorStatus(actuador.id, actuador.status ? 0 : 1 , token as string)
        if (res) {
            fetchDeviceActuadores(deviceId as string, token as string)
        }
        closeActuadorOpenCloseModal()
    }

    const checkProgram = async (programId: string) => {
        return 0
    }

    const openCloseActuador = async (actuador: Actuador) => {
        const token = getCookie('token')
        if (actuador.activeProgram != "" && actuador.activeProgram != null) {
            if (actuador.status) {
                /*
                    - Si el actuador está abierto y tiene un programa activo para las proximas horas, preguntar si desea cancelar el programa de hoy
                    - Si el actuador está abierto y tiene un programa en funcionamiento, preguntar si desea terminar el programa o simplemente pausarlo
                */
                let programStatus = await checkProgram(actuador.activeProgram)
                if (programStatus == 0) {
                    let res = await updateActuadorStatus(actuador.id, actuador.status ? 0 : 1 , token as string)
                    if (res) {
                        notify("Actuador cerrado correctamente", "success")
                        fetchDeviceActuadores(deviceId as string, token as string)
                    }
                } else if (programStatus == 1) {    // Riega hoy, pero aun no esta activo
                    openActuadorOpenCloseModal(actuador, "¿Deseas cancelar el programa?")
                } else if (programStatus == 2) {    // Riega hoy y está activo
                    openActuadorOpenCloseModal(actuador, "¿Deseas pausar el programa o cancelarlo?")
                }
            } else {
                /*
                    - Si el actuador está cerrad y no tiene programa activo para hoy, se abre con normalidad
                    - si el actuador está cerrado y tiene un programa activo para las proximas horas, preguntar si desea cancelar el programa de hoy
                    - si está cerrado y el programa está activo, preguntar si reanudar el programa o abrir el actuador y cancelar el programa de hoy
                */
                let programStatus = await checkProgram(actuador.activeProgram)
                if (programStatus == 0) {
                    let res = await updateActuadorStatus(actuador.id, actuador.status ? 0 : 1 , token as string)
                    if (res) {
                        notify("Actuador abierto correctamente", "success")
                        fetchDeviceActuadores(deviceId as string, token as string)
                    }
                } else if (programStatus == 1) {    // Riega hoy, pero aun no esta activo
                    openActuadorOpenCloseModal(actuador, "¿Deseas cancelar el programa? Se regaría en modo manual")
                
                }
            }
        } else{
            let res = await updateActuadorStatus(actuador.id, actuador.status ? 0 : 1 , token as string)
            if (res) {
                fetchDeviceActuadores(deviceId as string, token as string)
            }
        }
        
    }
    
    // ---------------------------------------------------------------------------------------------

    return (
        <main className="h-full w-full">
            <div className="w-full h-full flex flex-col gap-3">
                {ChartDialog({
                    id: chartSensor,
                    type: sensorType,
                    onClose: closeChartDialog,
                    isOpen: IsOpenChartDialog
                })}
                {deleteDeviceDialog()}
                {SensorActuadorDialog()}
                {updateActuadorPinDialog()}
                {updateActuadorAreaDialog()}
                {updateSensorAreaDialog()}
                {DeleteElemDialog()}
                {UpdateDeviceAreaDialog()}
                {AdviceOpenCloseModal(actuadorToOpen, message)}
                <div id="botones" className="w-full h-12 flex flex-row gap-3">
                    <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon onClick={() => {
                            router.push("/dashboard/devices")
                        }} className={`w-6 text-indigo-600`}/>
                    </button>
                    <div className="flex gap-3 justify-end flex-grow">
                        <button onClick={openUpdateAreaDialog} className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                            <MapPinIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button onClick={() => addSensorActuador(true)}  className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                            <MdOutlineAddchart className={`w-6 text-indigo-600`}/>
                        </button>
                        <button onClick={() => addSensorActuador(false)}  className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                            <PlusCircleIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                            <ArrowPathIcon
                            className={`w-6 text-indigo-600`}
                            onClick={() => {updateInfo()}}
                            style={{ transition: 'transform 0.7s ease', transform: `rotate(${rotation}deg)`}}/>
                        </button>
                        <button
                            onClick={() => {deleteDeviceButton()}} 
                            className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-50 border-red-500 duration-150`}>
                            <XMarkIcon className={`w-6 text-red-500`}/>
                        </button>
                        
                    </div>
                </div>
                <div id="datos" className="w-full h-full flex flex-col gap-3">
                    <div id="info-general" className="w-full flex flex-row gap-3 items-center md:justify-center">
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
                                deviceActuadores.length > 0 && deviceActuadores[0].id != ""
                                    ?   <div className="w-full h-full rounded-md overflow-x-auto">
                                            {
                                                deviceActuadores.map((actuador, index) => {
                                                    return (
                                                        <div key={index} className={`w-dvw md:w-full h-12 grid grid-cols-16 gap-x-3 items-center ${
                                                            index % 2 == 0
                                                                ? "bg-blue-100"
                                                                : "bg-gray-50"
                                                        }`}>
                                                            <div className="h-full col-span-3 flex items-center">
                                                                <FaFaucetDrip size={20} className="w-9 text-indigo-600"></FaFaucetDrip>
                                                                {actuador.name}
                                                            </div>
                                                            <div className="h-full col-span-3 flex gap-2 items-center">
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
                                                            <div className="h-full col-span-3 flex flex-row gap-2 items-center">
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
                                                            <div className="h-full col-span-3 flex items-center justify-center">
                                                                <ActuadorProgramName programId={actuador.activeProgram}/>
                                                            </div>
                                                            <div className="h-full flex items-center justify-center">
                                                                <button
                                                                    onClick={() => openChartDialog(actuador.id, 4)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <GiWateringCan size={24} className="w-9 px-2 text-indigo-600"/>
                                                                </button>
                                                            </div>
                                                            <div className="h-full flex items-center justify-center">
                                                                <button 
                                                                    onClick={() => openCloseActuador(actuador)}
                                                                    disabled={actuador.mode == 1 || actuador.device_pin == null}
                                                                    className="w-9 h-2/3 flex justify-center text-indigo-600 items-center bg-gray-50
                                                                     hover:bg-gray-200 rounded-md shadow-md duration-100 disabled:text-indigo-300">
                                                                        {
                                                                            !actuador.status 
                                                                                ? <IoPlayCircleSharp  className="transition ease-in-out" size={21}/>
                                                                                : <IoPauseCircleSharp  className="transition ease-in-out" size={21}/>
                                                                        }
                                                                </button>
                                                            </div>
                                                            <button onClick={() => handleActuadorMode(index)} className="h-full justify-center flex items-center">
                                                                {
                                                                    actuador.mode == 1
                                                                        ? <FaRobot size={24} className="transition ease-in-out  text-indigo-600"></FaRobot>
                                                                        : <FaRobot size={24} className="transition ease-in-out  text-indigo-300"></FaRobot>
                                                                }
                                                            </button>
                                                            <div className="h-full flex items-center justify-center">
                                                                <button onClick={() => handleOpenDeleteElemDialogButton(index, false)} className="w-8 h-2/3 rounded-md flex justify-center items-center shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
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
                                deviceSensors.length > 0 && deviceSensors[0].id != ""
                                    ?   <div className="w-full h-full  overflow-y-auto rounded-md">
                                            {
                                                deviceSensors.map((sensor, index) => {
                                                    return (
                                                        <div key={index} className={`w-dvw md:w-full h-12 grid grid-cols-9 gap-3 items-center justify-between ${
                                                            index % 2 == 0
                                                                ? "bg-blue-100"
                                                                : "bg-gray-50"
                                                        }`}>
                                                            <p className="px-3 col-span-2 w-28 h-full flex flex-row justify-center items-center">
                                                                <WiHumidity size={24} className="w-9 text-indigo-600"></WiHumidity>
                                                                {sensor.name}
                                                            </p>
                                                            <div className="px-3 col-span-2 w-48 h-full flex flex-row gap-2 items-center">
                                                                <button onClick={() => handleOpenUpdateSensorAreaDialogButton(index)} className="h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <MapPinIcon className="w-9 px-2 text-indigo-600"></MapPinIcon>
                                                                </button>
                                                                {
                                                                    sensor.area == null
                                                                        ? "Descolocado"
                                                                        : areas.map((area) => {
                                                                            if (area.id == sensor.area) {
                                                                                return area.name
                                                                            }
                                                                        })
                                                                }
                                                            </div>
                                                            <div className="px-3 h-full flex flex-row gap-2 items-center">
                                                                <button
                                                                    onClick={() => openChartDialog(sensor.id, 0)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <FaTemperatureArrowUp size={24} className="w-9 px-2 text-indigo-600"/>
                                                                </button>
                                                            </div>
                                                            <div className="px-3 h-full flex flex-row gap-2 items-center">
                                                                <button
                                                                    onClick={() => openChartDialog(sensor.id, 2)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <IoWaterOutline size={24} className="w-9 px-2 text-indigo-600"/>
                                                                </button>
                                                            </div> 
                                                            <div className="px-3 h-full flex flex-row gap-2 items-center">
                                                                <button
                                                                    onClick={() => openChartDialog(sensor.id, 1)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <FaTemperatureArrowDown size={24} className="w-9 px-2 text-indigo-600"/>
                                                                </button>
                                                            </div> 
                                                            <div className="px-3 w-44 h-full flex flex-row gap-2 items-center">
                                                                <button
                                                                    onClick={() => openChartDialog(sensor.id, 3)}
                                                                    className="w-9 h-2/3 rounded-md shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
                                                                    <FaWater size={24} className="w-9 px-2 text-indigo-600"/>
                                                                </button>
                                                            </div>                                                   
                                                            <div className="px-2 w-full h-full flex justify-end items-center">
                                                                <button onClick={() => handleOpenDeleteElemDialogButton(index, true)} className="w-8 h-2/3 rounded-md flex justify-center items-center shadow-sm border bg-gray-50 hover:bg-gray-100 duration-150">
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
                    <div id="graficas" className="w-full h-full max-h-64 flex flex-col md:flex-row gap-3 items-center justify-center">
                        <div className="w-full h-full flex flex-col items-center border rounded-md shadow-md">
                            <h1 className="w-full h-12 text-lg text-center text-slate-400">Temperatura de la CPU</h1>
                            <Suspense>
                                <SensorChart className="w-full h-full" type={5} id={deviceId}/>
                            </Suspense>
                        </div>
                        <div className="w-full h-full flex items-center border shadow-md rounded-md">
                            <LogInfo elemId={deviceId == null || deviceId === undefined ? undefined : deviceId} type={0}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}