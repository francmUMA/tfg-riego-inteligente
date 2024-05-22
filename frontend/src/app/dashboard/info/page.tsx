'use client'
import { ToastContainer } from "react-toastify";
import { MdMoreTime } from "react-icons/md"
import { ElemSelector } from "../../ui/dashboard/info/ElemSelector";
import { Suspense, useState } from "react";
import { DeviceInfo } from "../../ui/dashboard/info/DeviceInfo";
import { ActuadorInfo } from "../../ui/dashboard/info/ActuadorInfo";
import { SensorInfo } from "../../ui/dashboard/info/SensorInfo";
import { SensorChart } from "../../ui/dashboard/SensorChart";
// import { RotateIconUpdateButton } from "../../ui/dashboard/RotateIconUpdateButton";
import { ElemMap } from "../../ui/dashboard/info/ElemMap";
import { LogInfo } from "../../ui/dashboard/info/LogInfo";
import { ChartComponent } from "../../ui/dashboard/devicesCharts";
import { AddProgramDialog } from "../../ui/dashboard/info/AddProgramDialog";
import 'react-toastify/dist/ReactToastify.css';
import { ProgramsInfo } from "../../ui/dashboard/info/ProgramsInfo";
import { AssociateButton } from "../../ui/dashboard/info/AssociateButton";



export default function Page (){

    const [elem, setElem] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [associate, setAssociate] = useState(false)

    const [IsOpenAddProgramDialog, setOpenAddProgramDialog] = useState(false)
    const closeAddProgramDialog = () => setOpenAddProgramDialog(false)
    const openAddProgramDialog = () => setOpenAddProgramDialog(true)
    
    return (
        <main className="w-full h-full overflow-auto">
            <ToastContainer />
            <AddProgramDialog open={IsOpenAddProgramDialog} onClose={closeAddProgramDialog}/>
            <section className="w-full h-full flex flex-col lg:flex-row gap-3">
                <div id="elems-info" className="w-full h-full flex flex-col gap-y-3 justify-start items-center overflow-y-auto">
                    <div id="selector" className="w-full flex justify-start items-center">
                        <Suspense>
                            <ElemSelector setElem={setElem} setType={setType}/>
                        </Suspense>
                    </div>
                    <div id="info" className="w-full">
                        <Suspense>
                            {
                                type == 0 ? <DeviceInfo  device={elem}/>
                                : type == 1 ? <SensorInfo sensor={elem}/>
                                : type == 2 ? <ActuadorInfo actuador={elem} />
                                : <></>
                            }
                        </Suspense>
                    </div>
                    <div id="map" className="border w-full h-full flex justify-center items-center min-h-52 shadow-md rounded-md overflow-hidden">
                       <Suspense>
                            {
                                elem !== undefined 
                                    ? elem.Latitud != null && elem.Longitud != null
                                        ? <ElemMap elem={elem}/>
                                        : <p className="w-full text-center">No se ha asignado una ubicación</p>
                                    : <p className="w-full text-center">No se ha seleccionado ningún elemento</p>
                            }
                        </Suspense>
                    </div>
                    <div id="chart-temp" className="border w-full h-full min-h-52 flex flex-col items-center shadow-md rounded-md overflow-hidden">
                        <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">{
                            type == 0 || type == 1 
                                ? "Temperatura"
                                : type == 2 
                                    ? "Caudal (L/min)"
                                    : ""
                        }</h1>
                        <Suspense>
                            {   
                                type == 0 && elem !== undefined
                                ? <ChartComponent id={elem.id}  className="w-full h-full"/>
                                : type == 1 && elem !== undefined 
                                ? <SensorChart type={0} id={elem.id} className="w-full h-full"/>
                                : type == 2 && elem !== undefined
                                ? <SensorChart type={4} id={elem.id} className="w-full h-full"/>
                                : <p className="w-full h-full flex justify-center items-center text-center">No se ha seleccionado ningún elemento</p>
                            }
                        </Suspense>
                    </div>
                    <div id="chart-hum" className={`${type != 1  && "hidden "} border w-full h-full min-h-52 flex flex-col items-center shadow-md rounded-md overflow-hidden`}>
                        <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">Humedad</h1>
                        <Suspense>
                            {   
                                type == 1 && elem !== undefined &&
                                <SensorChart type={2} id={elem.id} className="w-full h-full"/>
                            }
                        </Suspense>
                    </div>
                    <div id="chart-soilTemp" className={`${type != 1 && "hidden "} border w-full h-full min-h-52 flex flex-col items-center shadow-md rounded-md overflow-hidden`}>
                        <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">Temperatura de suelo</h1>
                        <Suspense>
                            {   
                                type == 1 && elem !== undefined &&
                                <SensorChart type={1} id={elem.id} className="w-full h-full"/>
                            }
                        </Suspense>
                    </div>
                    <div id="chart-soilTemp" className={`${type != 1 && "hidden "} border w-full h-full min-h-52 flex flex-col items-center shadow-md rounded-md overflow-hidden`}>
                        <h1 className="w-full h-12 flex justify-center items-center text-lg text-slate-400">Humedad de suelo</h1>
                        <Suspense>
                            {   
                                type == 1 && elem !== undefined &&
                                <SensorChart type={3} id={elem.id} className="w-full h-full"/>
                            }
                        </Suspense>
                    </div>
                </div>
                <div id="programs-logs" className="w-full lg:w-4/5 h-full flex flex-col gap-y-3 justify-start items-center">
                    <div id="buttons" className="w-full h-1/6 min-h-10 flex flex-row gap-x-2 justify-end items-center">
                        <AssociateButton assocProgram={associate} setAssocProgram={setAssociate}  elem={elem} type={type}/>
                        <button onClick={openAddProgramDialog}
                                className={`shadow-md rounded-md h-10 w-10 flex justify-center items-center border bg-indigo-600 hover:bg-indigo-400 duration-150`}>
                            <MdMoreTime size={22} className="text-white"/>
                        </button>
                        {/* <RotateIconUpdateButton buttonClickFunction={() => console.log('click')}/> */}
                    </div>
                    <div id="programs" className="border w-full h-full shadow-md rounded-md">
                        <Suspense>
                            <ProgramsInfo setAssociate={setAssociate} associate={associate} elem={elem}/>
                        </Suspense>
                    </div>
                    <div id="logs" className="border w-full h-full max-h-[420px] shadow-md rounded-md">
                        <Suspense>
                            <LogInfo elemId={elem !== undefined ? elem.id : undefined} type={type} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    );
}