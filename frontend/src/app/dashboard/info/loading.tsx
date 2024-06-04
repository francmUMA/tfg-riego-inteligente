import { MdMoreTime } from "react-icons/md";
import { AssociateButton } from "../../ui/dashboard/info/AssociateButton";
import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback";
import { FaLink } from "react-icons/fa6";

export default function Loading() {
    return (
        <main className="w-full h-full overflow-auto">
            <section className="w-full h-full flex flex-col lg:flex-row gap-3">
                <div id="elems-info" className="w-full h-full flex flex-col gap-y-3 justify-start items-center overflow-y-auto">
                    <div id="info" className="w-full">
                        <CircularIndeterminate />
                    </div>
                    <div id="map" className="border w-full h-full flex justify-center items-center min-h-52 shadow-md rounded-md overflow-hidden">
                        <CircularIndeterminate />   
                    </div>
                    <div id="chart-temp" className="border w-full h-full min-h-52 flex flex-col items-center shadow-md rounded-md overflow-hidden">
                        <CircularIndeterminate />
                    </div>
                </div>
                <div id="programs-logs" className="w-full lg:w-4/5 h-full flex flex-col gap-y-3 justify-start items-center">
                    <div id="buttons" className="w-full h-1/6 min-h-10 flex flex-row gap-x-2 justify-end items-center">
                        <button disabled={true}       
                            className={`shadow-md rounded-md h-10 flex disabled:text-slate-400 justify-center items-center gap-x-1 border hover:bg-gray-50 duration-150 px-1`}>
                            <FaLink size={22} className="text-indigo-600"/>
                            <span>Asociar Programa</span>
                        </button>
                        <button
                                className={`shadow-md rounded-md h-10 w-10 flex justify-center items-center border bg-indigo-600 hover:bg-indigo-400 duration-150`}>
                            <MdMoreTime size={22} className="text-white"/>
                        </button>
                    </div>
                    <div id="programs" className="border w-full h-full shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div>
                    <div id="logs" className="border w-full h-full max-h-[420px] shadow-md rounded-md">
                        <CircularIndeterminate />
                    </div>
                </div>
            </section>
        </main>
    )
}