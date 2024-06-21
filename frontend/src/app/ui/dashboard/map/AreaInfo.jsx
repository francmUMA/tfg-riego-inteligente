import { useEffect, useState } from "react"
import { IoWaterOutline } from "react-icons/io5"
import { getMeanHumArea, getMeanSoilHumArea, getMeanSoilTempArea, getMeanTempArea, updateIndoorArea } from "@/src/app/lib/areasUtils"
import CircularIndeterminate from "../info/CircularFallback"
import { FaTemperatureArrowDown, FaTemperatureArrowUp, FaWater } from "react-icons/fa6"
import { getCropName } from "../info/DeviceInfo"
import { PiPlant } from "react-icons/pi"
import Checkbox from "../../Checkbox"


export const AuxAreaInfo = ({ area, handleUpdateIndoor }) => {

    const [meanData, setMeanData] = useState([0,0,0,0])
    const [crop, setCrop] = useState("")

    const [loading, setLoading] = useState(false)

    const fetchAreaData = async () => {
        if (area === undefined) {
            return
        }
        let meanHum = await getMeanHumArea(area.id)
        let meanTemp = await getMeanTempArea(area.id)
        let meanSoilHum = await getMeanSoilHumArea(area.id)
        let meanSoilTemp = await getMeanSoilTempArea(area.id)
        setMeanData({
            meanHum: meanHum === undefined ? 0 : meanHum.mean,
            meanTemp: meanTemp.mean === undefined ? 0 : meanTemp.mean,
            meanSoilHum: meanSoilHum.mean === undefined ? 0 : meanSoilHum.mean,
            meanSoilTemp: meanSoilTemp.mean === undefined ? 0 : meanSoilTemp.mean
        })
        setLoading(false)
    }

    const fetchCropAreaName = async () => {
        setLoading(true)
        let crop = await getCropName(area.id)
        setCrop(crop)
    }

    useEffect(() => {
        if (area !== undefined) {
            fetchCropAreaName()
            fetchAreaData()
        }
    }, [area])

    return (
        loading ? 
        <div className="pt-3">
            <CircularIndeterminate/> 
        </div>
            :
        <div className="w-full h-full flex flex-col gap-y-2">
            <div className="w-full h-full">
                <label className="w-full h-full flex justify-start items-center gap-1">
                    <Checkbox active={area.indoor} onChange={() => handleUpdateIndoor(!area.indoor)}/>
                    <p>Cubierto</p>
                </label>
            </div>
            <div className="w-full h-full pt-1 flex flex-row gap-x-2 items-center">
                <PiPlant size={18} className="text-indigo-600"/>
                <p>{crop}</p>
            </div>
            <div className="w-full h-full pt-1 flex flex-row gap-x-2 items-center">
                <IoWaterOutline size={18} className="text-indigo-600"/>
                <p>{meanData.meanHum == null ? 0 : meanData.meanHum} %RH</p>
            </div>
            <div className="w-full h-full pt-1 flex flex-row gap-x-2 items-center">
                <FaTemperatureArrowUp size={18} className="text-indigo-600"/>
                <p>{meanData.meanTemp == null ? 0 : meanData.meanTemp} ºC</p>
            </div>
            <div className="w-full h-full pt-1 flex flex-row gap-x-2 items-center">
                <FaWater size={18} className="text-indigo-600"/>
                <p>{meanData.meanSoilHum == null ? 0 : meanData.meanSoilHum} %RH</p>
            </div>
            <div className="w-full h-full pt-1 flex flex-row gap-x-2 items-center">
                <FaTemperatureArrowDown size={18} className="text-indigo-600"/>
                <p>{meanData.meanSoilTemp == null ? 0 : meanData.meanSoilTemp} ºC</p>
            </div>
        </div>
    )
}