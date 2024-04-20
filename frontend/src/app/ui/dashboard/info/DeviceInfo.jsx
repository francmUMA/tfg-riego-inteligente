import { SignalIcon, SignalSlashIcon } from "@heroicons/react/20/solid";
import { IoIosAddCircleOutline } from "react-icons/io"
import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon, WifiIcon } from "@heroicons/react/24/outline";

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
            <WifiIcon  className="text-indigo-600 w-8"/>
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

export const DeviceInfo = ({device}) => {
    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={IoIosAddCircleOutline} info={"Nombre del device"} />
            <NormalInfo description={"Dirección IP"} Icon={IoIosAddCircleOutline} info={"192.168.1.232"} />
            <Connect  connect={true}/>
            <NormalInfo description={"Cultivo"} Icon={IoIosAddCircleOutline} info={"Cultivo numero 2"} />
        </div>
    )
}