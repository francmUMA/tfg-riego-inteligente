import { IoPlayCircleSharp, IoWifi, IoPauseCircleSharp, IoWaterOutline } from "react-icons/io5";
import { MdLocationOn, MdEditLocationAlt, MdSignalWifiStatusbarNotConnected, MdOutlineDownloadDone } from "react-icons/md";
import { FaRegTrashAlt, FaRobot } from "react-icons/fa";
import { PiPolygon } from "react-icons/pi";
import { getCookie } from "cookies-next";
import { deleteDevice, getDevices } from "@/src/app/lib/devicesUtils";
import { deleteSensor } from "@/src/app/lib/sensorsUtils";
import { HiMiniCpuChip } from "react-icons/hi2";
import { deleteActuador, getActuadores, updateActuadorMode, updateActuadorStatus } from "@/src/app/lib/actuadorUtils";
import { getSensors } from "@/src/app/lib/sensorsUtils";


const InfoContent = ({elem, deviceName, type, sensors, area, setElems, setSensors, setActuadores, setEdit, edit, actuadores}) => {

    const handleRemoveElem = async () => {
        const token = getCookie('token')
        let res = false
        let elems = []
        if (type == 0){
            res = await deleteDevice(elem.id, token)
            elems = await getDevices(token)
            // Hay que actualizar todos los actuadores y sensores
            let sensors = []
            let actuadores = []
            for (let elem of elems) {
                let deviceSensors = await getSensors(elem.id, token)
                for (let sensor of deviceSensors) {
                    sensors.push(sensor)
                }
                let deviceActuadores = await getActuadores(elem.id, token)
                for (let actuador of deviceActuadores) {
                    actuadores.push(actuador)
                }
            }
            setSensors(sensors)
            setActuadores(actuadores)
        } else if (type == 1) {
            res = await deleteSensor(elem.id, elem.device, token)
            if (res) {
                for (let sensor of sensors) {
                    if (sensor.id != elem.id) elems.push(sensor)
                }
            }
        } else if (type == 2) {
            res = await deleteActuador(elem.id, elem.device, token)
            if (res) {
                for (let actuador of actuadores) {
                    if (actuador.id != elem.id) elems.push(actuador)
                }
            }
        }
        setElems(elems)
    }

    const handleUpdateActuador = async () => {
        const token  = getCookie('token')
        let res = await updateActuadorMode(elem.id, !elem.mode, token)
        if (res) {
            setElems(actuadores.map((actuador) => {
                if (actuador.id == elem.id && actuador.device == elem.device) actuador.mode = !actuador.mode
                return actuador
            }))
        }
    }

    return (
        <div id="main" className="flex flex-col w-full">
            <header id="buttons" className="w-full pt-1 flex flex-row gap-x-2 items-center">
                <p className="flex text-2xl w-full font-bold justify-center items-center">{elem.name}</p>
                <div className="pl-5 w-full flex flex-row justify-end items-center gap-x-2">
                    {
                        type == 2 && 
                            <button 
                            onClick={handleUpdateActuador}
                            className="">
                                {
                                    elem.mode == 1
                                        ? <FaRobot size={18} className="w-full h-full text-indigo-600"></FaRobot>
                                        : <FaRobot size={18} className="w-full h-full text-indigo-300"></FaRobot>
                                }
                            </button>
                    }
                    {
                        type == 2 && 
                            <button 
                            onClick={() => {
                                const token = getCookie('token')
                                let res = updateActuadorStatus(elem.id, !elem.status, token)
                                if (res) {
                                    setElems(actuadores.map((actuador) => {
                                        if (actuador.id == elem.id && actuador.device == elem.device) actuador.status = !actuador.status
                                        return actuador
                                    }))
                                }
                            }}
                            className={`w-7 h-7 flex justify-center text-indigo-600 items-center bg-gray-50 
                                        hover:bg-gray-200 rounded-md shadow-md ${elem.mode == 1 && "disabled"}`}>
                                {
                                    elem.status == 0 
                                        ? <IoPlayCircleSharp size={15}/>
                                        : <IoPauseCircleSharp size={15}/>
                                }
                            </button>
                    }
                    <button 
                        onClick={() => {
                            setEdit(!edit)
                        }}
                        className="w-7 h-7 flex gap-2 text-indigo-600 justify-center items-center bg-gray-50 
                                hover:bg-gray-200 rounded-md shadow-md">
                        {
                            !edit ? <MdEditLocationAlt size={15}/> : <MdOutlineDownloadDone size={15}/>
                        }
                    </button>
                    <button 
                        onClick={handleRemoveElem}
                        className=" w-7 h-7 flex gap-2 text-red-600 justify-center items-center bg-gray-50 
                                hover:bg-gray-200 rounded-md shadow-md">
                        
                        <FaRegTrashAlt size={15}/>
                    </button>
                </div>
            </header>
            <div className="pt-3 flex flex-col gap-y-2">
                <div className="w-full flex flex-row items-center gap-x-2">
                    <MdLocationOn size={18} className="text-indigo-600"/>
                    <p>{elem.Latitud}</p>
                    <p>{elem.Longitud}</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                    <PiPolygon size={18} className="text-indigo-600"/>
                    <p>{area !== undefined ? area.name : "No asignado"}</p>
                </div>
                {
                    type == 0 && 
                        <div className="flex flex-row gap-x-2 items-center">
                            <IoWifi size={18} className="text-indigo-600"/>
                            <p>{elem.ip}</p>
                        </div>
                }
                {
                    type == 0 && 
                        <div className="flex flex-row gap-x-2 items-center">
                            <MdSignalWifiStatusbarNotConnected size={18} className="text-indigo-600"/>
                            <p className={`min-w-24 max-w-40 h-1/2 px-2 rounded-xl shadow-sm ${
                            elem.available == true
                                ? "bg-green-300 text-green-600"
                                : "bg-red-300 text-red-600"
                        } flex items-center justify-center`}>
                            {elem.available == true ? " Connected" : " Not Connected"}
                                </p>
                        </div>
                }
                {
                    type != 0 && 
                        <div className="flex flex-row gap-x-2 items-center">
                            <HiMiniCpuChip size={18} className="text-indigo-600"/>
                            {deviceName}
                        </div>
                }
                {
                    type == 1 && 
                        <div className="flex flex-row gap-x-2 items-center">
                            <IoWaterOutline size={18} className="text-indigo-600"/>
                            <p>{elem.value == null ? "-" : 1}</p>
                            <p>{
                                elem.type == "DHT" ? "%" : elem.type == "TMP" ? "°C" : "m3"
                            }</p>
                        </div>
                }
                {
                    type == 2 &&
                        <div className="flex flex-row gap-x-2 items-center">
                            <IoWaterOutline size={18} className="text-indigo-600"/>
                            <p>{elem.status == 1 ? "Regando" : "Parado"}</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default InfoContent