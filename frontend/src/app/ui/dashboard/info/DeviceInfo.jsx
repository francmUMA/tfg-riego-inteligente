import { SignalIcon, SignalSlashIcon } from "@heroicons/react/20/solid";
import { FaWifi } from "react-icons/fa6"
import { getCropByArea } from "@/src/app/lib/cropUtils";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaRegAddressCard } from "react-icons/fa6"
import { PiPlantDuotone } from "react-icons/pi"

export const NormalInfo = ({Icon, info, description}) => {

    return(
        <main className="w-full min-h-20 border flex flex-row gap-x-3 items-center justify-center shadow-md rounded-md">
            <Icon size={32} className="text-indigo-600"/>
            <div className="flex flex-col">
                <p className="text-sm text-slate-400">{description}</p>
                <p>{info}</p> 
            </div>
        </main>
    )
}

const Connect = ({connect}) => {
    return(
        <main className="w-full min-h-20 border flex flex-row gap-x-3 items-center justify-center shadow-md rounded-md">
            <FaWifi size={32}  className="text-indigo-600"/>
            <div>
                <p className="text-sm text-slate-400">Estado</p>
                <p className={`min-w-28 h-1/2 max-h-7 px-2 text-sm rounded-xl shadow-sm ${
                    connect == true
                        ? "bg-green-300 text-green-600"
                        : "bg-red-300 text-red-600"
                    } 
                    flex items-center`}>
                    {connect == true ? <SignalIcon className="w-5 mr-2" /> : <SignalSlashIcon className="w-5 mr-2" />}
                    {connect == true ? " Connected" : " Not Connected"}
                </p>
            </div>
            
        </main>
    )
}

export const getCropName = async (area) => {
    if (area === undefined) return "Sin cultivo"
    const crop = await getCropByArea(area)
    if (crop === undefined) return "Sin cultivo"
    return crop.name
}

export const DeviceInfo = ({device}) => {

    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={HiMiniCpuChip} info={device !== undefined ? device.name : "Sin nombre"} />
            <NormalInfo description={"Dirección IP"} Icon={FaRegAddressCard} info={device !== undefined ? device.ip : "Sin IP"} />
            <Connect  connect={device !== undefined && device.available }/>
            <NormalInfo description={"Cultivo"} Icon={PiPlantDuotone} info={getCropName(device.area)} />
        </div>
    )
}