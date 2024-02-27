import { getCookie } from "cookies-next"
import { useEffect, useState, useRef } from "react"
import { APIProvider, Map, Marker, useMapsLibrary, toLatLngLiteral } from "@vis.gl/react-google-maps"
import { fetchUserInfo } from "../../lib/userInfo"
import { getAreas } from "../../lib/areasUtils"
import { getCoordsArea } from "../../lib/coordsUtils"
import { Polygon } from "./map/Polygon"

const PolygonComponent = ({area, coords, compute, markerLocation, markerArea, setMarkerArea, setCompute}) => {
    const polygonRef = useRef(null)
    let geometry = useMapsLibrary('geometry')

    const computeDeviceMarkerArea = () => {
        if (polygonRef.current !== null && compute){
            let res = geometry.poly.containsLocation(toLatLngLiteral(markerLocation.lat, markerLocation.lng), polygonRef.current)
            if (res){
                setMarkerArea(area.id)
            }
        }
        setCompute(false)
    }

    return (
        <Polygon
            key={area.id}
            ref={polygonRef}
            paths={[coords]}
            options={{
                fillColor: '#' + area.color,
                fillOpacity: 0.2,
                strokeColor: '#' + area.color,
                strokeOpacity: 0.4,
                strokeWeight: 2
            }}
        />
    )
}

export const ElemPlacer = ({elem}) => {
    const [centerLat, setCenterLat] = useState(0)
    const [centerLon, setCenterLon] = useState(0)
    const [areas, setAreas] = useState([])
    const [coords, setCoords] = useState([])
    const [markerLocation, setMarkerLocation] = useState({lat: 0, lng: 0})
    const [markerArea, setMarkerArea] = useState(elem.area)
    const [displayMap, setDisplayMap] = useState(false)
    const [compute, setCompute] = useState(false)

    const fetchUserLocation = async (token) => {
        let user = await fetchUserInfo(token)
        if (user !== undefined){
            setCenterLat(user.Latitud)
            setCenterLon(user.Longitud)
            setMarkerLocation({lat: user.Latitud, lng: user.Longitud})
            setDisplayMap(true)
        }
    }

    const fetchAreas = async (token) => {
        let areas = await getAreas(token)
        if (areas !== undefined){
            setAreas(areas)
        }
    }

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

    useEffect(() => {
        const token = getCookie('token')
        fetchUserLocation(token)
        fetchAreas(token)
    }, [])

    useEffect(() => {
        let newCoords = []
        if(areas.length > 0){
            areas.map(async (area) => {
                let areaCoords = await getCoordsArea(area.id, getCookie('token'))
                if (areaCoords.length > 0){
                    areaCoords.map(coord => {
                        newCoords.push(coord)
                    })
                }
            })
        }
        setCoords(newCoords)
    }, [areas])

    const handleDragElem = (e) => {
        setMarkerLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
        setCompute(true)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {
                displayMap &&
                    <div className="flex justify-center items-center w-5/6 h-5/6 overflow-hidden rounded-md shadow-md">
                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                            <Map
                                mapId={"750877eaffcf7c34"}
                                disableDefaultUI
                                defaultCenter={{lat: centerLat, lng: centerLon}}
                                defaultZoom={18}
                            >
                                <Marker 
                                    position={{lat: markerLocation.lat, lng: markerLocation.lng}} 
                                    onDragEnd={handleDragElem}
                                    draggable/>
                                {
                                    areas.length > 0 &&
                                    areas.map(area => (
                                        <PolygonComponent 
                                            area={area}
                                            marker={markerLocation}
                                            compute={compute}
                                            setCompute={setCompute} 
                                            coords={filterOrderCoords(area)}
                                        />
                                    ))
                                }
                            </Map>
                        </APIProvider>
                    </div>
            }
        </div>
    )
}