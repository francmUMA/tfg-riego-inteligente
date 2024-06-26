import { addArea } from "@/src/app/lib/areasUtils"
import { notify } from "@/src/app/lib/notify"
import { Dialog, DialogTitle } from "@mui/material"
import { getCookie } from "cookies-next"
import { useState } from "react"
import Checkbox from "../../Checkbox"

export const AddAreaDialog = (openDialog, closeDialog, cropId, setPlace, setAreaId) => {
    const [emptyName, setEmptyName] = useState(true)
    const [validName, setValidName] = useState(false)
    const [name, setName] = useState("")
    const [indoor, setIndoor] = useState(false)

    const handleSubmit = async () => {
        if (!emptyName && validName) {
            const token = getCookie("token")
            let res = await addArea(name, cropId, indoor, token)
            if (res !== undefined) {
                closeDialog()
                setPlace(true)
                setAreaId(res)
                notify("Debes colocar la zona en el mapa", "info")
            } else {
                notify("Error al crear la zona", "error")
            }
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value === "") {
            setEmptyName(true)
            setValidName(false)
        } else {
            setEmptyName(false)
            if (e.target.value.length < 45) {
                setValidName(true)
                setName(e.target.value)
            } else {
                setValidName(false)
            }
        }
    }

    return(
        <Dialog open={openDialog} onClose={closeDialog}>
            <DialogTitle className="border w-96 flex items-center justify-center">
                <h1>Crear zona</h1>
            </DialogTitle>
            <section className="w-full p-5 h-full">
                <div className="flex flex-col gap-y-5">
                    <div className="w-full h-full flex flex-col">
                        <label className="font-medium">Nombre</label>
                        <input onChange={handleNameChange} onBlur={handleNameChange} className={`transition easy-in-out duration-200
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                shadow-sm rounded-lg ${
                                    emptyName
                                    ? "border-[#d6d3d1]"
                                    : validName
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                    }`} type="text" placeholder="Nombre"/>
                    </div>
                    <div className="w-full h-full">
                        <label className="w-full h-full flex justify-start items-center gap-1">
                            <Checkbox active={indoor} onChange={() => setIndoor(!indoor)}/>
                            <p className="px-5">Zona cubierta</p>
                        </label>
                    </div>
                    
                    <button 
                    onClick={handleSubmit}
                    className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                        Añadir Zona
                    </button>
                </div>
            </section>
        </Dialog>
    )
}