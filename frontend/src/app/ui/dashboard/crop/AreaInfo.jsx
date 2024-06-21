import { FaRegTrashAlt } from "react-icons/fa";
import { AuxAreaInfo } from "../map/AreaInfo";


export const AreaInfo = ({ area, handleDeleteAreas, handleUpdateIndoor }) => {
    return (
        <main className="w-full h-full min-w-fit">
            <header className="w-full h-full flex flex-row items-center">
                <p className="text-lg font-semibold">{area.name}</p>
                <div className="w-full h-full flex items-center justify-end">
                    <button 
                        onClick={handleDeleteAreas}
                        className={`shadow-md bg-red-600 border-red-700 rounded-md h-6 w-6 flex justify-center items-center border hover:bg-red-500 duration-150`}>
                        <FaRegTrashAlt size={14} className="w-9 text-white" />
                    </button>
                </div>
            </header>
            <section className="w-full min-w-24 h-full flex flex-col gap-y-1">
                <AuxAreaInfo area={area} handleUpdateIndoor={handleUpdateIndoor}/>
            </section>
        </main>
    );
}