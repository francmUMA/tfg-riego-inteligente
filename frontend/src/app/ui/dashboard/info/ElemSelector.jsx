import { useEffect } from "react"
import Select from "react-select"

export const ElemSelector = ({setElem, setType}) => {
    // useEffect(() => {
    //     const getDevices = async () => {}
    //     const getSensors = async () => {}
    //     const getActuators = async () => {}
    // },[])

    const options = [
        {type: 0, value: 0, label: 'Device' },
        {type: 1,  value: 1, label: 'Sensor' },
        {type: 2,  value: 2, label: 'Actuator' },
    ]
    
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