import { notify } from "@/src/app/lib/notify"
import { disassociateProgram } from "@/src/app/lib/programUtils"
import { FaLink, FaLinkSlash } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"


export const AssociateButton = ({elem, type, setAssocProgram, assocProgram}) => {

    const unlinkProgram = async () => {
        if (elem !== undefined){
            let res = await disassociateProgram(elem.id, elem.activeProgram)
            if (res) {
                setAssocProgram(false)
            }
        } else {
            notify('error', 'No se pudo desasociar el programa')
        }
    }

    return (
        <button disabled={
            elem === undefined || (elem !== undefined && type != 2) || (elem !== undefined && type == 2 && elem.mode == 1)
        }       onClick={() => {
                    elem !== undefined && elem.activeProgram != null
                    ? unlinkProgram()
                    : setAssocProgram(!assocProgram)
                }}
                className={`shadow-md rounded-md h-10 flex disabled:text-slate-400 justify-center items-center gap-x-1 border hover:bg-gray-50 duration-150 px-1`}>
            {
                assocProgram == false
                    ? elem !== undefined && elem.activeProgram == null
                        ? <FaLink size={22} className="text-indigo-600"/>
                        : <FaLinkSlash size={22} className="text-indigo-600"/>
                    : <MdCancel size={22} className="text-red-600"/>
            }
            {
                assocProgram == false
                    ? elem !== undefined && elem.activeProgram == null
                        ? 'Asociar Programa'
                        : 'Desasociar Programa'
                    : 'Cancelar'
            }
            
        </button>
    )
}