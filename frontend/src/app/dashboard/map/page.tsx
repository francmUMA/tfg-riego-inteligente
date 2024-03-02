'use client'
import MapComponent from "../../ui/dashboard/map/MapComponent"

export default function Page() {
    return (
        <main className="w-full h-full">
            <div className="w-full h-full shadow-md rounded-md overflow-hidden">
                <MapComponent />
            </div>
        </main>
    )
}