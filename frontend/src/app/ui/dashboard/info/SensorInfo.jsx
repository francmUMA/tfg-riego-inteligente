import { NormalInfo, getCropName, Connect } from "./DeviceInfo";
import { TbDeviceWatchStats2 } from "react-icons/tb"
import { HiMiniCpuChip } from "react-icons/hi2";
import { PiPlantDuotone } from "react-icons/pi"
import { getDeviceName } from "@/src/app/lib/devicesUtils";

export const SensorInfo =  ({sensor}) => {

    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={TbDeviceWatchStats2} info={
                sensor !== undefined ? sensor.name : "Sin nombre"
            } />
            <NormalInfo description={"Device"} Icon={HiMiniCpuChip} info={
                sensor !== undefined ? getDeviceName(sensor.device) : "Sin dispositivo"
            } />
            <NormalInfo description={"Cultivo"} Icon={PiPlantDuotone} info={
                sensor !== undefined ? getCropName(sensor.area) : "Sin cultivo"
            } />
            <Connect connect={sensor.available} />
        </div>
    )
}