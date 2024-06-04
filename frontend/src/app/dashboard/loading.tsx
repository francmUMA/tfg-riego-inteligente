import CircularIndeterminate from "../ui/dashboard/info/CircularFallback"

export default function Loading() {
    return (
        <main className="h-full">
            <div className="flex flex-col gap-3 h-full w-full">
                <section className="w-full h-full flex flex-row gap-x-3 justify-center items-center">
                    <div id="devices-info" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                        <CircularIndeterminate />
                    </div>
                    <div id="clima-imfo" className="ease-in-out duration-150 h-full w-full flex justify-center items-center">
                        <CircularIndeterminate />
                    </div>
                </section>
                <section id="actuadores-sensores" className="h-full w-full flex flex-row gap-x-3 justify-center items-center">
                    <div id="actuadores-info" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                        <CircularIndeterminate />
                    </div>
                    <div id="clima-imfo" className="border hover:border-indigo-600 ease-in-out duration-150 shadow-md rounded-md h-full w-full flex justify-center items-center">
                        <CircularIndeterminate />
                    </div>
                </section>
                
                <section className="w-full h-full min-h-64 flex flex-row gap-x-2">
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div>
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div>   
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div> 
                    <div className="w-full h-full border shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div>      
                </section>
            </div>
        </main>
    )
}