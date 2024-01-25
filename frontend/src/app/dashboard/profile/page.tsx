'use client'
import { useState } from "react"

export default function Page() {
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <main className="w-full h-full flex justify-center items-center">
            <div className="w-3/4 h-full border border-black rounded-md bg-gray-50">
                <h1 className="mx-20 my-12 text-2xl">
                    Información de la cuenta
                </h1>
                <form>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        Nombre
                    </label>
                    <input name="nombre" type="text" placeholder={nombre} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg `}/>
                </div>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        Apellidos
                    </label>
                    <input name="apellidos" type="text" placeholder={apellidos} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg `}/>
                </div>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        DNI
                    </label>
                    <input name="dni" type="text" placeholder={dni} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg `}/>
                </div>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        Correo Electronico
                    </label>
                    <input name="email" type="text" placeholder={email} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg `}/>
                </div>
                <div className="flex flex-col mx-20">
                    <label className="font-medium">
                        Contraseña
                    </label>
                    <input name="password" type="password" placeholder={password} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg `}/>
                </div>
                </form>
            </div>
        </main>
    )
}