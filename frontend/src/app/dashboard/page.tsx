'use client'
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { checkToken } from "../lib/token"
import ClimaInfo from "../ui/dashboard/ClimaInfo"
import DevicesInfo from "../ui/dashboard/DevicesInfo"
import SensorsInfo from "../ui/dashboard/SensorsInfo"
import { notify } from "../lib/notify"
import { CropHumBarChart, CropSoilHumBarChart, CropSoilTempBarChart, CropTempBarChart } from "../ui/dashboard/crop/InfoBarChart"
import ActuadoresInfo from "../ui/dashboard/ActuadoresInfo"


export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) {
            notify("Sesión expirada", "error")
            router.push("/login")
        }
        const verify = async (token: string) => {
            let check = await checkToken(token)
            if (!check) {
                notify("Sesión expirada", "error")
                router.push("/login")
            } 
        }
        verify(token as string)
    }, [router])

    return (
        <main className="h-full">
            <div className="flex flex-col gap-3 h-full w-full">
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
                        <ActuadoresInfo areas={undefined} filter={undefined} showStatus={true}/>
                    </div>
                    <div id="clima-imfo" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                        <SensorsInfo />
                    </div>
                </section>
                
                <section className="w-full h-full min-h-64 flex flex-row gap-x-2">
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CropHumBarChart crop={"all"}/>
                    </div>
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CropTempBarChart crop={"all"}/>
                    </div>   
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CropSoilHumBarChart crop={"all"}/>
                    </div> 
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CropSoilTempBarChart crop={"all"}/>
                    </div>      
                </section>
            </div>
        </main>
    )
}