'use client'
import { getCookie } from "cookies-next"
import { Suspense, useEffect, useState } from "react"
import { checkToken } from "../../lib/token"
import { useRouter } from "next/navigation"
import { fetchUserInfo, updateNameSurname } from "../../lib/userInfo"
import Checkbox from "../../ui/Checkbox"

export default function Page() {
    const [eventos, setEventos] = useState([
        { 
            "name": "Apertura o Cierre de actuadores",
            "active": true,
        },
        {
            "name": "Fallo en la apertura o en el cierre de los actuadores",
            "active": true,
        },
        {
            "name": "Fallo en la lectura de los sensores",
            "active": true,
        },
        {
            "name": "Error al añadir o eliminar algún dispositivo, sensor, actuador, cultivo o área",
            "active": false,
        }
    ])

    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')

    const [enableName, setEnableName] = useState(false)
    const [enableApellidos, setEnableApellidos] = useState(false)

    const [validName, setValidName] = useState(false)
    const [validApellidos, setValidApellidos] = useState(true)

    const router = useRouter()

    const handleEditButton = async () => {
        if (enableName && enableApellidos) {
            // Actualizar usuario
            let token = getCookie("token")
            console.log(token)
            console.log(nombre)
            console.log(apellidos)
            let updateUser = await updateNameSurname(nombre as string, apellidos as string, token as string)
            if (updateUser) {
                alert("Usuario actualizado")
            } else {
                alert("Error al actualizar el usuario")
            }
        }
        setEnableName(!enableName)
        setEnableApellidos(!enableApellidos)
    }

    useEffect(() => {
        const token = getCookie("token")

        const verify = async (token: string) => {
            let check = await checkToken(token)
            if (!check) {
                router.push("/login")
            } 
        }

        const getUserInfo = async (token: string) => {
            let data = await fetchUserInfo(token)
            if (data != undefined) {
                setNombre(data.nombre)
                setApellidos(data.apellidos)
                setDni(data.NIF)
                setEmail(data.email)
            }
        }

        // Verify token
        verify(token as string)

        // Fetch data
        getUserInfo(token as string)

    }, [])

    return (
        <main className="px-10 w-full h-full flex justify-center items-center">
            <div className="w-full h-full flex flex-col border rounded-md shadow-md bg-gray-50 overflow-auto">
                <div className="mx-20 my-12 flex flex-row justify-between">
                    <h1 className="text-2xl">
                        Información de la cuenta
                    </h1>
                    <button
                        onClick={handleEditButton} 
                        className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            {enableName ? "Guardar" : "Editar"}
                    </button>
                </div>
                
                <form>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        Nombre
                    </label>
                    <input name="nombre" type="text" placeholder={nombre} disabled={enableName ? false : true} required
                    onBlur={(e) => setNombre(e.target.value)}
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg 
                    ${
                        enableName ? "border-indigo-600" : ""
                        
                    }`}/>
                </div>
                <div className="flex flex-col mx-20 my-5">
                    <label className="font-medium">
                        Apellidos
                    </label>
                    <input name="apellidos" type="text" placeholder={apellidos} disabled={enableApellidos ? false : true} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500 outline-none border shadow-sm rounded-lg 
                    ${
                        enableApellidos ? "border-indigo-600" : ""
                    
                    }`}
                    onBlur={(e) => setApellidos(e.target.value)}
                    />
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
                    <input name="password" type="password" value={"Fake Password"} disabled={true ? true : false} required
                    className={`transition easy-in-out duration-200 
                    w-full mt-2 px-3 py-2 bg-transparent text-gray-500/50 outline-none border shadow-sm rounded-lg `}/>
                </div>
                </form>
                <section className="w-full h-full p-20 flex gap-y-3 items-center justify-center flex-col">
                    <div className="w-full h-full flex items-center justify-start">
                        <h1 className="text-2xl"> Mis eventos </h1>
                    </div>
                    {
                        eventos.map((evento, index) => {
                            return(
                                <div key={index} className="w-full h-full">
                                    <label className="w-full h-full flex justify-start items-center gap-2">
                                        <Checkbox active={evento.active} onChange={() => setEventos(eventos.map( (e, i) => {
                                            if (i === index) {
                                                e.active = !e.active
                                            }
                                            return e
                                        }))}/>
                                        <p className="px-5">{evento.name}</p>
                                    </label>
                                
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </main>
    )
}