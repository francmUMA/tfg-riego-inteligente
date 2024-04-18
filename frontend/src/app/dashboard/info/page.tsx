'use client'
import { ToastContainer } from "react-toastify";
import { MdMoreTime } from "react-icons/md"
import { ElemSelector } from "../../ui/dashboard/info/ElemSelector";
import { useEffect, useState } from "react";
import { DeviceInfo } from "../../ui/dashboard/info/DeviceInfo";

export default function Page (){

    const [elem, setElem] = useState(undefined)
    const [type, setType] = useState(undefined)

    useEffect(() => {
        console.log("Tipo: ", type)
    }, [type])
    
    return (
        <main className="w-full h-full">
            <ToastContainer />
            <section className="w-full h-full flex flex-col lg:flex-row gap-3">
                <div id="elems-info" className="w-full h-full flex flex-col gap-y-3 justify-center items-center">
                    <div id="selector" className="w-full flex justify-start items-center">
                        <ElemSelector setElem={setElem} setType={setType}/>
                    </div>
                    <div id="info" className="border w-full h-full shadow-md rounded-md">
                        {
                            type == 0 ? <DeviceInfo  device={elem}/>
                            : type == 1 ? <p>Sensor</p> 
                            : type == 2 ? <p>Actuador</p>
                            : <p>No hay info</p>
                        }
                    </div>
                    <div id="chart" className="border w-full h-full shadow-md rounded-md"></div>
                </div>
                <div id="programs-logs" className="w-full lg:w-3/4 h-full flex flex-col gap-y-3 justify-center items-center">
                    <div id="buttons" className="w-full h-1/6 min-h-10 flex justify-end items-center">
                        <button className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border bg-indigo-600 hover:bg-indigo-400 duration-150`}>
                            <MdMoreTime size={24} className="text-white"/>
                        </button>
                    </div>
                    <div id="programs" className="border w-full h-full shadow-md rounded-md"></div>
                    <div id="logs" className="border w-full h-full shadow-md rounded-md"></div>
                </div>
            </section>
        </main>
    );
}