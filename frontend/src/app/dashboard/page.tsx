'use client'
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        if (getCookie('email') === undefined) {
            router.push('/login')
        }
    }, [])

    return (
        <main className="grid grid-rows-3 grid-cols-3 gap-3 h-full w-full">
            <div className="col-span-2 bg-gray-50 rounded-md flex justify-center items-center">
                <div className="bg-white w-full mx-4 h-5/6 rounded-md"></div>
            </div>
            <div className="bg-gray-50 rounded-md flex justify-center items-center">
                <div className="bg-white w-full mx-4 h-5/6 rounded-md"></div>
            </div>
            <div className="col-span-3 bg-gray-50 rounded-md flex justify-center items-center">
                <div className="bg-white w-full mx-4 h-5/6 rounded-md"></div>
            </div>
            <div className="col-span-2 bg-gray-50 rounded-md flex justify-center items-center">
                <div className="bg-white w-full mx-4 h-5/6 rounded-md"></div>
            </div>
            <div className="bg-gray-50 rounded-md flex justify-center items-center">
                <div className="bg-white w-full mx-4 h-5/6 rounded-md"></div>
            </div>
        </main>
    )
}