import { getDeviceName } from "@/src/app/lib/devicesUtils";
import { NormalInfo, getCropName } from "./DeviceInfo";
import { FaFaucetDrip, FaRobot } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { PiPlantDuotone } from "react-icons/pi"
import { GiPlantWatering } from "react-icons/gi"
import { IoTimeOutline } from "react-icons/io5"
import { getProgramName } from "@/src/app/lib/programUtils";

export const ActuadorInfo =  ({actuador}) => {

    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={FaFaucetDrip} info={
                actuador !== undefined 
                ? actuador.name
                : "Sin nombre"
            } />
            <NormalInfo description={"Device"} Icon={HiMiniCpuChip} info={
                actuador !== undefined 
                    ? getDeviceName(actuador.device)
                    : "Sin dispositivo"
            } />
            <NormalInfo description={"Cultivo"} Icon={PiPlantDuotone} info={
                actuador !== undefined && actuador.area != null
                    ? getCropName(actuador.area)
                    : "Sin cultivo"
                } />
            {/* <NormalInfo description={"Pin"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? actuador.device_pin ? actuador.device_pin : "Sin pin"
                    : "Sin pin"
                } /> */}
            <NormalInfo description={"Modo"} Icon={FaRobot} info={
                actuador !== undefined 
                    ? actuador.mode == 1 
                        ? "Automático" 
                        : "Manual"
                    : "Sin modo"
            } />
            <NormalInfo description={"Estado"} Icon={GiPlantWatering} info={
                actuador !== undefined 
                    ? actuador.status == 1 
                        ? "Regando" 
                        : "Parado"
                    : "Sin estado"
            } />
            <NormalInfo description={"Programa"} Icon={IoTimeOutline} info={
                actuador !== undefined && actuador.activeProgram != null
                    ? getProgramName(actuador.activeProgram)
                    : "Sin programa"
            } />
        </div>
    )
}