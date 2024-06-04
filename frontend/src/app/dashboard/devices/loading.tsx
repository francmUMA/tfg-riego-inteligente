import { IoIosAddCircleOutline } from "react-icons/io";
import CircularIndeterminate from "../../ui/dashboard/info/CircularFallback";
import { ArrowPathIcon } from "@heroicons/react/24/outline";


export default function Loading() {
    return (
        <main className="h-full">
            <div className="">
                <div className="flex gap-3 justify-end flex-grow">
                    <button 
                        className="w-12 h-12 flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            <IoIosAddCircleOutline size={24} className="w-6"/>
                    </button>
                    <button
                        className={`shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150`}
                        >
                        <ArrowPathIcon
                            className={`w-6`} 
                           />
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <CircularIndeterminate />
            </div>
            
        </main>
    )
}