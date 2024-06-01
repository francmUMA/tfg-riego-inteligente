'use client'
import { deleteCrop, getCrop, getCropActuadores, getCropAreas, getCropDevices, getCropSensors } from "@/src/app/lib/cropUtils";
import ActuadoresInfo from "@/src/app/ui/dashboard/ActuadoresInfo";
import { RotateIconUpdateButton } from "@/src/app/ui/dashboard/RotateIconUpdateButton";
import { CropMap } from "@/src/app/ui/dashboard/crop/CropMap";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PiPlant,PiPolygon } from "react-icons/pi"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { DeleteCropDialog } from "@/src/app/ui/dashboard/crop/DeleteCropDialog";
import { MdAddLocationAlt } from "react-icons/md";
import { AddAreaDialog } from "@/src/app/ui/dashboard/crop/AddAreaDialog";
import { ActuadorAccumulatedFlowBarChart, CropHumBarChart, CropSoilHumBarChart, CropSoilTempBarChart, CropTempBarChart } from "@/src/app/ui/dashboard/crop/InfoBarChart";

export default function Page ({ }) {
    const router = useRouter()

    const [crop, setCrop] = useState(undefined)
    const [cropAreas, setCropAreas] = useState([])
    const [cropDevices, setCropDevices] = useState([])
    const [cropActuadores, setCropActuadores] = useState([])
    const [cropSensors, setCropSensors] = useState([])

    const fetchCropInfo = async () => {
        let id = getUrlId()
        let data = await getCrop(id as string)
        setCrop(data)
    }

    const fetchCropDevices = async () => {
        let id = getUrlId()
        let data = await getCropDevices(id as string)
        setCropDevices(data)
    }

    const fetchCropSensors = async () => {
        let id = getUrlId()
        let data = await getCropSensors(id as string)
        setCropSensors(data)
    }

    const fetchCropActuadores = async () => {
        let id = getUrlId()
        let data = await getCropActuadores(id as string)
        setCropActuadores(data)
    }

    const [IsOpenDeleteCropDialog, setIsOpenDeleteCropDialog] = useState(false)
    const closeDeleteCropDialog = () => setIsOpenDeleteCropDialog(false)
    const openDeleteCropDialog = () => setIsOpenDeleteCropDialog(true)

    const [IsOpenAddAreaDialog, setIsOpenAddAreaDialog] = useState(false)
    const closeAddAreaDialog = () => {
        setIsOpenAddAreaDialog(false)
        fetchCropAreas()
        fetchCropInfo()
    } 
    const openAddAreaDialog = () => setIsOpenAddAreaDialog(true)

    const deleteCropFunction = async () => {
        let id = getUrlId()
        let res = await deleteCrop(id as string)
        if (res) {
            router.push("/dashboard/crops")
        } else{
            alert("Error al eliminar el cultivo")
        }
    }

    const getUrlId = () => {
        const url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        if (id === null) {
            router.push("/dashboard/crops")
        }
        return id
    }

    const fetchCropAreas = async () => {
        let id = getUrlId()
        let data = await getCropAreas(id as string)
        setCropAreas(data)
    }

    useEffect(() => {
        fetchCropInfo()
        fetchCropAreas()
        fetchCropDevices()
        fetchCropActuadores()
        fetchCropSensors()
    }, [])

    return (
        <main className="w-full h-full flex flex-col gap-y-2 overflow-scroll">
            {DeleteCropDialog(IsOpenDeleteCropDialog,closeDeleteCropDialog, deleteCropFunction)}
            {AddAreaDialog(IsOpenAddAreaDialog,closeAddAreaDialog, crop !== undefined && crop.id)}
            <header className="flex flex-row w-full gap-x-2">
                <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon onClick={() => {
                            router.push("/dashboard/crops")
                        }} className={`w-6 text-indigo-600`}/>
                </button>
                <RotateIconUpdateButton buttonClickFunction={() => {
                    fetchCropInfo()
                    fetchCropAreas()
                    fetchCropDevices()
                    fetchCropActuadores()
                    fetchCropSensors()
                }}/>
                <button onClick={openDeleteCropDialog} className="w-12 h-12 hover:bg-red-400 transition ease-in-out duration-150 bg-red-600 flex items-center justify-center rounded-md shadow-md">
                    <FaRegTrashAlt  size={22} className="text-white"/>
                </button>
                <button 
                    onClick={openAddAreaDialog}
                    className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                    <MdAddLocationAlt size={24} className="w-6"/>
                </button>
            </header>
            <section className="w-full h-full min-h-96 flex flex-row gap-x-2">
                <div id="map" className="w-full h-full rounded-md shadow-md overflow-hidden">
                    <Suspense>
                        <CropMap areas={cropAreas} crop={crop} devices={cropDevices} actuadores={cropActuadores} sensors={cropSensors}/>
                    </Suspense>
                </div>
                <div id="info" className="w-1/5 flex flex-col justify-center gap-y-2">
                    <div className="w-full h-20 border shadow-md flex flex-row hover:border-indigo-600 transition ease-in-out duration-150 gap-x-4 items-center justify-center rounded-md">
                        <PiPlant size={32} className="text-indigo-600"/>
                        <div>
                            <p className="text-sm text-slate-400">Nombre</p>
                            <p className="font-medium">{crop !== undefined && crop.name}</p>
                        </div>
                    </div>
                    <div className="w-full h-20 border shadow-md flex flex-row hover:border-indigo-600 transition ease-in-out duration-150 gap-x-4 items-center justify-center rounded-md">
                        <PiPolygon size={32} className="text-indigo-600"/>
                        <div>
                            <p className="text-sm text-slate-400">Areas</p>
                            <p className="font-medium">{cropAreas.length}</p>
                        </div>
                    </div>
                    <div className="w-full h-20 border shadow-md flex flex-row hover:border-indigo-600 transition ease-in-out duration-150 gap-x-4 items-center justify-center rounded-md">
                        <HiMiniCpuChip size={32} className="text-indigo-600"/>
                        <div>
                            <p className="text-sm text-slate-400">Elementos</p>
                            <p className="font-medium">{cropDevices.length + cropActuadores.length + cropSensors.length}</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="actuadores-caudal" className="w-full h-full flex justify-center items-center flex-row gap-x-2">
                <div className="w-full h-full border shadow-md rounded-md">
                    <h1 className="w-full h-10 flex font-medium justify-center items-center text-slate-400">Actuadores regando</h1>
                    <ActuadoresInfo showStatus={false} areas={cropAreas} filter={"status-on"}/>
                </div>
                <div className="w-2/3 h-full min-h-80 border shadow-md rounded-md">
                    <ActuadorAccumulatedFlowBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div>
            </section>
            <section className="w-full h-full min-h-80 flex flex-row gap-x-2">
                <div className="w-full h-full border shadow-md rounded-md">
                    <CropHumBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div>
                <div className="w-full h-full border shadow-md rounded-md">
                    <CropTempBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div>   
                <div className="w-full h-full border shadow-md rounded-md">
                    <CropSoilHumBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div> 
                <div className="w-full h-full border shadow-md rounded-md">
                    <CropSoilTempBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div>      
            </section>
        </main>
    )
}