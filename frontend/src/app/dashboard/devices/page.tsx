import Link from "next/link"

export default function Page() {
    const devices = [1,2,3,4]
    return (
        <main className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                devices.map((device) => {
                    return (
                        <Link
                            key={device}
                            href={"/dashboard/devices/"}
                            className="bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                        >
                            <div className="w-full h-full flex justify-center items-center gap-3 p-4 pb-20">
                                <div className="bg-red-50 w-full h-full flex justify-center items-center">
                                    Imagen
                                </div>
                                <div className="bg-red-50 w-full h-full">
                                    Informacion del dispositivo, tempratura cpu, sensores conectados, activo o inactivo, válvulas regando o cuadal acumulado en el momento
                                </div> 
                            </div>
                        </Link>
                    )
                })
            }
        </main>   
    )
}