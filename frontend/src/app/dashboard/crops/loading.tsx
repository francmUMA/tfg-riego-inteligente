'use client'
import { TbSortAscendingLetters } from "react-icons/tb";
import { RotateIconUpdateButton } from "../../ui/dashboard/RotateIconUpdateButton";
import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback";
import { IoIosAddCircleOutline } from "react-icons/io";


export default function Loading() {
    return (
        <main className="h-full">
            <div className="">
            <header id="botones" className="w-full flex flex-row gap-x-3 justify-start items-center">
                <button  className="h-12 w-12 bg-indigo-600 text-white hover:bg-indigo-500 transition ease-in-out duration-150 rounded-md shadow-md border">
                    <IoIosAddCircleOutline size={22} className="w-full flex items-center justify-center"/>
                </button>
                <RotateIconUpdateButton buttonClickFunction={undefined}/>
            </header>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <CircularIndeterminate />
            </div>
            
        </main>
    )
}