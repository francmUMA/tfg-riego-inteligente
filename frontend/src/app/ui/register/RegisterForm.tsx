'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import { MdDone } from "react-icons/md";
import {checkRegisterEmail} from "../../lib/checkEmail"
import registerUser, { updateUserLocation } from "../../lib/registerUser"
import { getToken } from "../../lib/token"
import { getCookie, setCookie } from "cookies-next"
import"./bg-form.css"
import { Map, APIProvider, Marker } from "@vis.gl/react-google-maps"
import { getLocation } from "../../lib/miscUtils";

export default function RegisterForm() {
    const [startLocation, setStartLocation] = useState({lat: 0, lng: 0})

    const getStartLocation = async () => {
        let position = await getLocation()
        if (position === undefined) return
        setStartLocation({lat: position.lat, lng: position.lng})
        setUserLocation({lat: position.lat, lng: position.lng})
    }

    useEffect(() => {
        getStartLocation()
    }, [])

    const [showForm, setShowForm] = useState(true)

    const [email, setEmail] = useState('')
    const [emptyEmail, setEmptyEmail] = useState(true)
    const [validEmail, setValidEmail] = useState(false)
    const [validEmailMessage, setValidEmailMessage] = useState('')

    const [password, setPassword] = useState('')
    const [emptyPassword, setEmptyPassword] = useState(true)
    const [validPassword, setValidPassword] = useState(false)
    const [validPasswordMessage, setValidPasswordMessage] = useState('')

    const [showDataForm, setShowDataForm] = useState(false)

    const [name, setName] = useState('')
    const [emptyName, setEmptyName] = useState(true)
    const [validName, setValidName] = useState(false)
    const [validNameMessage, setValidNameMessage] = useState('')

    const [surname, setSurname] = useState('')
    const [emptySurname, setEmptySurname] = useState(true)
    const [validSurname, setValidSurname] = useState(false)
    const [validSurnameMessage, setValidSurnameMessage] = useState('')

    const [nif, setNif] = useState('')
    const [emptyNif, setEmptyNif] = useState(true)
    const [validNif, setValidNif] = useState(false)
    const [validNifMessage, setValidNifMessage] = useState('')
    
    const router = useRouter()

    const handleEmail = async (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyEmail(true)
        } else {
            setEmptyEmail(false)
            let verifyEmail = await checkRegisterEmail(e.target.value as string)
            if (verifyEmail == 0) {
                setValidEmail(true)
                setEmail(e.target.value)
            } else if (verifyEmail == 1) {
                setValidEmail(false)
                setValidEmailMessage('Email inválido')
            } else {
                setValidEmail(false)
                setValidEmailMessage('Email ya registrado')
            }
        }
    }

    const handlePassword = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyPassword(true)
        } else {
            setEmptyPassword(false)
            if (e.target.value.length >= 8 && e.target.value.length <= 16) {
                setValidPassword(true)
                setPassword(e.target.value)
            } else {
                setValidPassword(false)
                setValidPasswordMessage('La contraseña debe tener entre 8 y 16 caracteres')
            }
        }
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setShowForm(false)
        setShowDataForm(true)
    }

    const handleName = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyName(true)
            setName('')
        } else {
            setEmptyName(false)
            if (e.target.value.length <= 45) {
                setValidName(true)
                setName(e.target.value)
            } else {
                setValidName(false)
                setValidNameMessage('El nombre no puede tener más de 45 caracteres')
            }
        }
    }

    const handleSurname = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptySurname(true)
            setSurname('')
        } else {
            setEmptySurname(false)
            if (e.target.value.length <= 45) {
                setValidSurname(true)
                setSurname(e.target.value)
            } else {
                setValidSurname(false)
                setValidSurnameMessage('El apellido no puede tener más de 45 caracteres')
            }
        }
    }

    const handleNif = (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyNif(true)
        } else {
            setEmptyNif(false)
            if (e.target.value.length <= 9) {
                setValidNif(true)
                setNif(e.target.value)
            } else {
                setValidNif(false)
                setValidNifMessage('El NIF no puede tener más de 9 caracteres')
            }
        }
    }

    const handleSubmitDataForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        let user = {
            email: email,
            password: password,
            nombre: name,
            apellidos: surname,
            NIF: nif
        }
        let createUser = await registerUser(user)
        if (createUser) {
            console.log('Usuario creado correctamente')
            let token = await getToken(email as string, password as string)
            setCookie('token', token)
            setShowLocationMap(true)
        } else {
            console.log('Error al crear el usuario')
        }
    }

    const [showLocationMap, setShowLocationMap] = useState(false)
    const [userLocation, setUserLocation] = useState({lat: 0, lng: 0})

    const handleDragMarker = (e: any) => {
        setUserLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
    }

    const handleUpdateUserLocation = async () => {
        const token = getCookie('token')
        let res = await updateUserLocation(token as string, userLocation.lat, userLocation.lng)
        if (!res) console.log('Error al actualizar la ubicacion')
        router.push('/dashboard')
    }

    const locationMapComponent = () => {
        return (
            <div className="flex flex-col gap-y-4 items-center justify-center w-full h-full">
                <header>
                    <h1 className="text-xl font-medium">Selecciona tu ubicación en el mapa</h1>
                </header>
                <div>
                    <div className="w-full h-full flex flex-row gap-x-2">
                        <button className="flex border rounded-md shadow-md w-10 items-center justify-center h-10 hover:bg-gray-100" onClick={handleUpdateUserLocation}>
                            <MdDone size={24} color="green" />
                        </button>
                    </div>
                </div>
                <div className="w-2/3 h-2/3 rounded-md shadow-md overflow-hidden">
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
                        <Map mapId={"750877eaffcf7c34"} disableDefaultUI defaultCenter={startLocation} defaultZoom={5} >
                            <Marker position={{lat: userLocation.lat, lng:userLocation.lng}} draggable onDragEnd={handleDragMarker}/>
                        </Map>
                    </APIProvider>
                </div>
            </div>
        )
    }

    const renderContent = () => {
        if (showForm) {
            return (
                <div className="flex-1 flex items-center justify-center h-full overflow-hidden">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <div className="flex justify-center items-center">
                            <Image src="/logo.png" alt="" width="150" height="0" />
                        </div>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Regístrate</h3>
                            <p className="">Tienes ya cuenta? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesion</a></p>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="flex flex-col">
                            <label className="font-medium">
                                Email
                            </label>
                            <input name="email" type="email" onChange={handleEmail} onBlur={handleEmail} required
                            className={`transition easy-in-out duration-200 
                            w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                            shadow-sm rounded-lg ${
                                emptyEmail 
                                ? "border-[#d6d3d1]"
                                : validEmail
                                    ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                    : "border-red-500 text-red-500 bg-gray-500/5"
                            }`}/>
                            {
                                emptyEmail
                                ? null
                                : validEmail
                                    ?  null
                                    :  <p className="transition easy-in-out duration-200 w-full text-red-500/75">
                                        {validEmailMessage}
                                        </p>
                            }
                        </div>
                       <div className="flex flex-col">
                            <label className="font-medium">
                                Contraseña
                            </label>
                            <input name="password" type="password" onChange={handlePassword} onBlur={handlePassword} required 
                            className={`transition easy-in-out delay-100 duration-150  
                            w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 
                            shadow-sm rounded-lg ${
                                emptyPassword 
                                ? "border-[#d6d3d1]"
                                : validPassword
                                    ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                    : "border-red-500 text-red-500 bg-gray-500/5"
                            }`}/>
                            {
                                emptyPassword
                                ? null
                                : validPassword
                                    ?  null
                                    :  <p className="transition easy-in-out duration-200 w-full text-red-500/75">
                                        {validPasswordMessage}
                                        </p>
                            }
                       </div>
                        <div>
                            <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                Crear cuenta</button>
                        </div>
                    </form>
                </div>
            </div>
                
            )
        } else if (showDataForm && !showLocationMap) {
            return (
                <div className="flex-1 flex items-center justify-center h-full overflow-hidden">
                    <div className="space-y-5 mx-5">
                        <div className="flex justify-center items-center">
                            <Image src="/logo.png" alt="" width="150" height="0" />
                        </div>
                        <div>
                            <h1 className="">Rellene el formulario para terminar de crear su cuenta</h1>
                        </div>
                        <form onSubmit={handleSubmitDataForm} className="space-y-5">
                            <div className="flex flex-col">
                                <label className="font-medium">
                                    Nombre
                                </label>
                                <input name="nombre" type="text" placeholder="Nombre" value={name} onChange={handleName} onBlur={handleName} required
                                className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg ${
                                    emptyName 
                                    ? "border-[#d6d3d1]"
                                    : validName
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                                }`}/>
                                {
                                    emptyName
                                    ? null
                                    : validName
                                        ?  null
                                        :  <p className="transition easy-in-out duration-200 w-full text-red-500/75">
                                            {validNameMessage}
                                            </p>
                                }
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">
                                    Apellidos
                                </label>
                                <input name="surname" type="text" placeholder="(Opcional)" value={surname} onChange={handleSurname} onBlur={handleName}
                                className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg ${
                                    emptySurname 
                                    ? "border-[#d6d3d1]"
                                    : validSurname
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                                }`}/>
                                {
                                    emptySurname
                                    ? null
                                    : validSurname
                                        ?  null
                                        :   <p className="transition easy-in-out duration-200 w-full text-red-500/75">
                                            {validSurnameMessage}
                                            </p>
                                }
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">
                                    NIF
                                </label>
                                <input name="nombre" type="text" placeholder="NIF" onChange={handleNif} onBlur={handleNif} required
                                className={`transition easy-in-out duration-200 
                                w-full mt-2 px-3 py-2 bg-transparent focus:text-gray-500 outline-none border focus:border-indigo-600 
                                shadow-sm rounded-lg ${
                                    emptyNif 
                                    ? "border-[#d6d3d1]"
                                    : validNif
                                        ? "border-green-500 text-[#22c55e] bg-gray-500/5"
                                        : "border-red-500 text-red-500 bg-gray-500/5"
                                }`}/>
                                {
                                    emptyNif
                                    ? null
                                    : validNif
                                        ?  null
                                        :  <p className="transition easy-in-out duration-200 w-full text-red-500/75">
                                            {validNifMessage}
                                            </p>
                                }
                            </div>
                            <div className="flex items-center justify-center pt-4">
                                <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else if (showLocationMap) {
            return (
                <div className="flex-1 flex items-center justify-center h-full overflow-hidden">
                    {locationMapComponent()}
                </div>
            )
        }
    }

  return (
    <main className="w-full h-full flex rounded-xl shadow-xl">
        <div className="relative flex-1 shadow-xl bg-gray-100/10 flex-col hidden h-full bg-white lg:flex rounded-xl">
            <div className="p-8 pt-20 gap-5 h-full w-full flex flex-col items-center justify-center">
                <p className="text-3xl">Crea una cuenta</p>
                <p className="text-center">Obtén acceso a nuestra IA de gestión de riego y controla todo tu riego de una forma centralizada</p>
            </div>
            <div className="h-full w-full flex justify-center items-center">
                <Image src={"/Login-rafiki.svg"} alt="" width="450" height={0}></Image>
            </div>
        </div>
        {renderContent()}
    </main>
  )
}
