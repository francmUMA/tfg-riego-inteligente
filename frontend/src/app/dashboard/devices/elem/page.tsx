'use client'
import { checkToken } from "@/src/app/lib/token";
import { ArrowPathIcon, ArrowLeftIcon, XMarkIcon, MapPinIcon, PlusCircleIcon, GlobeAltIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { WifiIcon } from "@heroicons/react/24/solid"
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [device, setDevice] = useState<any>(null);
    
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async (token: string) => {
            let res = await checkToken(token)
            if (!res) {
                router.push("/login");
            }
        }

        // Verificar el token de autenticación
        const token = getCookie("token");
        if (token === undefined) {
            router.push("/login");
        }
        verifyToken(token as string);
        

        // Recuperar el identificador del dispositivo de la URL
        const url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        if (id === null) {
            router.push("/dashboard/devices")
        }
        setDeviceId(id)

        // Obtener los datos del dispositivo
        
    })

    // ------------------------------ ROTATION ------------------------------
    const [rotation, setRotation] = useState(0);
    //-----------------------------------------------------------------------

    return (
        <main className="h-full w-full">
            <div className="w-full h-full p-4 flex flex-col gap-3">
                <div className="w-full h-12 flex flex-row flex-grow gap-3">
                    <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                        <ArrowLeftIcon className={`w-6 text-indigo-600`}/>
                    </button>
                    <div className="flex gap-3 justify-end flex-grow">
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <MapPinIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <PlusCircleIcon className={`w-6 text-indigo-600`}/>
                        </button>
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-50 border-red-500 duration-150`}>
                            <XMarkIcon className={`w-6 text-red-500`}/>
                        </button>
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150`}>
                            <ArrowPathIcon
                            className={`w-6 text-indigo-600`} 
                            style={{ transition: 'transform 0.7s ease', transform: `rotate(${rotation}deg)`}}/>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                    <div className="w-full h-16 flex flex-row gap-3 items-center justify-center">
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <WifiIcon className="w-8 text-indigo-600"></WifiIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Estado</p>
                                <p>Conectado</p>
                            </div>
                        </div>
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <EnvelopeIcon className="w-8 text-indigo-600"></EnvelopeIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Dirección IP</p>
                                <p> 192.168.1.1 </p>
                            </div>
                        </div>
                        <div className="w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md">
                            <GlobeAltIcon className="w-8 text-indigo-600"></GlobeAltIcon>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-slate-400">Localizacion</p>
                                <p>(En obras)</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row gap-3 items-center justify-center">
                        <div className="w-full h-full border shadow-md rounded-md">

                        </div>
                        <div className="w-full h-full border shadow-md rounded-md">

                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row gap-3 items-center justify-center">
                        <div className="w-full h-full border shadow-md rounded-md">

                        </div>
                        <div className="w-full h-full border shadow-md rounded-md">

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}