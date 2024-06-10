import { associateProgram, deleteProgram, disassociateProgram, getPrograms, timestampToTime } from "@/src/app/lib/programUtils"
import { useEffect, useState } from "react"
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa"
import { FiClock } from "react-icons/fi"
import { CiSquarePlus } from "react-icons/ci"

export const ProgramsInfo = ({setUpdateActuador,updateProgram, setUpdateProgram, elem, associate, setAssociate}) => {

    const [programs, setPrograms] = useState([])

    const fetchPrograms = async () => {
        let data = await getPrograms()
        setPrograms(data)
    }

    const updateAssociateProgram = async (index) => {
        if (elem !== undefined && elem.activeProgram == null){
            let res = await associateProgram(programs[index].id, elem.id)
            if (res) {
                setUpdateActuador(true)
                setAssociate(false)
            }
        } else if (elem !== undefined && elem.activeProgram !== null) {
            let res = await disassociateProgram(elem.id, elem.activeProgram)
            if (res) {
                setUpdateActuador(true)
                setAssociate(false)
            }
        }
    }

    const deleteProgram2 = async (id) => {
        let res = await deleteProgram(id)
        if (res) {
            fetchPrograms()
        }
    }

    useEffect(() => {
        fetchPrograms()
    }, [elem])

    useEffect(() => {
        if (updateProgram) {
            fetchPrograms()
            setUpdateProgram(false)
        }
    }, [updateProgram])
    return (
        <main className="w-full h-full flex flex-col items-center">
            <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">
                Programas
            </h1>
            <div className="w-full h-full overflow-auto rounded-md">
            {
                programs.length > 0 
                ?    programs.map((program, index) => (
                        <div key={index} className={`w-full h-12 flex flex-row items-center gap-x-3 px-2 overflow-x-auto ${
                            index % 2 == 0 ? "bg-blue-100" : "bg-gray-50"
                        }`}>
                            <p className=" h-full flex items-center justify-start font-semibold">{program.name}</p>
                            <p className="min-w-10 h-full flex items-center justify-start">
                                {
                                    timestampToTime(program.startTime)
                                }
                            </p>
                            <div className="min-w-16 h-full flex items-center justify-start gap-x-1">
                                <FiClock className="text-indigo-600" size={16} />
                                <p className="text-center">{program.duration == null ? 0 : program.duration} h</p>
                            </div>
                            <div className="h-8 flex items-center justify-start border rounded-md bg-white">
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days & 0x01) && 'bg-indigo-500 text-white'
                                }`}>L</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days >> 1 & 0x01) && 'bg-indigo-500 text-white'
                                }`}>M</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days >> 2 & 0x01) && 'bg-indigo-500 text-white'
                                }`}>X</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days >> 3 & 0x01) && 'bg-indigo-500 text-white'
                                }`}>J</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days >> 4 & 0x01) && 'bg-indigo-500 text-white'
                                }`}>V</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    (program.days >> 5 & 0x01) && 'bg-indigo-500 text-white'
                                }`}>S</p>
                                <p className={`w-7 h-full flex justify-center items-center border-r ${
                                    program.days >> 6 && 'bg-indigo-500 text-white'
                                }`}>D</p>
                            </div>
                            <button onClick={
                                () => {
                                    associate
                                        ? updateAssociateProgram(index)
                                        : console.log("Edit program")
                                }
                            }
                            className="min-w-8 h-8 flex items-center justify-center rounded-md border bg-white hover:bg-gray-100 transition ease-in-out duration-150 shadow-md">
                                {
                                    associate !== undefined && associate == true && elem !== undefined && elem.activeProgram == null
                                        ? <CiSquarePlus className="text-indigo-600" size={16}></CiSquarePlus>
                                        : <FaRegEdit className="text-indigo-600" size={16} />
                                }
                                
                            </button>
                            <button
                                onClick={() => deleteProgram2(programs[index].id)}
                                className="min-w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-400 transition ease-in-out duration-150 rounded-md shadow-md">
                                <FaRegTrashAlt className="text-white" size={16} />
                            </button>
                        </div>
                    ))
                : <p className="w-full h-full flex justify-center items-center">No se ha creado ningún programa</p>
            }
            </div>
        </main>
    )
}