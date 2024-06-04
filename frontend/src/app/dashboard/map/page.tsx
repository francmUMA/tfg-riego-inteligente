'use client'
import { Suspense } from "react"
import MapComponent from "../../ui/dashboard/map/MapComponent"
import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback"

export default function Page() {
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