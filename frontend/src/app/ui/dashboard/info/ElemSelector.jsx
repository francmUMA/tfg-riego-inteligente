import { useEffect, useState } from "react"
import Select from "react-select"
import { getCookie } from "cookies-next"
import { getDeviceInfo, getDevices } from "@/src/app/lib/devicesUtils"
import { getUserActuadores } from "@/src/app/lib/actuadorUtils"

export const ElemSelector = ({setElem, setType}) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const getAllElems = async () => {
            const token = getCookie("token")
            let devices = await getDevices(token)
            let actuadores = await getUserActuadores()
            console.log("Actuadores: ", actuadores)
            let elems = devices.concat(actuadores)
            elems = devices.map(device => ({type: 0, value: device, label: device.name}))
            elems = elems.concat(actuadores.map(actuador => ({type: 2, value: actuador, label: actuador.name})))
            setOptions(elems)
        }
        getAllElems()
    }, [])

    // const options = [
    //     {type: 0, value: 0, label: 'Device' },
    //     {type: 1,  value: 1, label: 'Sensor' },
    //     {type: 2,  value: 2, label: 'Actuator' },
    // ]
    
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
         className="w-full lg:px-3" placeholder="Elemento" options={options} isClearable/>
    )

}