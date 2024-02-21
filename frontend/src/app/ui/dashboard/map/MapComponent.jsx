import {APIProvider, Map, Marker, MapControl, ControlPosition} from '@vis.gl/react-google-maps';
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
import { TbPolygon } from "react-icons/tb"
import { MdOutlineAddLocation, MdOutlineDownloadDone, MdEditLocationAlt, MdLocationOn } from "react-icons/md";

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
  const [selectedDevice, setSelectedDevice] = useState(0)
  const [selectedSensor, setSelectedSensor] = useState(undefined)

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

  const handleSelectedDevice = (event) => {
    setSelectedDevice(event.target.value)
    setSelectedSensor(sensors.find(sensor => sensor.device == event.target.value)?.id)
  }

  const handleSelectedSensor = (event) => {
    setSelectedSensor(event.target.value)
  }

  const closePlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(false)
  }

  const openPlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(true)
  }

  useEffect(() => {
    setSelectedDevice(devices[0]?.id)
  }, [devices])

  useEffect(() => {
    // Primer sensor sin posición del device seleccionado
    let sensor = sensors.find(sensor => sensor.device == selectedDevice && sensor.Latitud == null && sensor.Longitud == null)
    setSelectedSensor(sensor?.id)
  }, 
  [selectedDevice, sensors])

  const handlePlaceMarkerButton = async () => {
    const token = getCookie('token')
    console.log(selectedSensor)
    let response = await updateSensorPosition(selectedSensor, centerLat, centerLng, token)
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
        <DialogTitle className="w-full h-full border">Coloca un sensor</DialogTitle>
        <div className="flex flex-col justify-center items-center p-4 gap-4">
            <div className="w-full h-full">
                <label className="font-medium">Elige un dispositivo</label>
            </div>
            <div className="w-full h-full flex flex-col justify-center gap-3 items-center">
                {
                    devices.length > 0
                        ? <select className="w-full h-10" value={selectedDevice} onChange={handleSelectedDevice}>
                            {devices.map((device) => (
                                <option key={device.id} value={device.id}>{device.id}</option>
                            ))}
                        </select>
                        : <p>No hay dispositivos</p>
                }
                <div className="w-full h-full flex items-center">
                  <label className="font-medium">Elige un sensor</label>
                </div>
                {
                    sensors.filter(sensor => sensor.device == selectedDevice && sensor.Latitud == null && sensor.Longitud == null).length > 0
                        ? <select className="w-full h-10" value={selectedSensor} onChange={handleSelectedSensor}>
                            {sensors.map((sensor) => (
                                sensor.device == selectedDevice && sensor.Latitud == null && sensor.Longitud == null &&
                                  <option key={sensor.id} value={sensor.id}>{sensor.id}</option>
                            ))}
                        </select>
                        : <p>No hay sensores</p>
                }
                <button onClick={handlePlaceMarkerButton} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    <p>Colocar marcador</p>
                </button>
            </div>
        </div>
      </Dialog>
    )
  }
  //----------------------------------------------------------------------------------------------------------------
  // ----------------------------------- Update Device Position Dialog ---------------------------------------------
  const [IsOpenPlaceDeviceMarkerDialog, setIsOpenPlaceDeviceMarkerDialog] = useState(false)

  const handleOnlySelectDevice = (event) => {
    setSelectedDevice(event.target.value)
  }

  const closePlaceDeviceMarkerDialog = () => {
    setIsOpenPlaceDeviceMarkerDialog(false)
  }

  const openPlaceDeviceMarkerDialog = () => {
    let device = devices.find(device => device.Latitud == null && device.Longitud == null)
    if (device !== undefined) setSelectedDevice(device.id)
    setIsOpenPlaceDeviceMarkerDialog(true)
  }

  const handlePlaceDeviceMarkerButton = async () => {
    const token = getCookie('token')
    let response = await updateDevicePosition(selectedDevice, centerLat, centerLng, token)
    if (response) {
      let newDevices = await getDevices(token)
      setDevices(newDevices)
      closePlaceDeviceMarkerDialog()
    } else {
      console.log('Error updating device position')
    }
  }

  const PlaceDeviceMarkerDialog = () => {
    return (
      <Dialog open={IsOpenPlaceDeviceMarkerDialog} onClose={closePlaceDeviceMarkerDialog}>
        <DialogTitle className="w-full h-full border">Coloca un dispositivo</DialogTitle>
        <div className="flex flex-col justify-center items-center p-4 gap-4">
            <div className="w-full h-full">
                <label className="font-medium">Elige un dispositivo</label>
            </div>
            <div className="w-full h-full flex flex-col justify-center gap-3 items-center">
                {
                    devices.filter(device => device.Latitud == null && device.Longitud == null).length > 0
                        ? <select className="w-full h-10" value={selectedDevice} onChange={handleOnlySelectDevice}>
                            {devices.map((device) => (
                                device.Latitud == null && device.Longitud == null &&
                                <option key={device.id} value={device.id}>{device.id}</option>
                            ))}
                        </select>
                        : <p>No hay dispositivos</p>
                }
                <button onClick={handlePlaceDeviceMarkerButton} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    <p>Colocar dispositivo</p>
                </button>
            </div>
        </div>
      </Dialog>
    )
  }
  // ----------------------------------- Update Actuador Position Dialog ---------------------------------------------

  const [IsOpenPlaceActuadorMarkerDialog, setIsOpenPlaceActuadorMarkerDialog] = useState(false)
  const [selectedActuador, setSelectedActuador] = useState(undefined)

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

  const handleSelectActuadorDevice = (event) => {
    setSelectedDevice(event.target.value)
    setSelectedActuador(actuadores.find(actuador => actuador.device == event.target.value)?.id)
  }

  const handleSelectedActuador = (event) => {
    setSelectedActuador(event.target.value)
  }

  const closePlaceActuadorMarkerDialog = () => {
    setIsOpenPlaceActuadorMarkerDialog(false)
  }

  const openPlaceActuadorMarkerDialog = () => {
    setIsOpenPlaceActuadorMarkerDialog(true)
  }

  useEffect(() => {
    // Primer sensor sin posición del device seleccionado
    let actuador = actuadores.find(actuador => actuador.device == selectedDevice && actuador.Latitud == null && actuador.Longitud == null)
    setSelectedActuador(actuador?.id)
  }, 
  [selectedDevice, actuadores])

  const handlePlaceActuadorMarkerButton = async () => {
    const token = getCookie('token')
    console.log(selectedActuador)
    let response = await updatePositionActuador(selectedActuador, centerLat, centerLng, token)
    if (response) {
      let newActuadores = []
      for (let device of devices) {
        let actuadores = await getActuadores(device.id, token)
        newActuadores.push(...actuadores)
      }
      setActuadores(newActuadores)
      closePlaceActuadorMarkerDialog()
    } else {
      console.log('Error updating device position')
    }
  }

  const PlaceActuadorMarkerDialog = () => {
    return (
      <Dialog open={IsOpenPlaceActuadorMarkerDialog} onClose={closePlaceActuadorMarkerDialog}>
        <DialogTitle className="w-full h-full border">Coloca un actuador</DialogTitle>
        <div className="flex flex-col justify-center items-center p-4 gap-4">
            <div className="w-full h-full">
                <label className="font-medium">Elige un dispositivo</label>
            </div>
            <div className="w-full h-full flex flex-col justify-center gap-3 items-center">
                {
                    devices.length > 0
                        ? <select className="w-full h-10" value={selectedDevice} onChange={handleSelectActuadorDevice}>
                            {devices.map((device) => (
                                <option key={device.id} value={device.id}>{device.id}</option>
                            ))}
                        </select>
                        : <p>No hay dispositivos</p>
                }
                <div className="w-full h-full flex items-center">
                  <label className="font-medium">Elige un actuador</label>
                </div>
                {
                    actuadores.filter(actuador => actuador.device == selectedDevice && actuador.Latitud == null && actuador.Longitud == null).length > 0
                        ? <select className="w-full h-10" value={selectedActuador} onChange={handleSelectedActuador}>
                            {actuadores.map((actuador) => (
                                actuador.device == selectedDevice && actuador.Latitud == null && actuador.Longitud == null &&
                                  <option key={actuador.id} value={actuador.id}>{actuador.id}</option>
                            ))}
                        </select>
                        : <p>No hay actuadores</p>
                }
                <button onClick={handlePlaceActuadorMarkerButton} className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    <p>Colocar marcador</p>
                </button>
            </div>
        </div>
      </Dialog>
    )
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

  const polygonRef = useRef([])


  useEffect(() => {
    if (polygonRef.current.length != areas.length) {
      polygonRef.current = Array(areas.length).fill().map((_, i) => polygonRef.current[i] || createRef())
    }
  }, [areas])

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
  return (
    <div className='w-full h-full'>
      {PlaceMarkerDialog()}
      {PlaceDeviceMarkerDialog()}
      {PlaceActuadorMarkerDialog()}
      {PlacePolygonDialog()}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map id='map' mapId={"750877eaffcf7c34"} disableDefaultUI  onCenterChanged={handleMoveCenter} defaultZoom={15} defaultCenter={{lat: 53.54992, lng: 10.00678}}>
          {devices.map((device) => (
            device.Latitud && device.Longitud &&
            <Marker
              key={device.id}
              icon={"/chip.svg"}
              position={{lat: device.Latitud, lng: device.Longitud}}
              draggable
              onDragEnd={(e) => handleDragDeviceMarker(e, device.id)}
            >
            </Marker>
          ))}
          {sensors.map((sensor) => (
            sensor.Latitud && sensor.Longitud &&
            <Marker
              clickable
              onClick={() => console.log('sensor clicked')}
              key={sensor.id}
              icon={"/humidity-percentage.svg"}
              position={{lat: sensor.Latitud, lng: sensor.Longitud}}
              draggable
              onDragEnd={(e) => handleDragSensorMarker(e, sensor.id)}
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
              draggable
              onDragEnd={(e) => handleDragActuadorMarker(e, actuador.id)}
            >
            </Marker>
          ))}
          <MapControl  position={ControlPosition.RIGHT_BOTTOM}>
            <div id='add-sensor-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceMarkerDialog} 
              className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 
              rounded-md shadow-md'>
                <img src="/humidity-percentage.svg" className="w-8"/>
              </button>
            </div>
            <div id='add-actuador-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceActuadorMarkerDialog} 
              className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 
              rounded-md shadow-md'>
                <img src="/faucet.svg" className="w-8"/>
              </button>
            </div>
            <div id='add-device-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceDeviceMarkerDialog} 
              className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 
              rounded-md shadow-md'>
                <img src="/chip.svg" className="w-8"/>
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
            <div id='add-polygon-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlacePolygonDialog} 
              className={
                `${!editMode && 'hidden'} w-full h-full flex justify-center items-center bg-gray-50 
                hover:bg-gray-200 rounded-md shadow-md`
              }>
                <MdOutlineAddLocation size={30} className='w-9'></MdOutlineAddLocation>
              </button>
            </div>
          </MapControl>
          {
            areas.map((area, index) => (
              <Polygon
                ref={
                  polygonRef.current[index]
                }
                onMouseOut={() => {
                  if (editMode){
                    let coords = filterCoords(1)
                    const polygonNew = polygonRef.current[index].current
                    console.log(polygonNew)
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
                            handleDragPolygon(area.id, polygonNew)
                          }
                        }
                      } else {
                        handleDragPolygon(area.id, polygonNew)
                      }
                    }
                  }
                }}
                paths={[
                  filterCoords(area.id)
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
            ))
          }
        </Map>
      </APIProvider>
    </div>
  )
}

export default App