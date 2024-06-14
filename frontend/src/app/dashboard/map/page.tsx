'use client'
import { Suspense, useEffect } from "react"
import MapComponent from "../../ui/dashboard/map/MapComponent"
import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback"
import { getCookie } from "cookies-next"
import { notify } from "../../lib/notify"
import { useRouter } from "next/navigation"
import { checkToken } from "../../lib/token"

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
    }, [])

    return (
        <main className="w-full h-full">
            <div className="w-full h-full shadow-md rounded-md overflow-hidden">
                <Suspense fallback={<CircularIndeterminate />}>
                    <MapComponent />
                </Suspense>
            </div>
        </main>
    )
}