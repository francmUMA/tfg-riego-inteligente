import { getCropAreas } from "@/src/app/lib/cropUtils"
import { useEffect, useState } from "react"

export const NotPlacedAreas = ({crop}) => {
    const [areas, setAreas] = useState([])

    const fetchAreas = async () => {
        let areas = await getCropAreas(crop.id)
        console.log(areas)
        setAreas(areas)
    }

    useEffect(() => {
        if (crop !== undefined) fetchAreas()
    }, [crop])

    return (
        <div className="w-full h-full flex flex-col items-center overflow-y-auto">
            <h1 className="w-full p-2 text-slate-400 flex justify-center items-center">Areas</h1>
            <div className="w-full h-full flex flex-col justify-center items-center rounded-md">
                {
                    areas.map((area, index) => (
                        <div className={`w-full h-full min-h-12 grid grid-cols-3 items-center ${
                            index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'
                        } overflow-hidden`} key={area.id}>
                            <p className="p-2 w-full h-full flex items-center">
                                {area.name}
                            </p>
                            <button>Colocar</button>
                            <button>Eliminar</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}