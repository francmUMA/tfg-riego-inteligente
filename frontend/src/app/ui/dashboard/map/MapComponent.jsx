import {APIProvider, Map, Marker, MapControl, ControlPosition, InfoWindow} from '@vis.gl/react-google-maps';
import { Image } from 'next/image.js'
import { Circle } from "./Circle.tsx"
import { Polygon } from "./Polygon.tsx"
import { createRef, useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle } from "@mui/material"
import { getDevices, updateDevicePosition } from '@/src/app/lib/devicesUtils.ts';
import { getCookie } from 'cookies-next';
import { fetchUserInfo } from '@/src/app/lib/userInfo.ts';
import { getSensors, updateSensorPosition } from '@/src/app/lib/sensorsUtils.ts';
import { getActuadores, updatePositionActuador } from '@/src/app/lib/actuadorUtils.ts';
import { addCoords, deleteCoords, getCoordsArea } from '@/src/app/lib/coordsUtils.ts';
import { getAreas } from '@/src/app/lib/areasUtils.ts';
import { MdOutlineAddLocation, MdOutlineDownloadDone, MdEditLocationAlt, MdLocationOn, MdAddLocationAlt } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureQuarter, FaFaucetDrip } from "react-icons/fa6";

const App = () => {
  const [devices, setDevices] = useState([])
  const [sensors, setSensors] = useState([])
  const [actuadores, setActuadores] = useState([])
  const [centerLat, setCenterLat] = useState(0.0)
  const [centerLng, setCenterLng] = useState(0.0)
  const [coords, setCoords] = useState([])
  const [areas, setAreas] = useState([])

  useEffect( () => {
    fetchAllInfo()
  },  []);

  const fetchAllInfo = async () => {
    const token = getCookie('token')
    let response = await getDevices(token)
    setDevices(response)
    let sensors = []
    for (let device of response) {
      let sensors_device = await getSensors(device.id,token)
      sensors.push(...sensors_device)
    }
    setSensors(sensors)
    let userinfo = await fetchUserInfo(token)
    let actuadores = []
    for (let device of response) {
      let actuadores_device = await getActuadores(device.id,token)
      actuadores.push(...actuadores_device)
    }
    setActuadores(actuadores)
    if (userinfo.Latitud != null && userinfo.Longitud != null) {
      setCenterLat(userinfo.Latitud)
      setCenterLng(userinfo.Longitud)
    }
    let resAreas = await getAreas(token)
    setAreas(resAreas)
    let polygonsArea = []
    for (let area of resAreas) {
      let polys = await getCoordsArea(area.id, token)
      if (polys.length > 0) {
        polygonsArea.push(...polys)
      }
    }
    setCoords(polygonsArea)
  }

  //------------------------------------ MARKERS -----------------------------------------------------------------
  const [addMarkerMode, setAddMarkerMode] = useState(false)
  const [elemType, setElemType] = useState(undefined)       //0 -> device, 1 -> sensor, 2 -> actuador       
  const [elemId, setElemId] = useState(undefined)

  const handleDragDeviceMarker = async (event, id) => {
    const token = getCookie('token')
    let response = await updateDevicePosition(id, event.latLng.lat(), event.latLng.lng(), token)
    if (response) {
      console.log('Device position updated')
      let newDevices = await getDevices(token)
      setDevices(newDevices)
    } else {
      console.log('Error updating device position')
    }
  }

  const handleMoveCenter = async (event) => {
    setCenterLat(event.detail.center.lat)
    setCenterLng(event.detail.center.lng)
  }

  // ----------------------------------- Update Sensor Position Dialog ---------------------------------------------
  const [IsOpenPlaceMarkerDialog, setIsOpenPlaceMarkerDialog] = useState(false)

  const handleDragSensorMarker = async (event, id) => {
    const token = getCookie('token')
    let response = await updateSensorPosition(id, event.latLng.lat(), event.latLng.lng(), token)
    if (response) {
      let newSensors = []
      for (let device of devices) {
        let sensors = await getSensors(device.id, token)
        newSensors.push(...sensors)
      }
      setSensors(newSensors) 
    } else {
      console.log('Error updating device position')
    }
  }

  const openPlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(true)
  }
 
  const closePlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(false)
  }

  const handlePlaceSensorMarkerButton = async (lat, lon) => {
    const token = getCookie('token')
    let response = await updateSensorPosition(elemId, lat, lon, token)
    if (response) {
      let newSensors = []
      for (let device of devices) {
        let sensors = await getSensors(device.id, token)
        newSensors.push(...sensors)
      }
      setSensors(newSensors)
      closePlaceMarkerDialog()
    } else {
      console.log('Error updating device position')
    }
  }

  const PlaceMarkerDialog = () => {
    return (
      <Dialog open={IsOpenPlaceMarkerDialog} onClose={closePlaceMarkerDialog}>
        <DialogTitle className="w-full h-full border">Coloca un elemento</DialogTitle>
        <div className="flex max-h-50 flex-col justify-center items-center p-4 gap-4 overflow-y-auto">
            {
              devices.length > 0 && 
              devices.map((device) => device.Latitud == null && device.Longitud == null && 
                <button
                  onClick={() => {
                    setElemType(0)
                    setElemId(device.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  <HiMiniCpuChip  size={30} className='w-9 ml-2 mr-5' />
                  {device.id}
                </button>
              )
            }
            {
              sensors.length > 0 && 
              sensors.map((sensor) => sensor.Latitud == null && sensor.Longitud == null && 
                <button
                  onClick={() => {
                    setElemType(1)
                    setElemId(sensor.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  {
                    sensor.type == 'DHT' ? <WiHumidity size={30} className='w-9 ml-2 mr-5'/>
                    : sensor.type == 'TMP' ? <FaTemperatureQuarter  size={30} className='w-9 ml-2 mr-5'/>
                    : sensor.type == 'CAU' && <IoWaterOutline size={30} className='w-9 ml-2 mr-5' />
                  }
                  {sensor.id}
                </button>
              )
            }
            {
              actuadores.length > 0 && 
              actuadores.map((actuador) => actuador.Latitud == null && actuador.Longitud == null && 
                <button
                  onClick={() => {
                    setElemType(2)
                    setElemId(actuador.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  <FaFaucetDrip size={30} className='w-9 ml-2 mr-5'/>
                  {actuador.id}
                </button>
              )
            }
        </div>
      </Dialog>
    )
  }
  //----------------------------------------------------------------------------------------------------------------
  // ----------------------------------- Update Device Position Dialog ---------------------------------------------

  const handlePlaceDeviceMarkerButton = async (lat, lon) => {
    const token = getCookie('token')
    let response = await updateDevicePosition(elemId, lat, lon, token)
    if (response) {
      let newDevices = await getDevices(token)
      setDevices(newDevices)
      closePlaceMarkerDialog()
    } else {
      console.log('Error updating device position')
    }
  }

  // ----------------------------------- Update Actuador Position Dialog ---------------------------------------------

  const handleDragActuadorMarker = async (event, id) => {
    const token = getCookie('token')
    let response = await updatePositionActuador(id, event.latLng.lat(), event.latLng.lng(), token)
    if (response) {
      let newActuadores = []
      for (let device of devices) {
        let actuadores = await getActuadores(device.id, token)
        newActuadores.push(...actuadores)
      }
      setActuadores(newActuadores) 
    } else {
      console.log('Error updating actuador position')
    }
  }

  const handlePlaceActuadorMarkerButton = async (lat, lon) => {
    const token = getCookie('token')
    let response = await updatePositionActuador(elemId, lat, lon, token)
    if (response) {
      let newActuadores = []
      for (let device of devices) {
        let actuadores = await getActuadores(device.id, token)
        newActuadores.push(...actuadores)
      }
      setActuadores(newActuadores)
      closePlaceMarkerDialog()
    } else {
      console.log('Error updating device position')
    }
  }

  //----------------------------------------------------------------------------------------------------------------
  // ----------------------------------- Manejo de coordenadas de figuras ------------------------------------------

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

  const orderCoords = (coords) => {
    let orderedCoords = []
    for (let i = 0; i < coords.length; i++) {
      let coord = coords.find(coord => coord.index == i)
      orderedCoords.push(coord)
    }
    return orderedCoords
  }

  const filterCoords = (areaId) => {
    let polCoords = coords.filter(coord => coord.area == areaId)
    let orderPolCoords = orderCoords(polCoords)
    let coordList = []
    for (let coord of orderPolCoords) {
      if (coord !== undefined && coord.Latitud != null && coord.Longitud != null) {
        let elem = {lat: coord.Latitud, lng: coord.Longitud}
        coordList.push(elem)
      }
    }
    return coordList
  }
  //----------------------------------------------------------------------------------------------------------------
  //------------------------------------ Dialog adicion de figuras -------------------------------------------------
  const [IsOpenPlacePolygonDialog, setIsOpenPlacePolygonDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const handlePressEditButton = async () => {
    // Guardar los datos en la base de datos en caso de que se haya finalizado de editar
    if (editMode) {
      const token = getCookie('token')
      for (let area of areas){
        let res = await deleteCoords(area.id, token)
        // TODO: Manejar error en caso de que sea necesario
        if (res) {
          let coords = filterCoords(area.id)
          for (let i = 0; i < coords.length; i++) {
            let res = await addCoords(coords[i].lat, coords[i].lng, area.id, i, token)
            if (!res) console.log('Error adding coords')
          }
        }
      } 
    }
    setEditMode(!editMode)
  }

  const openPlacePolygonDialog = () => {
    setIsOpenPlacePolygonDialog(true)
  }

  const closePlacePolygonDialog = () => {
    setIsOpenPlacePolygonDialog(false)
  }

  const handlePlacePolygonButton = async (area) => {
    const token = getCookie('token')
    let coord1 = await addCoords(centerLat, centerLng, area, 0, token)
    let coord2 = await addCoords(centerLat + 0.0001, centerLng, area, 1, token)
    if (!coord1 || !coord2) {
      alert('Error placing polygon')
    } else {
      let polygonsArea = []
      for (let area of areas) {
        let polys = await getCoordsArea(area.id, token)
        if (polys.length > 0) {
          polygonsArea.push(...polys)
        }
      }
      setCoords(polygonsArea)
    }
    closePlacePolygonDialog()
  }

  const PlacePolygonDialog = () => {
    return (
      <Dialog open={IsOpenPlacePolygonDialog} onClose={closePlacePolygonDialog}>
        <DialogTitle className="w-full h-full border">Selecciona una zona</DialogTitle>
        <div className="flex max-h-50 flex-col justify-center items-center p-4 gap-4 overflow-y-auto">
            {
              areas.length > 0
              ? areas.map((area) => (
                coords.find(coord => coord.area == area.id) === undefined &&
                <button
                  onClick={() => handlePlacePolygonButton(area.id)}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  <MdLocationOn size={30} className='w-9 ml-2 mr-5'></MdLocationOn>
                  {area.name}
                </button>
              ))
              : <p>No hay zonas</p>
            }
        </div>
      </Dialog>
    )
  }
  //----------------------------------------------------------------------------------------------------------------
  // ----------------------------------- PolygonComponent ------------------------------------------
  const PolygonComponent = ({ area, editMode, coords }) => {
    const [polygonRef, setPolygonRef] = useState(null)

    useEffect(() => {
        if (!polygonRef) {
            setPolygonRef(createRef())
        }
    }, [polygonRef])

    return (
        <Polygon
            ref={polygonRef}
            onMouseOut={() => {
                if (editMode){
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
                fillColor: 'red',
                fillOpacity: 0.2,
                strokeColor: 'red',
                strokeOpacity: 0.4,
                strokeWeight: 2,
            }}
            editable={editMode}
            draggable={editMode}
        />
    )
  } 
  //-----------------------------------------------------------------------------------------------------------------
  //------------------------------------ InfoMarker -----------------------------------------------------
  const [selectedMarker, setSelectedMarker] = useState(undefined)
  //----------------------------------------------------------------------------------------------------------------
  return (
    <div className='w-full h-full'>
      {PlaceMarkerDialog()}
      {PlacePolygonDialog()}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map id='map'
          onClick={(e) => {
            if (editMode && addMarkerMode && elemType !== undefined && elemId !== undefined && elemType >= 0 && elemType < 3) {
              if (elemType == 0){
                handlePlaceDeviceMarkerButton(e.detail.latLng.lat, e.detail.latLng.lng)
              } else if (elemType == 1){
                handlePlaceSensorMarkerButton(e.detail.latLng.lat, e.detail.latLng.lng)
              } else {
                handlePlaceActuadorMarkerButton(e.detail.latLng.lat, e.detail.latLng.lng)
              }
            } 
            setAddMarkerMode(false)
          }}
         mapId={"750877eaffcf7c34"} disableDefaultUI  onCenterChanged={handleMoveCenter} defaultZoom={15} defaultCenter={{lat: 53.54992, lng: 10.00678}}>
          {devices.map((device, index) => (
            device.Latitud && device.Longitud &&
            <div>
              <Marker
                key={device.id}
                onClick={() => setSelectedMarker(index)}
                icon={"/chip.svg"}
                position={{lat: device.Latitud, lng: device.Longitud}}
                draggable={editMode}
                onDragEnd={(e) => handleDragDeviceMarker(e, device.id)}
              >
              </Marker>
              { selectedMarker !== undefined && selectedMarker == index &&
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(undefined)}
                  position={{lat: device.Latitud, lng: device.Longitud}}>
                    <h1>Test</h1>
                </InfoWindow>
              }
            </div>
          ))}
          {sensors.map((sensor) => (
            sensor.Latitud && sensor.Longitud &&
            <Marker
              clickable
              onClick={() => console.log('sensor clicked')}
              key={sensor.id}
              icon={"/humidity-percentage.svg"}
              position={{lat: sensor.Latitud, lng: sensor.Longitud}}
              draggable={editMode}
              onDragEnd={(e) => handleDragSensorMarker(e, sensor.id)}
              title={sensor.id}
            >
            </Marker>
          ))}
          {actuadores.map((actuador) => (
            actuador.Latitud && actuador.Longitud &&
            <Marker
              clickable
              onClick={() => console.log('actuador clicked')}
              key={actuador.id}
              icon={"/faucet.svg"}
              position={{lat: actuador.Latitud, lng: actuador.Longitud}}
              draggable={editMode}
              onDragEnd={(e) => handleDragActuadorMarker(e, actuador.id)}
            >
            </Marker>
          ))}
          <MapControl  position={ControlPosition.RIGHT_BOTTOM}>
            <div id='add-marker-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button className={`${
                !editMode && 'hidden' 
              }
              w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 
              rounded-md shadow-md`}
              onClick={() => openPlaceMarkerDialog()}
              >
                <MdAddLocationAlt size={30} className='w-9'></MdAddLocationAlt>
              </button>
            </div>
            <div id='add-polygon-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlacePolygonDialog} 
              className={
                `${!editMode && 'hidden'} w-full h-full flex justify-center items-center bg-gray-50 
                hover:bg-gray-200 rounded-md shadow-md`
              }>
                <MdOutlineAddLocation size={30} className='w-9'></MdOutlineAddLocation>
              </button>
            </div>
            <div id='edit-polygon-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={handlePressEditButton} 
              className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 
              rounded-md shadow-md'>
                {
                  editMode  
                  ? <MdOutlineDownloadDone size={30} className='w-9'></MdOutlineDownloadDone>
                  : <MdEditLocationAlt size={30} className='w-9'></MdEditLocationAlt>
                }
              </button>
            </div>
          </MapControl>
          {
            areas.map((area) => (
              <PolygonComponent area={area.id} editMode={editMode} coords={filterCoords(area.id)} />
            ))
          }
        </Map>
      </APIProvider>
    </div>
  )
}

export default App