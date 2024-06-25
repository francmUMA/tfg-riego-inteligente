import { addCrop } from "@/src/app/lib/cropUtils"
import { Dialog, DialogTitle } from "@mui/material"
import { useState } from "react"

export const AddCropDialog = (openDialog, closeDialog) => {
    const [emptyName, setEmptyName] = useState(true)
    const [validName, setValidName] = useState(false)
    const [name, setName] = useState("")

    const handleSubmit = async () => {
        if (!emptyName && validName) {
            let res = await addCrop(name)
            if (res) {
                closeDialog()
            } else {
                alert("Error al crear el cultivo")
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
                <h1>Crear cultivo</h1>
            </DialogTitle>
            <section className="w-full p-5 h-full flex flex-col gap-y-2">
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
                <button onClick={handleSubmit}
                className="w-full h-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    Añadir Cultivo
                </button>
            </section>
        </Dialog>
    )
}