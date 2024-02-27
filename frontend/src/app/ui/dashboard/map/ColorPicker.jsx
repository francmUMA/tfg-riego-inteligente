import { useState } from "react"
import { MdDone, MdOutlineCancel } from "react-icons/md"
import { getCookie } from "cookies-next"
import { updateColorArea } from "@/src/app/lib/areasUtils"

export const ColorPicker = ({area, setAreas, areas}) => {
    const [value, setValue] = useState(area.color)
    const [edit, setEdit] = useState(false)

    const handleChange = async (e) => {
      setValue(e.target.value.substring(1))
    }

    const submitColor = async () => {
      const token = getCookie('token')
      let res = await updateColorArea(value, area.id, token)
      if (res) {
        let newAreas = []
        for (let ar of areas) {
          if (ar.id == area.id) {
            ar.color = value
          }
          newAreas.push(ar)
        }
        setAreas(newAreas)
      }
      setEdit(false)
    }

    return(
      <div className='flex flex-row justify-center items-center gap-x-2 '>
        <div className="w-8 h-7 flex justify-center items-center rounded-md overflow-hidden">
            <input
            onClick={() => setEdit(true)}
            className="bg-transparent w-10 h-10 flex items-center justify-center"
            type='color'
            value={'#' + value}
            onChange={handleChange}
            />
        </div>
        <button
        className={`${
            edit ? 'block' : 'hidden'
        } rounded-md shadow-md hover:bg-gray-100 w-7 h-7 flex justify-center items-center `}
          onClick={submitColor}
        >
            <MdDone size={17} color="green" />   
        </button>
        <button
        className={`${
            edit ? 'block' : 'hidden'
        } rounded-md shadow-md hover:bg-gray-100 w-7 h-7 flex justify-center items-center `}
          onClick={() => setEdit(false)}
        >
            <MdOutlineCancel size={17} color="red" />   
        </button>
      </div>
    )
  }