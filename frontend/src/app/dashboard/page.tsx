'use client'
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { checkToken } from "../lib/token"
import ClimaInfo from "../ui/dashboard/ClimaInfo"
import DevicesInfo from "../ui/dashboard/DevicesInfo"
import ActuadoresInfo from "../ui/dashboard/ActuadoresInfo"
import SensorsInfo from "../ui/dashboard/SensorsInfo"


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) router.push("/login")
        const verify = async (token: string) => {
            let check = await checkToken(token)
            if (!check) {
                router.push("/login")
            } 
        }
        verify(token as string)
    }, [router])

    return (
        <main className="flex flex-col gap-3 h-full w-full">
            <section className="w-full h-full flex flex-row gap-x-3 justify-center items-center">
                <div id="devices-info" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                    <DevicesInfo />
                </div>
                <div id="clima-imfo" className="ease-in-out duration-150 h-full w-full flex justify-center items-center">
                    <ClimaInfo />
                </div>
            </section>
            <section id="actuadores-sensores" className="h-full w-full flex flex-row gap-x-3 justify-center items-center">
                <div id="actuadores-info" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                    <ActuadoresInfo areas={undefined}/>
                </div>
                <div id="clima-imfo" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                    <SensorsInfo />
                </div>
            </section>
            <section className="w-full h-full shadow-md flex items-center justify-center bg-gray-50 rounded-md">
                <div>
                    <h1>En obras</h1>
                </div>
            </section>
        </main>
    )
}