import { getCookie } from "cookies-next"
import { useEffect, useState, useRef, use } from "react"
import { APIProvider, Map, Marker, useMapsLibrary } from "@vis.gl/react-google-maps"
import { fetchUserInfo } from "../../lib/userInfo"
import { getAreas } from "../../lib/areasUtils"
import { getCoordsArea } from "../../lib/coordsUtils"
import { Polygon } from "./map/Polygon"
import { updateDeviceArea, updateDevicePosition } from "../../lib/devicesUtils"
import { updateSensorArea, updateSensorPosition } from "../../lib/sensorsUtils"
import { updateActuadorArea, updatePositionActuador } from "../../lib/actuadorUtils"
import { MdDone, MdLocationPin } from "react-icons/md";

const PolygonComponent = ({area, coords, markerArea, markerLocation, setMarkerArea}) => {
    const polygonRef = useRef(null)
    let geometry = useMapsLibrary('geometry')

    const computeMarkerArea = () => {
        if (polygonRef.current != null && markerArea != area.id){
            let res = geometry?.poly?.containsLocation({lat: markerLocation.lat, lng: markerLocation.lng}, polygonRef.current)
            if (res){
                setMarkerArea(area.id)
            }
        }
    }

    useEffect(() => {
        computeMarkerArea()
    }, [markerLocation])    

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

export const ElemPlacer = ({elem, closeDialog, type, elems, setElems}) => {
    const [centerLat, setCenterLat] = useState(0)
    const [centerLon, setCenterLon] = useState(0)
    const [areas, setAreas] = useState([])
    const [coords, setCoords] = useState([])
    const [markerLocation, setMarkerLocation] = useState({lat: 0, lng: 0})
    const [markerArea, setMarkerArea] = useState(null)
    const [displayMap, setDisplayMap] = useState(false)

    const fetchAllInfo = async (token) => {
        let user = await fetchUserInfo(token)
        if (user !== undefined){
            setMarkerLocation(
                {
                    lat: elem.Latitud != null ? elem.Latitud : user.Latitud, 
                    lng: elem.Longitud != null ? elem.Longitud : user.Longitud
                }
            )
            setCenterLat(elem.Latitud != null ? elem.Latitud : user.Latitud)
            setCenterLon(elem.Longitud != null ? elem.Longitud : user.Longitud)
        }
        let newAreas = await getAreas(token)
        if (newAreas !== undefined){
            setAreas(newAreas)
        }
        let newCoords = []
        if (newAreas !== undefined){
            for (let area of newAreas){
                let coordsArea = await getCoordsArea(area.id, token)
                for (let coord of coordsArea){
                    newCoords.push(coord)
                }
            }
        }
        if (newCoords.length > 0){
            setCoords(newCoords)
        }

        if (elem !== undefined){
            setMarkerArea(elem.area)
        }

        setDisplayMap(true)
    }

    const submitNewLocation = async () => {
        const token = getCookie('token')
        let res_area
        let res_pos
        let newElems
        if (type == 0) {
            res_area = await updateDeviceArea(elem.id, markerArea, token)
            res_pos = await updateDevicePosition(elem.id, markerLocation.lat, markerLocation.lng, token)
        } else if (type == 1) {
            res_area = await updateSensorArea(elem.id, markerArea, token)
            res_pos = await updateSensorPosition(elem.id, markerLocation.lat, markerLocation.lng, token)
        } else if (type == 2) {
            res_area = await updateActuadorArea(elem.id, markerArea, token)
            res_pos = await updatePositionActuador(elem.id, markerLocation.lat, markerLocation.lng, token)
        }
        if (res_area && res_pos) {
            if (type == 0) {
                newElems = elem
                newElems.area = markerArea
                newElems.Latitud = markerLocation.lat
                newElems.Longitud = markerLocation.lng
            }
            else if (type == 1) {
                newElems = elems
                newElems.map(sensor => {
                    if (sensor.id == elem.id){
                        sensor.area = markerArea
                        sensor.Latitud = markerLocation.lat
                        sensor.Longitud = markerLocation.lng
                    }
                })
            }
            else if (type == 2) {
                newElems = elems
                newElems.map(actuador => {
                    if (actuador.id == elem.id){
                        actuador.area = markerArea
                        actuador.Latitud = markerLocation.lat
                        actuador.Longitud = markerLocation.lng
                    }
                })
            }
        }
        setElems(newElems)
        closeDialog()
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
        fetchAllInfo(token)
    }, [])

    const handleDragElem = (e) => {
        setMarkerLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
        setMarkerArea(null)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {
                displayMap &&
                    <div className="flex flex-col justify-center items-center w-5/6 h-5/6 overflow-hidden">
                        <div className="flex flex-row gap-x-6 pb-2 justify-between items-center">
                            <button className="flex border rounded-md shadow-md w-12 items-center justify-center h-10 hover:bg-gray-100"
                             onClick={submitNewLocation}>
                                <MdDone size={24} color="green" />
                            </button>
                            <p className="flex justify-center w-full items-center border shadow-md rounded-md h-10">
                                <MdLocationPin size={24} className="text-indigo-600" /> 
                                {areas.find(area => area.id == markerArea) ? areas.find(area => area.id == markerArea).name : "Desconocido"}
                            </p>
                        </div>
                        <div className="flex justify-center items-center w-11/12 h-full overflow-hidden rounded-md shadow-md">
                            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                                <Map
                                    mapId={"750877eaffcf7c34"}
                                    disableDefaultUI
                                    defaultCenter={{lat: centerLat, lng: centerLon}}
                                    defaultZoom={15}
                                >
                                    <Marker 
                                        position={{lat: markerLocation.lat, lng: markerLocation.lng}} 
                                        onDragEnd={handleDragElem}
                                        draggable/>
                                    {
                                        areas.length > 0 && coords.length > 0 && areas.map((area) => (
                                            <PolygonComponent 
                                                area={area}
                                                markerArea={markerArea}
                                                marker={markerLocation}
                                                markerLocation={markerLocation}
                                                coords={filterOrderCoords(area)}
                                                setMarkerArea={setMarkerArea}
                                            />
                                        ))
                                    }
                                </Map>
                            </APIProvider>
                        </div>
                    </div>
            }
        </div>
    )
}