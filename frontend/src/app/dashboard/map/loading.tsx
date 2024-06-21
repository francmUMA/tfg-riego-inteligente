import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback";

export default function Loading() {
    return (
        <main className="w-full h-full">
            <div className="w-full h-full shadow-md rounded-md overflow-hidden">
                <CircularIndeterminate />
            </div>
        </main>
    )
}