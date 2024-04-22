import { getDeviceName } from "@/src/app/lib/devicesUtils";
import { NormalInfo, getCropName } from "./DeviceInfo";
import { IoIosAddCircleOutline } from "react-icons/io"

export const ActuadorInfo =  ({actuador}) => {
    return(
        <div className="w-full h-full justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 overflow-y-auto">
            <NormalInfo description={"Nombre"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                ? actuador.name
                : "Sin nombre"
            } />
            <NormalInfo description={"Device"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? getDeviceName(actuador.device)
                    : "Sin dispositivo"
            } />
            <NormalInfo description={"Cultivo"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? getCropName(actuador.area)
                    : "Sin cultivo"
                } />
            <NormalInfo description={"Pin"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? actuador.device_pin ? actuador.device_pin : "Sin pin"
                    : "Sin pin"
                } />
            <NormalInfo description={"Modo"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? actuador.mode == 1 
                        ? "Manual" 
                        : "Automatico"
                    : "Sin modo"
            } />
            <NormalInfo description={"Estado"} Icon={IoIosAddCircleOutline} info={
                actuador !== undefined 
                    ? actuador.status == 1 
                        ? "Regando" 
                        : "Parado"
                    : "Sin estado"
            } />
            <NormalInfo description={"Programa"} Icon={IoIosAddCircleOutline} info={"No hay programa"} />
        </div>
    )
}