import {APIProvider, Map, Marker, MapControl, ControlPosition, InfoWindow, useMapsLibrary, toLatLngLiteral} from '@vis.gl/react-google-maps';
import { Polygon } from "./Polygon.tsx"
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle } from "@mui/material"
import { getDevices, updateDevicePosition, updateDeviceArea } from '@/src/app/lib/devicesUtils.ts';
import { getCookie } from 'cookies-next';
import { fetchUserInfo } from '@/src/app/lib/userInfo.ts';
import { getSensors, updateSensorArea, updateSensorPosition } from '@/src/app/lib/sensorsUtils.ts';
import { getActuadores, updatePositionActuador, updateActuadorArea } from '@/src/app/lib/actuadorUtils.ts';
import { addCoords, deleteCoords, getCoordsArea } from '@/src/app/lib/coordsUtils.ts';
import { deleteArea, getAreas } from '@/src/app/lib/areasUtils.ts';
import { MdOutlineAddLocation, MdOutlineDownloadDone, MdEditLocationAlt, MdLocationOn, MdAddLocationAlt, MdDone } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoWaterOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureQuarter, FaFaucetDrip } from "react-icons/fa6";
import InfoContent from './InfoContent.jsx';
import { FaRegTrashAlt } from "react-icons/fa";
import { ColorPicker } from './ColorPicker.jsx';

const App = () => {
  const [devices, setDevices] = useState([])
  const [sensors, setSensors] = useState([])
  const [actuadores, setActuadores] = useState([])
  const [centerLat, setCenterLat] = useState(0.0)
  const [centerLng, setCenterLng] = useState(0.0)
  const [coords, setCoords] = useState([])
  const [areas, setAreas] = useState([])
  const [displayMap, setDisplayMap] = useState(false)

  useEffect( () => {
    fetchAllInfo()
  },  []);

  useEffect(() => {
    if (!displayMap && (centerLat != 0 || centerLng != 0) ) setDisplayMap(true)
  }, [centerLat, centerLng])

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
    console.log(sensors[0])
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
    let response_pos = await updateSensorPosition(elemId, lat, lon, token)
    if (response_pos) {
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
                <button key={device.id}
                  onClick={() => {
                    setElemType(0)
                    setElemId(device.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  <HiMiniCpuChip  size={30} className='w-9 ml-2 mr-5' />
                  {device.name}
                </button>
              )
            }
            {
              sensors.length > 0 && 
              sensors.map((sensor) => sensor.Latitud == null && sensor.Longitud == null && 
                <button key={sensor.id}
                  onClick={() => {
                    setElemType(1)
                    setElemId(sensor.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                    <WiHumidity size={30} className='w-9 ml-2 mr-5'/>
                  {sensor.name}
                </button>
              )
            }
            {
              actuadores.length > 0 && 
              actuadores.map((actuador) => actuador.Latitud == null && actuador.Longitud == null && 
                <button
                  key={actuador.id}
                  onClick={() => {
                    setElemType(2)
                    setElemId(actuador.id)
                    setAddMarkerMode(true)
                    closePlaceMarkerDialog()
                  }}
                 className='border flex items-center text-lg hover:border-indigo-600 hover:text-indigo-500 duration-150 w-60 min-h-12 rounded-md shadow-md'>
                  <FaFaucetDrip size={30} className='w-9 ml-2 mr-5'/>
                  {actuador.name}
                </button>
              )
            }
            {
              devices.find(device => device.Latitud == null && device.Longitud == null) === undefined &&
              sensors.find(sensor => sensor.Latitud == null && sensor.Longitud == null) === undefined &&
              actuadores.find(actuador => actuador.Latitud == null && actuador.Longitud == null) === undefined &&
              <p>No hay elementos para colocar</p>
            }
        </div>
      </Dialog>
    )
  }
  //----------------------------------------------------------------------------------------------------------------
  // ----------------------------------- Update Device Position Dialog ---------------------------------------------

  const handlePlaceDeviceMarkerButton = async (lat, lon) => {
    const token = getCookie('token')
    let response_pos = await updateDevicePosition(elemId, lat, lon, token)
    if (response_pos) {
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
    let response_pos = await updatePositionActuador(elemId, lat, lon, token)
    if (response_pos ) {
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
  const [placePolygon, setPlacePolygon] = useState(false)
  const handlePressEditButton = async () => {
    // Guardar los datos en la base de datos en caso de que se haya finalizado de editar
    if (editMode || editOneArea) {
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

  const handlePlacePolygonButton = async (area, lat, lng) => {
    const token = getCookie('token')
    let coord1 = await addCoords(lat, lng, area, 0, token)
    let coord2 = await addCoords(lat + 0.0001, lng, area, 1, token)
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
              areas.length > 0 && areas.find(area => coords.find(coord => coord.area == area.id) === undefined) !== undefined
              ? areas.map((area) => (
                coords.find(coord => coord.area == area.id) === undefined &&
                <button key={area.id}
                  onClick={() => {
                    setPlacePolygon(true)
                    setSelectedArea(area.id)
                    closePlacePolygonDialog()
                  }}
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
  const PolygonComponent = ({color, area, editable, coords, setClick, setClickedCoords }) => {
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
              setDevices(newDevices)
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
              setDevices(newDevices)
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
              setActuadores(newActuadores)
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
              setActuadores(newActuadores)
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
              setSensors(newSensors)
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
              setSensors(newSensors)
            }
          }
        }
      }
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
              if (editable && addMarkerMode && elemType !== undefined && elemId !== undefined && elemType >= 0 && elemType < 3) {
                if (elemType == 0){
                  handlePlaceDeviceMarkerButton(e.latLng.lat(), e.latLng.lng(), area)
                } else if (elemType == 1){
                  handlePlaceSensorMarkerButton(e.latLng.lat(), e.latLng.lng(), area)
                } else {
                  handlePlaceActuadorMarkerButton(e.latLng.lat(), e.latLng.lng(), area)
                }
                setAddMarkerMode(false)
              } else if (!editable) {
                setClick(area)
                setClickedCoords({lat: e.latLng.lat(), lng: e.latLng.lng()})
              }
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
  //-----------------------------------------------------------------------------------------------------------------
  //------------------------------------ InfoMarker -----------------------------------------------------
  const [selectedMarker, setSelectedMarker] = useState(undefined)
  const [editOneMarker, setEditOneMarker] = useState(false)
  const [editOneArea, setEditOneArea] = useState(false)
  const [selectedArea, setSelectedArea] = useState(undefined)
  const [clickedArea, setClickedArea] = useState(undefined)
  const [clickedCoords, setClickedCoords] = useState(undefined)


  //----------------------------------------------------------------------------------------------------------------
  return (
    <div className='w-full h-full'>
      {PlaceMarkerDialog()}
      {PlacePolygonDialog()}
      {displayMap && <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
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
            } else if (editMode && placePolygon && selectedArea !== undefined) {
              handlePlacePolygonButton(selectedArea, e.detail.latLng.lat, e.detail.latLng.lng)
            }
            setAddMarkerMode(false)
            setSelectedMarker(undefined)
            setClickedArea(undefined)
            setPlacePolygon(false)
          }}
         mapId={"750877eaffcf7c34"} disableDefaultUI  onCenterChanged={handleMoveCenter} defaultZoom={15} defaultCenter={{lat: centerLat, lng: centerLng}}>
          {devices.map((device, index) => (
            device.Latitud && device.Longitud &&
            <div key={index}>
              <Marker
                key={device.id}
                onClick={() => setSelectedMarker(index)}
                icon={"/chip.svg"}
                position={{lat: device.Latitud, lng: device.Longitud}}
                draggable={editMode || (selectedMarker == index && editOneMarker == true)}
                onDragEnd={(e) => handleDragDeviceMarker(e, device.id)}
              >
              </Marker>
              { selectedMarker !== undefined && selectedMarker == index &&
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(undefined)}
                  position={{lat: device.Latitud + 0.00045, lng: device.Longitud}}>
                    <InfoContent 
                      elem={device} 
                      area={areas.find((area) => area.id == device.area)}
                      type={0}
                      setEdit={setEditOneMarker}
                      edit={editOneMarker}  
                      setElems={setDevices}
                      setActuadores={setActuadores}
                      setSensors={setSensors}
                    />
                </InfoWindow>
              }
            </div>
          ))}
          {sensors.map((sensor, index) => (
            sensor.Latitud && sensor.Longitud &&
            <div key={devices.length + index}>
              <Marker
                clickable
                onClick={() => setSelectedMarker(devices.length + index)}
                key={sensor.id}
                icon={"/humidity-percentage.svg"}
                position={{lat: sensor.Latitud, lng: sensor.Longitud}}
                draggable={editMode || (selectedMarker == (devices.length + index) && editOneMarker == true)}
                onDragEnd={(e) => handleDragSensorMarker(e, sensor.id)}
                title={sensor.id}
              >
              </Marker>
              { selectedMarker !== undefined && selectedMarker == (devices.length + index) &&
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(undefined)}
                  position={{lat: sensor.Latitud + 0.0001, lng: sensor.Longitud}}>
                    {InfoContent({
                      elem: sensor, 
                      type: 1, 
                      sensors: sensors,
                      area: areas.find((area) => area.id == sensor.area), 
                      setElems: setSensors, 
                      setEdit: setEditOneMarker, 
                      edit: editOneMarker,
                      deviceName: devices.find((device) => device.id == sensor.device)?.name, 
                      actuadores: actuadores}) }
                </InfoWindow>
              }
            </div>
          ))}
          {actuadores.map((actuador, index) => (
            actuador.Latitud && actuador.Longitud &&
            <div key={devices.length + sensors.length + index}>
              <Marker
              clickable
              onClick={() => setSelectedMarker(devices.length + sensors.length + index)}
              key={actuador.id}
              icon={"/faucet.svg"}
              position={{lat: actuador.Latitud, lng: actuador.Longitud}}
              draggable={editMode || (selectedMarker == (devices.length + sensors.length + index) && editOneMarker == true)}
              onDragEnd={(e) => handleDragActuadorMarker(e, actuador.id)}
              >
              </Marker>
              { selectedMarker !== undefined && selectedMarker == (devices.length + sensors.length + index) &&
                <InfoWindow
                  onCloseClick={() => setSelectedMarker(undefined)}
                  position={{lat: actuador.Latitud + 0.00045, lng: actuador.Longitud}}>
                    <InfoContent 
                      elem={actuador} 
                      actuadores={actuadores}
                      area={areas.find((area) => area.id == actuador.area)}
                      type={2}
                      deviceName={devices.find((device) => device.id == actuador.device)?.name}
                      setEdit={setEditOneMarker}
                      edit={editOneMarker}  
                      setElems={setActuadores}
                    />
                </InfoWindow>
              }
            </div>
            
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
              <div key={area.id}>
                <PolygonComponent color={'#' + area.color} area={area.id} editable={editMode || (editOneArea && selectedArea == area.id)} draggable={editMode} coords={filterCoords(area.id)} setClick={setClickedArea} setClickedCoords={setClickedCoords} />
                {
                  clickedArea !== undefined && clickedArea == area.id && 
                    <InfoWindow 
                      position={{lat: clickedCoords.lat,  lng: clickedCoords.lng}}
                      onCloseClick={() => { 
                        setClickedArea(undefined)
                        setClickedCoords(undefined)
                        setSelectedArea(undefined)
                        setEditOneArea(false)
                      }}
                    >
                      <div>
                        <header className='w-full h-full flex flex-row items-center gap-x-2'>
                          <p className='text-2xl font-bold'>{area.name}</p>
                          <div className="pl-5 w-full flex flex-row justify-end items-center gap-x-2">
                            <button 
                              onClick={() => {
                                setEditOneArea(!editOneArea)
                                setSelectedArea(area.id)
                                handlePressEditButton()
                              }}
                              className="w-7 h-7 flex gap-2 text-indigo-600 justify-center items-center bg-gray-50 
                                  hover:bg-gray-200 rounded-md shadow-md">
                              {
                                editOneArea && selectedArea !== undefined && selectedArea == area.id 
                                  ?  <MdOutlineDownloadDone size={18}/> : <MdEditLocationAlt size={17}/>
                              }
                            </button>
                            <ColorPicker area={area} areas={areas} setAreas={setAreas} />
                            <button 
                              onClick={() => {
                                const token = getCookie('token')
                                let res = deleteArea(area.id, token)
                                if (res) {
                                  let newAreas = []
                                  for (let area of areas) {
                                    if (area.id != area.id) {
                                      newAreas.push(area)
                                    }
                                  }
                                  setAreas(newAreas)
                                  let newCoords = coords.filter(coord => coord.area != area.id)
                                  setCoords(newCoords)
                                }
                              }}
                              className=" w-7 h-7 flex gap-2 text-red-600 justify-center items-center bg-gray-50 
                                  hover:bg-gray-200 rounded-md shadow-md">
                                  <FaRegTrashAlt size={17} />
                            </button>
                          </div>
                        </header>
                      </div>
                    </InfoWindow>
                }
              </div>
            ))
          }
        </Map>
      </APIProvider>}
    </div>
  )
}

export default App