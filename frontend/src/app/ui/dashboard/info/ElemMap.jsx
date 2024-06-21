import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import { getAreas } from "@/src/app/lib/areasUtils"
import { getCookie } from "cookies-next"
import { getCoordsArea } from "@/src/app/lib/coordsUtils"
import { Polygon } from "../map/Polygon"


export const ElemMap = ({elem}) => {
    const [areas, setAreas] = useState([])
    const [coords, setCoords] = useState([])

    const filterOrderCoords = (area) => {
        let areaCoords = coords.filter(coord => coord.area == area.id)
        if (areaCoords.length == 0){
            return []
        }
        let orderCoords= areaCoords.sort((a, b) => a.index - b.index)
        let res_coords = []
        orderCoords.map(coord => {
            res_coords.push({lat: coord.Latitud, lng: coord.Longitud})
        })
        return res_coords
    }

    const fetchAreas = async () => {
        const token = getCookie("token")
        let areas = await getAreas(token)
        if (areas !== undefined) {
            setAreas(areas)
        }
        let newCoords = []
        for (let area of areas){
            let coordsArea = await getCoordsArea(area.id, token)
            for (let coord of coordsArea){
                newCoords.push(coord)
            }
        }
        if (newCoords.length > 0) {
            setCoords(newCoords)
        }
        
    }

    useEffect(() => {
        fetchAreas()
    }, [elem])

    return (
            elem !== undefined && elem.Latitud !== undefined && elem.Longitud !== undefined
            ?
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                <Map 
                    mapId={"880d1a58ffae37c1"}
                    disableDefaultUI
                    defaultCenter={{lat: elem.Latitud, lng: elem.Longitud}} 
                    defaultZoom={15}
                >
                   <Marker 
                        position={{lat: elem.Latitud, lng: elem.Longitud}}
                   />
                    {
                        areas !== undefined && areas.map(area => {
                            return (
                                <Polygon
                                    key={area.id}
                                    paths={filterOrderCoords(area)}
                                    options={{
                                        fillColor: '#' + area.color,
                                        fillOpacity: 0.2,
                                        strokeColor: '#' + area.color,
                                        strokeOpacity: 0.4,
                                        strokeWeight: 2
                                    }}
                                />
                            )
                        })
                    }
                   
                </Map>
            </APIProvider>
            : <p className="w-full h-full flex justify-center items-center">No se ha encontrado la posición del elemento</p>
        
    )
}