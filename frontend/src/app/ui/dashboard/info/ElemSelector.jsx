import { useEffect, useState } from "react"
import Select from "react-select"
import { getCookie } from "cookies-next"
import { getDevices } from "@/src/app/lib/devicesUtils"
import { getUserActuadores } from "@/src/app/lib/actuadorUtils"
import { getUserSensors } from "@/src/app/lib/sensorsUtils"
import { HiMiniCpuChip } from "react-icons/hi2"
import { FaFaucetDrip } from "react-icons/fa6"
import { TbDeviceWatchStats2 } from "react-icons/tb"

export const ElemSelector = ({setElem, setType}) => {
    const [options, setOptions] = useState([])

    const Label = ({type, value}) => {
        switch (type) {
            case 0:
                return (
                    <div className="flex flex-row items-center gap-x-4">
                        <HiMiniCpuChip size={22} className="text-indigo-700"/>
                        <p className="text-lg font-medium">{value.name}</p>
                    </div>
                )
            case 1:
                return (
                    <div className="w-full flex flex-row items-center gap-x-4">
                        <TbDeviceWatchStats2  size={22} className="text-indigo-700"/>
                        <p className="text-lg font-medium">{value.name}</p>
                    </div>
                )
            case 2:
                return (
                    <div className="w-full flex flex-row items-center gap-x-4">
                        <FaFaucetDrip size={22} className="text-indigo-700"/>
                        <p className="text-lg font-medium">{value.name}</p>
                    </div>
                )
        }
    
    }

    useEffect(() => {
        const getAllElems = async () => {
            const token = getCookie("token")
            let devices = await getDevices(token)
            let actuadores = await getUserActuadores()
            let sensors = await getUserSensors()
            console.log("Actuadores: ", actuadores)
            let elems = devices.concat(actuadores)
            elems = devices.map(device => ({type: 0, value: device, label: Label({type: 0, value: device})}))
            elems = elems.concat(actuadores.map(actuador => ({type: 2, value: actuador, label: Label({type: 2, value: actuador})})))
            elems = elems.concat(sensors.map(sensor => ({type: 1, value: sensor, label: Label({type: 1, value: sensor})})))
            setOptions(elems)
        }
        getAllElems()
    }, [])
    
    const handleOnChange = (selectedOption) => {
        if (selectedOption == null ){
            setType(undefined)
            setElem(undefined)
        } else {
            setType(selectedOption.type)
            setElem(selectedOption.value)
        } 
    }

    return (
        <Select
            onChange={handleOnChange}
         className="w-full lg:px-3" placeholder="Elemento"  options={options} isClearable/>
    )

}