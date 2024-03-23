import { GrUpdate } from "react-icons/gr"
import { useState } from "react"

export const RotateIconUpdateButton = ({ buttonClickFunction }) => {
    const [rotate, setRotate] = useState(false)

    return (
        <button onClick={() => { 
                setRotate(true)
                buttonClickFunction()
                setTimeout(() => {
                    setRotate(false)
                }, 1000)
            }} className="h-12 w-12 hover:bg-gray-100 transition ease-in-out duration-150 rounded-md shadow-md border">
            <GrUpdate
                size={19} 
                className={`w-full flex items-center justify-center ${
                    rotate ? "animate-spin" : ""
                }`}/>
        </button>
    )

}