import { useEffect, useState } from "react"
import Select from "react-select"
import { getCookie } from "cookies-next"
import { getDevices } from "@/src/app/lib/devicesUtils"

export const ElemSelector = ({setElem, setType}) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const getAllElems = async () => {
            const token = getCookie("token")
            let devices = await getDevices(token)
            setOptions(devices.map(device => ({type: 0, value: device.id, label: device.name})))
        }
        getAllElems()
    }, [])

    // const options = [
    //     {type: 0, value: 0, label: 'Device' },
    //     {type: 1,  value: 1, label: 'Sensor' },
    //     {type: 2,  value: 2, label: 'Actuator' },
    // ]
    
    const handleOnChange = (selectedOption) => {
        selectedOption == null 
            ? setType(undefined) 
            : setType(selectedOption.type)
    }
    return (
        <Select
            onChange={handleOnChange}
         className="w-full lg:px-3" placeholder="Elemento" options={options} isClearable/>
    )

}