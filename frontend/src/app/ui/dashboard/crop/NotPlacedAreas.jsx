import { getCoordsArea } from "@/src/app/lib/coordsUtils"
import { getCropAreas } from "@/src/app/lib/cropUtils"
import { useEffect, useState } from "react"
import { FaPlusCircle, FaRegTrashAlt } from "react-icons/fa"
import { PiPolygon } from "react-icons/pi"
import CircularIndeterminate from "../info/CircularFallback"
import { deleteArea } from "@/src/app/lib/areasUtils"
import { notify } from "@/src/app/lib/notify"
import { getCookie } from "cookies-next"

export const NotPlacedAreas = ({crop}) => {
    const [areas, setAreas] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAreas = async (toLoad) => {
        if (toLoad) setLoading(true)
        let areas = await getCropAreas(crop.id)
        let finalAreas = []
        const token = getCookie('token')
        for (let area of areas){
            let coords = await getCoordsArea(area.id, token)
            if (coords.length == 0) finalAreas.push(area)
        }
        if (finalAreas != areas) setAreas(finalAreas)
        if (toLoad) setLoading(false)
    }

    useEffect(() => {
        if (crop !== undefined) fetchAreas(true)
        setInterval(() => {
            if (crop !== undefined) fetchAreas(false)
        }, 1000)
    }, [crop])

    const handleDeleteAreas = async (area) => {
        const token = getCookie('token')
        let res = await deleteArea(area, token)
        if (res){
            notify('Área eliminada correctamente', 'success')
            fetchAreas()
        } else {
            notify('Error al eliminar el área', 'error')
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="w-full p-2 text-slate-400 flex justify-center items-center">Areas sin colocar</h1>
            {
                loading ? <CircularIndeterminate /> : 
                <div className="w-full h-full flex flex-col items-center rounded-md overflow-y-auto">
                {
                    !(areas.length > 0) ? <p className="h-full w-full flex justify-center items-center">No hay áreas sin ubicar</p> :
                    areas.map((area, index) => (
                        <div className={`w-full h-12 grid grid-cols-3 gap-x-2 items-center ${
                            index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-50'
                        } overflow-hidden`} key={area.id}>

                            <p className="p-2 col-span-2 w-full h-full flex items-center gap-x-1">
                                <PiPolygon size={18} className="text-indigo-600"/>
                                {area.name}
                            </p>
                            <div className="w-full h-full flex flex-row items-center justify-end p-2 gap-x-2">
                                <button 
                                    className={`shadow-md rounded-md h-full w-8 flex bg-white justify-center items-center border hover:bg-gray-100 duration-150`}>
                                    <FaPlusCircle size={18} className="w-9 text-indigo-600" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteAreas(area.id)}
                                    className={`shadow-md bg-red-600 border-red-700 rounded-md h-full w-8 flex justify-center items-center border hover:bg-red-500 duration-150`}>
                                    <FaRegTrashAlt size={18} className="w-9 text-white" />
                                </button>
                            </div>
                        </div>
                    ))
                }
                </div>
            }
            
        </div>
    )
}