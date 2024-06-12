import { addCoords, getCoordsArea } from "@/src/app/lib/coordsUtils"
import { fetchUserInfo } from "@/src/app/lib/userInfo"
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps"
import { getCookie } from "cookies-next"
import { use, useEffect, useState } from "react"
import { Polygon } from "../map/Polygon"
import { DeviceMarkerInfo } from "./DeviceMarkerInfo"
import { ActuadorMarkerInfo } from "./ActuadorMarkerInfo"
import { SensorMarkerInfo } from "./SensorMarkerInfo"
import { AreaInfo } from "./AreaInfo"
import CircularIndeterminate from "../info/CircularFallback"

export const CropMap = ({ crop, areas, devices, sensors, actuadores, place, placeId, setPlaceCoords }) => {
    const [startLocation, setStartLocation] = useState({lat: 0, lng: 0})
    const [displayMap, setDisplayMap] = useState(false)
    const [coords, setCoords] = useState([])
    const [loading, setLoading] = useState(false)

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

    const getUserInfo = async () => {
        const token = getCookie("token")
        let user = await fetchUserInfo(token)
        if (user !== undefined) {
            setStartLocation({lat: user.Latitud, lng: user.Longitud})
            setDisplayMap(true)
        }
    }

    const [newCoords, setNewCoords] = useState([])
    const createInitialCoords = async (coords) => {
        if (coords === undefined || placeId === undefined) {
            notify("Error al crear el polígono","error")
            return
        }
        const token = getCookie("token")
        let coord1 = await addCoords(coords.lat, coords.lng, placeId, 0, token)
        let coord2 = await addCoords(coords.lat + 0.0001, coords.lng + 0.0001, placeId, 1, token)
        if (!coord1 || !coord2) {
            notify("Error al crear el polígono","error")
            return
        }
        let polygonsArea = []
        for (let area of areas) {
          let polys = await getCoordsArea(area.id, token)
          if (polys.length > 0) {
            polygonsArea.push(...polys)
          }
        }
        setCoords(polygonsArea)
    }

    const fetchCropCoords = async () => {
        setLoading(true)
        const token = getCookie("token")
        let newCoords = []
        if (areas !== undefined){
            for (let area of areas){
                let coordsArea = await getCoordsArea(area.id, token)
                for (let coord of coordsArea){
                    newCoords.push(coord)
                }
            }
            if (newCoords.length > 0){
                setCoords(newCoords)
            }
        }
        setLoading(false)
    }

    const [clickedDevice, setClickedDevice] = useState(undefined)
    const [clickedSensor, setClickedSensor] = useState(undefined)
    const [clickedActuador, setClickedActuador] = useState(undefined)
    const [clickedArea, setClickedArea] = useState(undefined)
    const [clickedCoords, setClickedCoords] = useState({lat: 0, lng: 0})

    useEffect(() => {
        getUserInfo()
        if (crop !== undefined) fetchCropCoords()
    }, [crop])

    useEffect(() => {
        if (!place) fetchCropCoords()
    },[place])


    return(
        loading ? <CircularIndeterminate/> :
        <main className="w-full h-full">
            {   displayMap && 
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
                    <Map 
                        onClick={(e) => { 
                            setClickedDevice(undefined)
                            setClickedSensor(undefined)
                            setClickedActuador(undefined)
                            setClickedArea(undefined)
                            if (place && placeId !== undefined) {
                                createInitialCoords({lat: e.detail.latLng.lat, lng: e.detail.latLng.lng})
                            } 
                        }}
                        mapId={"880d1a58ffae37c1"}
                        disableDefaultUI
                        defaultCenter={{lat: startLocation.lat, lng: startLocation.lng}} 
                        defaultZoom={15}
                    >
                        {
                            areas !== undefined &&
                            areas.map(area => 
                                <div>
                                    <Polygon
                                        key={area.id}
                                        clickable
                                        onClick={(e) => {
                                            setClickedArea(area.id)
                                            setClickedCoords({lat: e.latLng.lat(), lng: e.latLng.lng()})
                                        }}
                                        paths={filterOrderCoords(area)}
                                        options={{
                                            fillColor: '#' + area.color,
                                            fillOpacity: 0.2,
                                            strokeColor: '#' + area.color,
                                            strokeOpacity: 0.4,
                                            strokeWeight: 2
                                        }}
                                        editable={placeId == area.id && place}
                                    />
                                    {
                                        clickedArea == area.id &&
                                        <InfoWindow
                                            position={{lat: clickedCoords.lat, lng: clickedCoords.lng}}
                                            onCloseClick={() => {
                                                setClickedDevice(undefined)
                                                setClickedSensor(undefined)
                                                setClickedActuador(undefined)
                                                setClickedArea(undefined) 
                                            }}
                                        >
                                            <AreaInfo area={area}/>
                                        </InfoWindow>
                                    }
                                </div>
                            )
                        }
                        {
                            devices !== undefined &&
                            devices.map(device =>
                                <div>
                                    <Marker
                                        key={device.id}
                                        onClick={() => setClickedDevice(device.id)}
                                        clickable
                                        position={{lat: device.Latitud, lng: device.Longitud}}
                                        icon={"/chip.svg"}
                                    >
                                        
                                    </Marker>
                                    {
                                        clickedDevice == device.id &&
                                        <InfoWindow
                                            position={{lat: device.Latitud + 0.0005, lng: device.Longitud}}
                                            onCloseClick={() => {
                                                setClickedDevice(undefined)
                                                setClickedSensor(undefined)
                                                setClickedActuador(undefined)
                                                setClickedArea(undefined)
                                            }}
                                        >
                                            <DeviceMarkerInfo device={device}/>
                                        </InfoWindow>
                                    }
                                    
                                </div> 
                                
                            )
                        }
                        {
                            sensors !== undefined &&
                            sensors.map(sensor => 
                                <div>
                                    <Marker
                                        key={sensor.id}
                                        clickable
                                        onClick={() => setClickedSensor(sensor.id)}
                                        position={{lat: sensor.Latitud, lng: sensor.Longitud}}
                                        icon={sensor.type == "DHT" 
                                                ? "/humidity-percentage.svg" 
                                                : sensor.type == "TMP"
                                                    ? "/temperature.svg"
                                                    : "/water-level.svg"
                                            }
                                    >
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </Marker>
                                    {
                                        clickedSensor == sensor.id &&
                                        <InfoWindow
                                            position={{lat: sensor.Latitud + 0.0005, lng: sensor.Longitud}}
                                            onCloseClick={() => {
                                                setClickedDevice(undefined)
                                                setClickedSensor(undefined)
                                                setClickedActuador(undefined)
                                                setClickedArea(undefined) 
                                            }}
                                        >
                                            <SensorMarkerInfo sensor={sensor}/>
                                        </InfoWindow>
                                    }
                                </div>
                                
                            )
                        }
                        {
                            actuadores !== undefined &&
                            actuadores.map(actuador => 
                                <div>
                                    <Marker
                                        key={actuador.id}
                                        clickable
                                        onClick={() => setClickedActuador(actuador.id)}
                                        position={{lat: actuador.Latitud, lng: actuador.Longitud}}
                                        icon={"/faucet.svg"}
                                    >
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                    </Marker>
                                    {
                                        clickedActuador == actuador.id &&
                                        <InfoWindow
                                            position={{lat: actuador.Latitud + 0.0005, lng: actuador.Longitud}}
                                            onCloseClick={() => {
                                                setClickedDevice(undefined)
                                                setClickedSensor(undefined)
                                                setClickedActuador(undefined)
                                                setClickedArea(undefined)
                                            }}
                                        >
                                            <ActuadorMarkerInfo actuador={actuador}/>
                                        </InfoWindow>
                                    }
                                </div>
                            )
                        }
                    </Map>
                </APIProvider>
            }
        </main>
    )
}