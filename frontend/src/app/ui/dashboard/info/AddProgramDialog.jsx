import { notify } from '@/src/app/lib/notify'
import { Dialog, DialogTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { timestampToTime } from '@/src/app/lib/programUtils'

export const AddProgramDialog = ({ open, onClose }) => {

    const [emptyName, setEmptyName] = useState(true)
    const [validName, setValidName] = useState(false)
    const [name, setName] = useState("")

    const [selectedDays, setSelectedDays] = useState([0,0,0,0,0,0,0])

    const [startTime, setStartTime] = useState(0)

    const [duration, setDuration] = useState(0)
    const [emptyDuration, setEmptyDuration] = useState(true)
    const [validDuration, setValidDuration] = useState(false)

    const handleButtonDayClick = (day) => {
        setSelectedDays(selectedDays.map((d,index) => 
            index == day 
                ? d == 1 
                    ? 0 
                    : 1
                : d
                ))
    }

    const handleDurationChange = (e) => {
        if (e.target.value < 0 || e.target.value > 167) {
            setEmptyDuration(false)
            setValidDuration(false)
            setDuration(0)
        } else {
            setEmptyDuration(true)
            setValidDuration(true)
            setDuration(e.target.value)
        }
    }

    const handleNameChange = (e) => {
        if (e.target.value === "") {
            setEmptyName(true)
            setValidName(false)
        } else {
            setEmptyName(false)
            if (e.target.value.length < 46) {
                setValidName(true)
                setName(e.target.value)
            } else {
                setValidName(false)
            }
        }
    }

    const handleStartTimeChange = (e) => {
        let time = e.target.value.split(':')
        let value = ((parseInt(time[0]) * 60 + parseInt(time[1])) * 60 - 3600 ) * 1000
        if (value != null && value > 0 ) setStartTime(value)
    }

    const handleAddProgram = () => {
        if (validName && validDuration && selectedDays.length > 0) {
            console.log({
                name,
                selectedDays,
                startTime,
                duration
            })
        } else {
            notify('Hay campos vacios o incorrectos', 'error')
        }
    }

    useEffect(() => {
        setSelectedDays([])
        setName("")
        setEmptyName(true)
        setValidName(false)
        setStartTime(0)
        setDuration(0)
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
                                        ? ""
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                    }`} type="text" placeholder="Nombre"/>
                </div>
                <div id='dias' className="h-full flex flex-col">
                    <label>Selecciona los días</label>
                    <div className='border rounded-md shadow-md overflow-hidden'>
                    <button onClick={() => handleButtonDayClick(0)} className={`w-10 h-10  hover:${
                            selectedDays[0] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[0] ? 'bg-indigo-600 text-white ' : 'bg-white'
                        }transition ease-in-out duration-150 `}>
                            L
                        </button>
                        <button onClick={() => handleButtonDayClick(1)} className={`w-10 h-10 hover:${
                            selectedDays[1] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[1] ? 'bg-indigo-600 text-white ' : ''
                        }transition ease-in-out duration-150 `}>
                            M
                        </button>
                        <button onClick={() => handleButtonDayClick(2)} className={`w-10 h-10 hover:${
                            selectedDays[2] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[2] && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            X
                        </button>
                        <button onClick={() => handleButtonDayClick(3)} className={`w-10 h-10 hover:${
                            selectedDays[3] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[3] && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            J
                        </button>
                        <button onClick={() => handleButtonDayClick(4)} className={`w-10 h-10 hover:${
                            selectedDays[4] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[4] && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            V
                        </button>
                        <button onClick={() => handleButtonDayClick(5)} className={`w-10 h-10 hover:${
                            selectedDays[5] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[5] && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            S
                        </button>
                        <button onClick={() => handleButtonDayClick(6)} className={`w-10 h-10 hover:${
                            selectedDays[6] ? 'bg-indigo-500' : 'bg-gray-100'
                        } border-r ${
                            selectedDays[6] && 'bg-indigo-600 text-white '
                        }transition ease-in-out duration-150 `}>
                            D
                        </button>
                        
                    </div>
                </div>
                <div id='hora' className="w-full h-full flex flex-col">
                        <label className="font-medium">Hora de inicio</label>
                        <input onChange={handleStartTimeChange} onBlur={handleStartTimeChange} className={`transition easy-in-out duration-200
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                                shadow-sm rounded-lg`} type="time" placeholder='00:00'/>
                </div>
                <div id='duracion' className="w-full h-full flex flex-col">
                    <label className="font-medium">Duracion (h)</label>
                    <input onChange={handleDurationChange} onBlur={handleDurationChange} className={`transition easy-in-out duration-200
                            w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600
                            shadow-sm rounded-lg ${
                                emptyDuration
                                ? "border-[#d6d3d1]"
                                : validDuration
                                    ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                    : "border-red-500 text-red-500 bg-gray-500/5"
                    }`} type="number" min={0} max={167} placeholder="0"/>
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
                            timestampToTime(startTime + (duration * 3600 * 1000))
                            }</p>
                    </div>
                </div>
                <button onClick={handleAddProgram} className="w-full h-8 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                    <p className='w-full flex justify-center items-center'>Actualizar</p>
                </button>
            </div>
        </Dialog>
    )
}