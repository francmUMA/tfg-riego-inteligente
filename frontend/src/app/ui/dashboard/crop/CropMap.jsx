import { addCoords, getCoordsArea } from "@/src/app/lib/coordsUtils"
import { fetchUserInfo } from "@/src/app/lib/userInfo"
import { APIProvider, Map, Marker, InfoWindow, useMapsLibrary, toLatLngLiteral } from "@vis.gl/react-google-maps"
import { getCookie } from "cookies-next"
import { useRef, useEffect, useState } from "react"
import { Polygon } from "../map/Polygon"
import { DeviceMarkerInfo } from "./DeviceMarkerInfo"
import { ActuadorMarkerInfo } from "./ActuadorMarkerInfo"
import { SensorMarkerInfo } from "./SensorMarkerInfo"
import { AreaInfo } from "./AreaInfo"
import CircularIndeterminate from "../info/CircularFallback"
import { updateDeviceArea } from "@/src/app/lib/devicesUtils"
import { updateActuadorArea } from "@/src/app/lib/actuadorUtils"
import { updateSensorArea } from "@/src/app/lib/sensorsUtils"
import { deleteArea } from "@/src/app/lib/areasUtils"
import { notify } from "@/src/app/lib/notify"
import { getCropAreas } from "@/src/app/lib/cropUtils"

const PolygonComponent = ({color, area, editable, devices, actuadores, sensors, 
    coords, setClickedCoords, setClickedArea, setCoords
}) => {

    const polygonRef = useRef(null)
    let geometry = useMapsLibrary('geometry')

    const computeDeviceMarkersArea = (polygon) => {
      for (let device of devices) {
        if (device.Latitud != null && device.Longitud != null) {
          let res = geometry?.poly.containsLocation(toLatLngLiteral({lat: device.Latitud, lng: device.Longitud}), polygon)
          if (res && device.area != area) {
            let response = updateDeviceArea(device.id, area, getCookie('token'))
            if (response) {
              let newDevices = devices.map(dev => {
                if (dev.id == device.id) {
                  dev.area = area
                }
                return dev
              })
            //   setDevices(newDevices)
            } 
          } else if (!res && device.area == area) {
            let response = updateDeviceArea(device.id, null, getCookie('token'))
            if (response) {
              let newDevices = devices.map(dev => {
                if (dev.id == device.id) {
                  dev.area = undefined
                }
                return dev
              })
            //   setDevices(newDevices)
            }
          }
        }
      }
    }

    const computeActuadoresMarkersArea = (polygon) => {
      for (let actuador of actuadores) {
        if (actuador.Latitud != null && actuador.Longitud != null) {
          let res = geometry?.poly.containsLocation(toLatLngLiteral({lat: actuador.Latitud, lng: actuador.Longitud}), polygon)
          if (res && actuador.area != area) {
            let response = updateActuadorArea(actuador.id, area, getCookie('token'))
            if (response) {
              let newActuadores = actuadores.map(act => {
                if (act.id == actuador.id) {
                  act.area = area
                }
                return act
              })
            //   setActuadores(newActuadores)
            } 
          } else if (!res && actuador.area == area) {
            let response = updateDeviceArea(actuador.id, null, getCookie('token'))
            if (response) {
              let newActuadores = actuadores.map(act => {
                if (act.id == actuador.id) {
                  act.area = undefined
                }
                return act
              })
            //   setActuadores(newActuadores)
            }
          }
        }
      }
    }
    const computeSensorsMarkersArea = (polygon) => {
      for (let sensor of sensors) {
        if (sensor.Latitud != null && sensor.Longitud != null) {
          let res = geometry?.poly.containsLocation(toLatLngLiteral({lat: sensor.Latitud, lng: sensor.Longitud}), polygon)
          if (res && sensor.area != area) {
            let response = updateSensorArea(sensor.id, area, getCookie('token'))
            if (response) {
              let newSensors = sensors.map(sens => {
                if (sens.id == sensor.id) {
                  sens.area = area
                }
                return sens
              })
            //   setSensors(newSensors)
            } 
          } else if (!res && sensor.area == area) {
            let response = updateSensorArea(sensor.id, null, getCookie('token'))
            if (response) {
              let newSensors = sensors.map(sens => {
                if (sens.id == sensor.id) {
                  sens.area = undefined
                }
                return sens
              })
            //   setSensors(newSensors)
            }
          }
        }
      }
    }
    const handleDragPolygon = (area, polygon) => {
        let newCoords = []
        // Eliminar coordenadas que tenga el id del area
        for (let coord of coords) {
          if (coord.area != area) {
            newCoords.push(coord)
          }
        }
    
        // Agregar las coordenadas del poligono
        if (polygon.latLngs.Fg[0] !== undefined && polygon.latLngs.Fg[0].Fg.length > 0){
            polygon.latLngs.Fg[0].Fg.map(async (point, index) => {
              let newCoord = {
                  Latitud: point.lat(), 
                  Longitud: point.lng(), 
                  area: area, 
                  index: index
              }
              newCoords.push(newCoord)
          })
        }
        setCoords(newCoords)
    }

    useEffect(() => {
      computeDeviceMarkersArea(polygonRef.current)
    }, [devices])

    useEffect(() => {
      computeActuadoresMarkersArea(polygonRef.current)
    }, [actuadores])

    useEffect(() => {
      computeSensorsMarkersArea(polygonRef.current)
    }, [sensors])

    return (
        <Polygon
            ref={polygonRef}
            clickable
            id={area}
            onClick={(e) => {
                setClickedArea(area)
                setClickedCoords({lat: e.latLng.lat(), lng: e.latLng.lng()})
            }}
            onMouseOut={() => {
              if (editable){
                const polygonNew = polygonRef.current
                let newCoords = []
                if (polygonNew !== undefined && polygonNew != null){
                    for (let coord of polygonNew.getPath().getArray()) {
                      newCoords.push({lat: coord.lat(), lng: coord.lng()})
                    }
                    let different = false
                    if (newCoords.length == coords.length) {
                    for (let i = 0; i < newCoords.length && !different; i++) {
                        if (newCoords[i].lat != coords[i].lat || newCoords[i].lng != coords[i].lng) {
                          different = true
                          handleDragPolygon(area, polygonNew)
                        }
                    }
                    } else {
                      handleDragPolygon(area, polygonNew)
                    }
                }
              }
            }}
            paths={[
                coords
            ]}
            options={{
                fillColor: color,
                fillOpacity: 0.2,
                strokeColor: color,
                strokeOpacity: 0.4,
                strokeWeight: 2,
            }}
            editable={editable}
        />
    )
} 

export const CropMap = ({ crop, areas, setAreas, devices, sensors, actuadores, place, placeId, setPlaceCoords }) => {
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

    useEffect(() => {
        console.log(newCoords)
    }, [newCoords])

    const handleDeleteAreas = async () => {
      const token = getCookie('token')
      let res = await deleteArea(clickedArea, token)
      if (res){
          let areas = await getCropAreas(crop.id)
          setAreas(areas)
          notify('Área eliminada correctamente', 'success')
      } else {
          notify('Error al eliminar el área', 'error')
      }
  }


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
                                    {/* <Polygon
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
                                    /> */}
                                    <PolygonComponent actuadores={actuadores} area={area.id} color={area.color}
                                        coords={filterOrderCoords(area)} devices={devices} sensors={sensors} 
                                        setCoords={setNewCoords} editable={placeId == area.id && place} setClickedCoords={setClickedCoords}
                                        setClickedArea={setClickedArea}
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
                                            <AreaInfo area={area} handleDeleteAreas={handleDeleteAreas}/>
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