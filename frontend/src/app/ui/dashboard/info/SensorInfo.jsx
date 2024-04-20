import { NormalInfo } from "./DeviceInfo";
import { IoIosAddCircleOutline } from "react-icons/io"

export const SensorInfo =  ({sensor}) => {
    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={IoIosAddCircleOutline} info={"Nombre del device"} />
            <NormalInfo description={"Device"} Icon={IoIosAddCircleOutline} info={"192.168.1.232"} />
            <NormalInfo description={"Cultivo"} Icon={IoIosAddCircleOutline} info={"Cultivo numero 2"} />
            <NormalInfo description={"Pin"} Icon={IoIosAddCircleOutline} info={"19"} />
            <NormalInfo description={"Tipo"} Icon={IoIosAddCircleOutline} info={"Automático"} />
        </div>
    )
}