import { IoPlayCircleSharp, IoWifi } from "react-icons/io5";
import { MdLocationOn, MdEditLocationAlt, MdSignalWifiStatusbarNotConnected, MdOutlineDownloadDone } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPolygon } from "react-icons/pi";
import { getCookie } from "cookies-next";
import { deleteDevice, getDevices } from "@/src/app/lib/devicesUtils";
import { deleteSensor } from "@/src/app/lib/sensorsUtils";
import { HiMiniCpuChip } from "react-icons/hi2";
import { deleteActuador } from "@/src/app/lib/actuadorUtils";


const InfoContent = ({elem, type, sensors, area, setElems, setEdit, edit, actuadores}) => {

    const handleRemoveElem = async () => {
        const token = getCookie('token')
        let res = false
        let elems = []
        if (type == 0){
            res = await deleteDevice(elem.id, token)
            elems = await getDevices(token)
        } else if (type == 1) {
            res = await deleteSensor(elem.id, elem.device, token)
            elems = sensors.filter((sensor) => sensor.id != elem.id && sensor.device != elem.device)
        } else if (type == 2) {
            res = await deleteActuador(elem.id, elem.device, token)
            elems = actuadores.filter((actuador) => actuador.id != elem.id && actuador.device != elem.device)
        }
        setElems(elems)
        if (res) alert("Elemento eliminado correctamente")
        else alert("No se ha podido eliminar el dispositivo")
    }

    return (
        <div id="main" className="flex flex-col w-44">
            <header id="buttons" className="pt-1 flex flex-row gap-x-2 items-center">
                <p className="flex text-2xl font-bold justify-center items-center">{elem.id}</p>
                <div className="w-full flex flex-row justify-end items-center gap-x-2">
                    {
                        type == 2 && 
                            <button 
                            className=" w-7 h-7 flex justify-center text-indigo-600 items-center bg-gray-50 
                                        hover:bg-gray-200 rounded-md shadow-md">
                                
                                <IoPlayCircleSharp size={15}/>
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
                            {elem.device}
                        </div>
                }
            </div>
        </div>
    )
}

export default InfoContent