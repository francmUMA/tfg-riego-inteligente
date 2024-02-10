import {APIProvider, Map, Marker, MapControl, ControlPosition, useMapsLibrary} from '@vis.gl/react-google-maps';
import { MdAddLocationAlt } from "react-icons/md";
import { Circle } from "./Circle.tsx"
import { Polygon } from "./Polygon.tsx"
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle } from "@mui/material"
import { getDevices, updateDevicePosition } from '@/src/app/lib/devicesUtils.ts';
import { getCookie } from 'cookies-next';
import { fetchUserInfo } from '@/src/app/lib/userInfo.ts';
import { getSensors, updateSensorPosition } from '@/src/app/lib/sensorsUtils.ts';
import { getActuadores, addActuador } from '@/src/app/lib/actuadorUtils.ts';
import { WiHumidity } from "react-icons/wi";


const App = () => {
  const [devices, setDevices] = useState([])
  const [sensors, setSensors] = useState([])
  const [actuadores, setActuadores] = useState([])
  const [centerLat, setCenterLat] = useState(0.0)
  const [centerLng, setCenterLng] = useState(0.0)

  useEffect( () => {
    fetchAllInfo()
  },  []);

  const fetchAllInfo = async () => {
    const token = getCookie('token')
    let response = await getDevices(token)
    setDevices(response)
    let sensors = await getSensors(response[0].id,token)
    setSensors(sensors)
    let userinfo = await fetchUserInfo(token)
    setCenterLat(userinfo.Latitud)
    setCenterLng(userinfo.Longitud)
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

  const handleMoveCenter = (event) => {
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
                    sensors.length > 0
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
                    devices.length > 0
                        ? <select className="w-full h-10" value={selectedDevice} onChange={handleSelectedDevice}>
                            {devices.map((device) => (
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


  return (
    <div className='w-full h-full'>
      {PlaceMarkerDialog()}
      {PlaceDeviceMarkerDialog()}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map disableDefaultUI  onCenterChanged={handleMoveCenter} defaultZoom={15} center={{lat: centerLat, lng: centerLng}}>
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
          <MapControl  position={ControlPosition.RIGHT_BOTTOM}>
            <div id='add-sensor-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceMarkerDialog} className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <img src="/humidity-percentage.svg" className="w-8"/>
              </button>
            </div>
            <div id='add-actuador-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <MdAddLocationAlt size={24} className="w-6"/>
              </button>
            </div>
            <div id='add-device-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceDeviceMarkerDialog} className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <img src="/chip.svg" className="w-8"/>
              </button>
            </div>
          </MapControl>
          {/* <Circle
            center={{lat: 53.54992, lng: 10.00678}}
            radius={1000}
            options={{
              fillColor: 'red',
              fillOpacity: 0.2,
              strokeColor: 'red',
              strokeOpacity: 0.4,
              strokeWeight: 2,
            }}
            editable
            draggable
          />
          <Polygon
            paths={[
              {lat: 53.54992, lng: 10.00678},
              {lat: 53.54992, lng: 10.08678},
              {lat: 53.56002, lng: 10.04678},
            ]}
            options={{
              fillColor: 'red',
              fillOpacity: 0.2,
              strokeColor: 'red',
              strokeOpacity: 0.4,
              strokeWeight: 2,
            }}
            editable
            draggable
          /> */}
        </Map>
      </APIProvider>
    </div>
  )
}

export default App