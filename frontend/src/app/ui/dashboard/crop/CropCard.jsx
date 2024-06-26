export const CropCard = ({crop}) => {
    return (
        <div className="w-full hover:border-indigo-600 hover:shadow-lg transition ease-in-out duration-150 rounded-md border flex flex-col shadow-md h-52 overflow-hidden">
            <div className="w-full h-full bg-blue-100 overflow-hidden">
                <img src="/3dcrop.jpg" alt="cultivo" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-1/3 border-t flex items-center justify-center">
                <h1 className="text-center text-lg ">{crop.name}</h1>
            </div>
        </div>
    )
}