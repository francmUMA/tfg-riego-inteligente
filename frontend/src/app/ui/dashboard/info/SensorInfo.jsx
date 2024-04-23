import { NormalInfo, getCropName } from "./DeviceInfo";
import { TbDeviceWatchStats2 } from "react-icons/tb"
import { HiMiniCpuChip } from "react-icons/hi2";
import { PiPlantDuotone } from "react-icons/pi"
import { BsClipboard2Data } from "react-icons/bs"
import { getDeviceName } from "@/src/app/lib/devicesUtils";
import { getSensorLastValue } from "@/src/app/lib/sensorsUtils";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

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
            {/* <NormalInfo description={"Pin"} Icon={IoIosAddCircleOutline} info={"19"} /> */}
            <NormalInfo description={"Valor"} Icon={BsClipboard2Data} info={
                0
            } />
        </div>
    )
}