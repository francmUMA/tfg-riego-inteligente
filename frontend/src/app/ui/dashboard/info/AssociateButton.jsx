import { FaLink } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"
import { useEffect, useState } from "react"

export const AssociateButton = ({elem, type, setAssocProgram, assocProgram}) => {

    useEffect(() => {
        setAssocProgram(false)
    }, [])
    

    return (
        <button disabled={
            elem === undefined || (elem !== undefined && type != 2) || (elem !== undefined && type == 2 && elem.activeProgram != null)
        }       onClick={() => setAssocProgram(!assocProgram)}
                className={`shadow-md rounded-md h-10 flex disabled:text-slate-400 justify-center items-center gap-x-1 border hover:bg-gray-50 duration-150 px-1`}>
            {
                assocProgram == false
                    ? <FaLink size={22} className="text-indigo-600"/>
                    : <MdCancel size={22} className="text-red-600"/>
            }
            {
                assocProgram == false
                    ? 'Asociar Programa'
                    : 'Cancelar'
            }
            
        </button>
    )
}