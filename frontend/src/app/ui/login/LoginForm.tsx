'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { checkLoginEmail } from "../../lib/checkEmail"
import checkPassword  from "../../lib/checkPassword"
import { getCookie, setCookie } from "cookies-next"
import { getToken } from "../../lib/token"
import "./bg-form.css"
import CircularIndeterminate from "../dashboard/info/CircularFallback"
import { notify } from "../../lib/notify"

export default function RegisterForm() {

    const [email, setEmail] = useState('')
    const [emptyEmail, setEmptyEmail] = useState(true)
    const [validEmail, setValidEmail] = useState(false)
    const [validEmailMessage, setValidEmailMessage] = useState('')

    const [password, setPassword] = useState('')
    const [emptyPassword, setEmptyPassword] = useState(true)
    const [validPassword, setValidPassword] = useState(false)
    const [validPasswordMessage, setValidPasswordMessage] = useState('')

    
    const router = useRouter()

    const handleEmail = async (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyEmail(true)
        } else {
            setEmptyEmail(false)
            let verifyEmail = await checkLoginEmail(e.target.value as string)
            if (verifyEmail) {
                setValidEmail(true)
                setEmail(e.target.value)
            } else {
                setValidEmail(false)
                setValidEmailMessage('Email no valido')
            }
        }
    }

    const handlePassword = async (e: { target: { value: string } }) => {
        if (e.target.value === '') {
            setEmptyPassword(true)
        } else {
            setEmptyPassword(false)
            if (e.target.value.length >= 8 && e.target.value.length <= 16) {
                if (validEmail) {
                    let verifyPassword = await checkPassword(e.target.value as string, email as string)
                    if (verifyPassword) {
                        setValidPassword(true)
                        setPassword(e.target.value)
                    } else{
                        setValidPassword(false)
                        setValidPasswordMessage('La contraseña no coincide')
                    }
                } else {
                    setValidPassword(false)
                    setValidPasswordMessage('La contraseña no coincide ya que el correo es invalido')
                }                
            } else {
                setValidPassword(false)
                setValidPasswordMessage('La contraseña debe tener entre 8 y 16 caracteres')
            }
        }
    }
    const [loading, setLoading] = useState(false)

    const renderContent = () => {
            return (
                <div className="flex-1 flex items-center justify-center h-full overflow-hidden">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <div className="flex justify-center items-center">
                            <Image src="/logo.png" alt="" width="150" height="0" />
                        </div>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Inicia Sesion</h3>
                            <p className="">No tienes cuenta? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Regístrate</a></p>
                        </div>
                    </div>

                    <div className="relative">
                        
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"></p>
                    </div>
                    <form onSubmit={async (e) => {
                        setLoading(true) 
                        e.preventDefault()
                        if (validEmail && validPassword) {
                            let token = await getToken(email as string, password as string)
                            setCookie('token', token)
                            router.push('/dashboard')
                        } else {
                            notify('Error al iniciar sesión', 'error')
                            setLoading(false)
                        }
                        
                    }}
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
                                {
                                    loading ? <CircularIndeterminate/> : 'Adelante'
                                }
                            </button>
                        </div>
                </form>
                </div>
            </div>
            )
    }

  return (
    <main className="w-full h-full flex rounded-xl shadow-xl">
        <div className="relative flex-1 shadow-xl bg-gray-100/10 flex-col hidden h-full bg-white lg:flex rounded-xl">
            <div className="p-8 pt-20 gap-5 h-full w-full flex flex-col items-center justify-center">
                <p className="text-3xl">Inicia sesión en tu cuenta</p>
                <p className="text-center">Obtén acceso a los datos de tus dispositivos y de tu cultivo y continua controlando tu riego</p>
            </div>
            <div className="h-full w-full flex justify-center items-center">
                <Image src={"/Login-rafiki.svg"} alt="" width="450" height={0}></Image>
            </div>
        </div> 
        {renderContent()}
    </main>
  )
}

