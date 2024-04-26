import { getActuadores, getUserActuadores, updateActuadorFlowmeter } from "@/src/app/lib/actuadorUtils";
import { getUnassignedCAUSensors } from "@/src/app/lib/sensorsUtils";
import { Dialog, DialogTitle } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Select from "react-select"

export const AddFlowmeterDialog = ({ open, onClose, setElems, elem }) => {

    const  [flowmeters, setFlowmeters] = useState([])
    const [selectedFlowmeter, setSelectedFlowmeter] = useState(null)

    const handleUpdateFlowmeter = async () => {
        if (selectedFlowmeter == null || selectedFlowmeter === undefined) return
        const token = getCookie("token")
        let res = await updateActuadorFlowmeter(elem.id, selectedFlowmeter, token)
        console.log(res)
        if (res) {
            let actuadores = await getUserActuadores()
            setElems(actuadores)
            onClose()
        }
        onClose()
    }

    const handleSelectFlowmeter = (selectedFlowmeter) => {
        setSelectedFlowmeter(selectedFlowmeter.value)
    }

    const fetchUnassignedFlowmeters = async () => {
        const token = getCookie("token")
        let flowmeters = await getUnassignedCAUSensors(token)
        flowmeters = flowmeters.map(flowmeter => {
            return {
                value: flowmeter.id,
                label: flowmeter.name
            }
        })
        setFlowmeters(flowmeters)   
    }

    useEffect(() => {
        if(elem !== undefined && open){
            fetchUnassignedFlowmeters()
        }
    }, [elem, open])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="w-full h-full">Selecciona un elemento de la lista</DialogTitle>
            <div className="flex flex-col p-4 gap-4">
                <Select onChange={handleSelectFlowmeter} placeholder="Caudalímetro..." options={flowmeters}/>
                <button onClick={handleUpdateFlowmeter} className="w-full h-8 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                    <p>Actualizar</p>
                </button>
            </div>
        </Dialog>
    )
}