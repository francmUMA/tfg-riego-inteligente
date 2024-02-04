'use client'
import { deleteDevice, getDeviceCpuTemperature, getDeviceInfo } from "@/src/app/lib/devicesUtils";
import { checkToken } from "@/src/app/lib/token";
import { ChartComponent } from "@/src/app/ui/dashboard/devicesCharts";

import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon, WifiIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogTitle } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    }, [deviceId]) 

    // ------------------------------ ROTATION ------------------------------
    const [rotation, setRotation] = useState(0);
    //-----------------------------------------------------------------------
    //------------------------------- Update Info ---------------------------
    const updateInfo = async () => {
        const token = getCookie("token");
        let deviceInfo = await getDeviceInfo(deviceId as string, token as string)
        setDevice(deviceInfo)
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
    
    //---------------------------------------------------------------------------

    return (
        <main className="h-full w-full">
            <div className="w-full h-full p-4 flex flex-col gap-3">
                {deleteDeviceDialog()}
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
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
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
                        <div className="w-full h-full border shadow-md rounded-md" >
                            
                        </div>
                        <div className="w-full h-full border shadow-md rounded-md">

                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row gap-3 items-center justify-center">
                        <div className="w-full h-full flex justify-center items-center border shadow-md rounded-md">
                            {
                                deviceCpuTemp.length > 0
                                    ? <ChartComponent className="w-full h-full flex justify-center items-center p-3" data={deviceCpuTemp}></ChartComponent>
                                    : <p className="w-full h-full flex justify-center items-center p-3">No hay datos para mostrar</p>
                            }
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