import {APIProvider, Map, Marker, MapControl, ControlPosition, useMapsLibrary} from '@vis.gl/react-google-maps';
import { MdAddLocationAlt } from "react-icons/md";
import { Circle } from "./Circle.tsx"
import { Polygon } from "./Polygon.tsx"
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle } from "@mui/material"
import { getDevices, updateDevicePosition } from '@/src/app/lib/devicesUtils.ts';
import { getCookie } from 'cookies-next';
import { fetchUserInfo } from '@/src/app/lib/userInfo.ts';
import { getSensors } from '@/src/app/lib/sensorsUtils.ts';
import { getActuadores } from '@/src/app/lib/actuadorUtils.ts';


const App = () => {
  const [devices, setDevices] = useState([])
  const [sensors, setSensors] = useState([])
  const [actuadores, setActuadores] = useState([])
  const [centerLat, setCenterLat] = useState(0.0)
  const [centerLng, setCenterLng] = useState(0.0)

  useEffect(() => {
    const fetchDevices = async () => {
      const token = getCookie('token')
      let response = await getDevices(token)
      setDevices(response)
      let sensors = await getSensors(1, token)
      console.log(sensors)
      let userinfo = await fetchUserInfo(token)
      setCenterLat(userinfo.Latitud)
      setCenterLng(userinfo.Longitud)
    }
    fetchDevices()
  },  []);

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

  // ----------------------------------- Update Device Area Dialog ---------------------------------------------

  const [IsOpenPlaceMarkerDialog, setIsOpenPlaceMarkerDialog] = useState(false)

  const closePlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(false)
  }

  const openPlaceMarkerDialog = () => {
    setIsOpenPlaceMarkerDialog(true)
  }

  const PlaceMarkerDialog = () => {
    return (
        <Dialog open={IsOpenPlaceMarkerDialog} onClose={closePlaceMarkerDialog}>
            <DialogTitle className="w-full h-full border">Modifica la zona del sensor</DialogTitle>
            <div className="flex flex-col justify-center items-center p-4 gap-4">
                <div className="w-full h-full">
                    <label className="font-medium">Elige una zona</label>
                </div>
                <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                    {
                      devices.length > 0
                        ? <select>
                            {devices.map((device) => (
                              <option key={device.id} value={device.id}>{device.id}</option>
                            ))}
                          </select>
                        : <p>No hay dispositivos</p>
                    }
                    <button className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                        <p>Actualizar Zona</p>
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

  return (
    <div className='w-full h-full'>
      <PlaceMarkerDialog/>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <Map onCenterChanged={handleMoveCenter} defaultZoom={15} center={{lat: centerLat, lng: centerLng}}>
          {devices.map((device) => (
            device.Latitud && device.Longitud &&
            <Marker
              key={device.id}
              icon={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bWFzayBpZD0iaXBUQ2hpcDAiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ij48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMzYiIHg9IjEyIiB5PSI2IiBmaWxsPSIjNTU1IiByeD0iMiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTEyIDEySDZtNiA4SDZtNiA4SDZtNiA4SDZtMzYtMjRoLTZtNiA4aC02bTYgOGgtNm02IDhoLTYiLz48L2c+PC9tYXNrPjwvZGVmcz48cGF0aCBmaWxsPSIjNTNkNWZkIiBkPSJNMCAwaDQ4djQ4SDB6IiBtYXNrPSJ1cmwoI2lwVENoaXAwKSIvPjwvc3ZnPg=="}
              position={{lat: device.Latitud, lng: device.Longitud}}
              draggable
              onDragEnd={(e) => handleDragDeviceMarker(e, device.id)}
            >
            </Marker>
          ))}
          <MapControl  position={ControlPosition.RIGHT_BOTTOM}>
            <div id='add-sensor-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button onClick={openPlaceMarkerDialog} className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <MdAddLocationAlt size={24} className="w-6"/>
              </button>
            </div>
            <div id='add-actuador-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <MdAddLocationAlt size={24} className="w-6"/>
              </button>
            </div>
            <div id='add-device-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
              <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
                <MdAddLocationAlt size={24} className="w-6"/>
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