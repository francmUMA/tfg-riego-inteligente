import { Dialog, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'

export const AddProgramDialog = ({ open, onClose }) => {

    const timestampToTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString()
    }

    const [emptyName, setEmptyName] = useState(true)
    const [validName, setValidName] = useState(false)
    const [name, setName] = useState("")

    const [selectedDays, setSelectedDays] = useState([])

    const [startTime, setStartTime] = useState(0)

    const handleButtonDayClick = (day) => {
        if(selectedDays.includes(day)){
            setSelectedDays(selectedDays.filter(d => d !== day))
        } else {
            setSelectedDays([...selectedDays, day])
        }
    }

    const handleNameChange = (e) => {
        
    }

    const handleStartTimeChange = (e) => {
        let time = e.target.value.split(':')
        let value = ((parseInt(time[0]) * 60 + parseInt(time[1])) * 60 - 3600 ) * 1000 
        setStartTime(value)
    }

    useEffect(() => {
        setSelectedDays([])
        setName("")
        setEmptyName(true)
        setValidName(false)
        setStartTime(0)
    }, [open])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className='w-full flex justify-center items-center border-b'>
                Crea un programa
            </DialogTitle>
            <div className='flex flex-col justify-center items-center p-4 gap-4'>
                <div id='nombre' className="w-full h-full flex flex-col">
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
                <div id='dias' className="h-full flex flex-col">
                    <label>Selecciona los días</label>
                    <div className='border rounded-md shadow-md overflow-hidden'>
                    <button onClick={() => handleButtonDayClick(1)} className={`w-10 h-10  hover:${
                            selectedDays.includes(1) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(1) ? 'bg-indigo-600 text-white ' : 'bg-white'
                        }transition ease-in-out duration-150 `}>
                            L
                        </button>
                        <button onClick={() => handleButtonDayClick(2)} className={`w-10 h-10 hover:${
                            selectedDays.includes(2) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(2) ? 'bg-indigo-600 text-white ' : ''
                        }transition ease-in-out duration-150 `}>
                            M
                        </button>
                        <button onClick={() => handleButtonDayClick(3)} className={`w-10 h-10 hover:${
                            selectedDays.includes(3) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(3) && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            X
                        </button>
                        <button onClick={() => handleButtonDayClick(4)} className={`w-10 h-10 hover:${
                            selectedDays.includes(4) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(4) && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            J
                        </button>
                        <button onClick={() => handleButtonDayClick(5)} className={`w-10 h-10 hover:${
                            selectedDays.includes(5) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(5) && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            V
                        </button>
                        <button onClick={() => handleButtonDayClick(6)} className={`w-10 h-10 hover:${
                            selectedDays.includes(6) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(6) && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            S
                        </button>
                        <button onClick={() => handleButtonDayClick(7)} className={`w-10 h-10 hover:${
                            selectedDays.includes(7) ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays.includes(7) && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            D
                        </button>
                        
                    </div>
                </div>
                <div id='hora' className="w-full h-full flex flex-col">
                        <label className="font-medium">Hora de inicio</label>
                        <input onChange={handleStartTimeChange} onBlur={handleStartTimeChange} className={`transition easy-in-out duration-200
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                shadow-sm rounded-lg ${
                                    emptyName
                                    ? "border-[#d6d3d1]"
                                    : validName
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                    }`} type="time" placeholder='00:00'/>
                </div>
                <div id='duracion' className="w-full h-full flex flex-col">
                    <label className="font-medium">Duracion</label>
                    <input onChange={handleNameChange} onBlur={handleNameChange} className={`transition easy-in-out duration-200
                            w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                            shadow-sm rounded-lg ${
                                emptyName
                                ? "border-[#d6d3d1]"
                                : validName
                                    ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                    : "border-red-500 text-red-500 bg-gray-500/5"
                    }`} type="number" min={0} placeholder="0"/>
                </div>
                <div id='resumen' className="w-full h-full flex flex-col">
                    <p>Resumen</p>
                    <div className='w-full h-full flex flex-row items-center gap-x-2'>
                        <p className='text-slate-400'>Inicio </p>
                        <p>{
                            timestampToTime(startTime)
                            }</p>
                    </div>
                    <div className='w-full h-full flex flex-row items-center gap-x-2'>
                        <p className='text-slate-400'>Fin </p>
                        <p>{
                            timestampToTime(startTime + (2 * 3600 * 1000))
                            }</p>
                    </div>
                </div>
                <button className="w-full h-8 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                    <p className='w-full flex justify-center items-center'>Actualizar</p>
                </button>
            </div>
        </Dialog>
    )
}