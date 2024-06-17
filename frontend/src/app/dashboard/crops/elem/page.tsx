'use client'
import { deleteCrop, getCrop, getCropActuadores, getCropAreas, getCropDevices, getCropSensors } from "@/src/app/lib/cropUtils";
import ActuadoresInfo from "@/src/app/ui/dashboard/ActuadoresInfo";
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
import CircularIndeterminate from "@/src/app/ui/dashboard/info/CircularFallback";
import { notify } from "@/src/app/lib/notify";
import { FaCheck } from "react-icons/fa6";
import { addCoords } from "@/src/app/lib/coordsUtils";
import { getCookie } from "cookies-next";
import { fetchUserInfo } from "@/src/app/lib/userInfo";
import { NotPlacedAreas } from "@/src/app/ui/dashboard/crop/NotPlacedAreas";
import { checkToken } from "@/src/app/lib/token";

export default function Page ({ }) {
    const router = useRouter()

    const [crop, setCrop] = useState(undefined)
    const [cropAreas, setCropAreas] = useState([])
    const [cropDevices, setCropDevices] = useState([])
    const [cropActuadores, setCropActuadores] = useState([])
    const [cropSensors, setCropSensors] = useState([])

    const [centerCoords, setCenterCoords] = useState({lat: 0, lng: 0})

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
    const [placeArea, setPlaceArea] = useState(false)
    const [placeAreaId, setPlaceAreaId] = useState(undefined)
    const [placeAreaCoords, setPlaceAreaCoords] = useState([])
    
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
            notify("Cultivo eliminado","success")
        } else{
            notify("Error al eliminar cultivo")
        }
    }

    const getUserInfo = async () => {
        const token = getCookie("token")
        let user = await fetchUserInfo(token as string)
        if (user !== undefined) {
            setCenterCoords({lat: user.Latitud, lng: user.Longitud})
        }
    }

    useEffect(() => {
        console.log(placeAreaCoords)
    }, [placeAreaCoords])

    useEffect(() => {
        if (placeAreaId === undefined) return
        fetchCropAreas()
    }, [placeAreaId])

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
        try {
            let data = await getCropAreas(id as string)
            setCropAreas(data)
        } catch (error) {
            notify("Error al obtener areas","error")
        }
    }

    const addNewCoords = async (coords: any, area: any) => {
        if (area === undefined) {
            notify("Error al añadir coordenadas", "error")
            return
        }
        for (let i = 0; i < coords.length; i++) {
            let res = await addCoords(coords[i].Latitud, coords[i].Longitud, area, coords[i].index, getCookie("token") as string)
            if (!res) {
                notify("Error al añadir coordenadas", "error")
                return
            } 
        }
        notify("Coordenadas añadidas", "success")
        fetchCropAreas()
        fetchCropInfo()
    }

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
        fetchCropInfo()
        fetchCropAreas()
        fetchCropDevices()
        fetchCropActuadores()
        fetchCropSensors()
        getUserInfo()
    }, [])

    return (
        <main className="w-full h-full flex flex-col gap-y-2 overflow-scroll">
            {DeleteCropDialog(IsOpenDeleteCropDialog,closeDeleteCropDialog, deleteCropFunction)}
            {AddAreaDialog(IsOpenAddAreaDialog,closeAddAreaDialog, crop !== undefined && crop.id, setPlaceArea, setPlaceAreaId)}
            <header className="flex flex-row w-full gap-x-2">
                <button className={`shadow-md rounded-md h-10 w-10 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon onClick={() => {
                            router.push("/dashboard/crops")
                        }} className={`w-6 text-indigo-600`}/>
                </button>
                <button 
                    onClick={openAddAreaDialog}
                    className={`shadow-md rounded-md h-10 w-10 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                    <MdAddLocationAlt size={24} className="w-9"/>
                </button>
                <button 
                    onClick={async () => {
                        setPlaceArea(false)
                        await addNewCoords(placeAreaCoords, placeAreaId)
                    }}
                    className={`shadow-md ${
                        !placeArea && "hidden"
                    } rounded-md h-10 w-10 flex justify-center items-center border hover:bg-gray-100 duration-150`}>
                    <FaCheck size={24} className="w-9"/>
                </button>
                <button onClick={openDeleteCropDialog} className="w-10 h-10 hover:bg-red-400 transition ease-in-out duration-150 bg-red-600 flex items-center justify-center rounded-md shadow-md">
                    <FaRegTrashAlt  size={20} className="w-9 text-white"/>
                </button>
            </header>
            <section className="w-full h-full min-h-96 flex flex-row gap-x-2">
                <div id="map" className="w-full h-full rounded-md shadow-md overflow-hidden">
                    <Suspense fallback={<CircularIndeterminate/>}>
                        <CropMap setAreas={setCropAreas} place={placeArea} setPlaceCoords={setPlaceAreaCoords} placeId={placeAreaId} 
                         areas={cropAreas} crop={crop} devices={cropDevices} actuadores={cropActuadores} sensors={cropSensors}/>
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
            
            <section id="actuadores-caudal" className="w-full h-full max-h-fit flex justify-center items-center flex-row gap-x-2">
                <div className="w-full h-full border shadow-md rounded-md">
                    <h1 className="w-full h-10 flex font-medium justify-center items-center text-slate-400">Actuadores regando</h1>
                    <ActuadoresInfo showStatus={false} areas={cropAreas} filter={"status-on"}/>
                </div>
                <div className="w-full h-full min-h-80 border shadow-md rounded-md">
                    <ActuadorAccumulatedFlowBarChart crop={crop !== undefined ? crop.id : undefined}/>
                </div>
                <div className="w-2/3 h-full border shadow-md flex flex-row hover:border-indigo-600 transition ease-in-out duration-150 gap-x-4 items-center justify-center rounded-md">
                       <NotPlacedAreas crop={crop}/>
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