'use client'
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { checkToken } from "../lib/token"


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
        <main className="bg-white grid grid-rows-3 grid-cols-3 gap-3 h-full w-full p-4">
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