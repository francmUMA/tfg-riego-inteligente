import { useEffect, useState } from "react"
import { getLocation, getWeather } from "../../lib/miscUtils"
import { TiWeatherSunny, TiWeatherNight, TiWeatherPartlySunny, TiWeatherShower } from "react-icons/ti"
import { CiTempHigh } from "react-icons/ci"
import { WiHumidity } from "react-icons/wi"
import { PiCloudRainDuotone } from "react-icons/pi"
import { Suspense } from "react"
import CircularIndeterminate from "./info/CircularFallback"

const WeatherIcon = ({weatherText, size}) => {
    return(
        <div className="w-full flex justify-center items-center">
            {
                weatherText == "Sunny" 
                    ? <TiWeatherSunny size={size} color="sky"/> 
                    : weatherText == "Clear" 
                        ? <TiWeatherNight size={size} color="sky"/>
                        : weatherText == "Partly Cloudy" 
                            ? <TiWeatherPartlySunny size={size} color="sky"/>
                            : weatherText == "Patchy rain nearby"
                                ? <TiWeatherShower size={size} color="sky"/>
                                : <TiWeatherPartlySunny size={size} color="sky"/>

            }
        </div>
    )
}


const ForecastInfo = ({weather}) => {
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        getLocation()
        if (weather !== undefined && weather.current !== undefined) {
            let currentHour = weather.current.last_updated.split(" ")[1].split(":")[0]
            setStartIndex(parseInt(currentHour) + 1)
        }
    }, [weather])

    return (
        <main className="h-full w-full flex flex-row items-center justify-center gap-x-3">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="font-semibold">
                    {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt(startIndex / 24)].hour[startIndex % 24].time.split(" ")[1]}
                </p>
                <div>
                    <WeatherIcon size={30} weatherText={weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt(startIndex / 24)].hour[startIndex % 24].condition.text} />
                </div>
                <p className="flex justify-center items-center">
                    <CiTempHigh size={23}/> {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt(startIndex / 24)].hour[startIndex % 24].temp_c}
                </p>
                <p className="w-full. flex gap-x-1 items-center justify-center">
                    <PiCloudRainDuotone size={17} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt(startIndex / 24)].hour[startIndex % 24].chance_of_rain} %
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="font-semibold">
                    {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 1)/ 24)].hour[(startIndex + 1) % 24].time.split(" ")[1]}
                </p>
                <div>
                    <WeatherIcon size={30} weatherText={weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 1)/ 24)].hour[(startIndex + 1) % 24].condition.text} />
                </div>
                <p className="flex justify-center items-center">
                    <CiTempHigh size={23}/> {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 1)/ 24)].hour[(startIndex + 1) % 24].temp_c}
                </p>
                <p className="w-full flex gap-x-1 items-center justify-center">
                    <PiCloudRainDuotone size={17} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 1)/ 24)].hour[(startIndex + 1) % 24].chance_of_rain} %
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="font-semibold">
                    {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 2)/ 24)].hour[(startIndex + 2) % 24].time.split(" ")[1]}
                </p>
                <div>
                    <WeatherIcon size={30} weatherText={weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 2)/ 24)].hour[(startIndex + 2) % 24].condition.text} />
                </div>
                <p className="flex justify-center items-center">
                    <CiTempHigh size={23}/> {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 2)/ 24)].hour[(startIndex + 2) % 24].temp_c}
                </p>
                <p className="w-full flex gap-x-1 items-center justify-center">
                    <PiCloudRainDuotone size={17} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 2)/ 24)].hour[(startIndex + 2) % 24].chance_of_rain} %
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="font-semibold">
                    {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 3)/ 24)].hour[(startIndex + 3) % 24].time.split(" ")[1]}
                </p>
                <div>
                    <WeatherIcon size={30} weatherText={weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 3)/ 24)].hour[(startIndex + 3) % 24].condition.text} />
                </div>
                <p className="flex justify-center items-center">
                    <CiTempHigh size={23}/> {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 3)/ 24)].hour[(startIndex + 3) % 24].temp_c}
                </p>
                <p className="w-full flex gap-x-1 items-center justify-center">
                    <PiCloudRainDuotone size={17} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 3)/ 24)].hour[(startIndex + 3) % 24].chance_of_rain} %
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="font-semibold">
                    {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 4)/ 24)].hour[(startIndex + 4) % 24].time.split(" ")[1]}
                </p>
                <div>
                    <WeatherIcon size={30} weatherText={weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 4)/ 24)].hour[(startIndex + 4) % 24].condition.text} />
                </div>
                <p className="flex justify-center items-center">
                    <CiTempHigh size={23}/> {weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 4)/ 24)].hour[(startIndex + 4) % 24].temp_c}
                </p>
                <p className="w-full flex gap-x-1 items-center justify-center">
                    <PiCloudRainDuotone size={17} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[parseInt((startIndex + 4)/ 24)].hour[(startIndex + 4) % 24].chance_of_rain} %
                </p>
            </div>
        </main>
    )
}

export default function ClimaInfo() {
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchWeather = async () => {
        let data = await getWeather()
        if (data !== undefined) {
            setWeather(data)
        }
    }

    useEffect(() => {
        fetchWeather()
        setLoading(false)
    }, [])

    return (
        <div className="w-full h-full flex flex-col text-white gap-y-3">
            <Suspense fallback={<CircularIndeterminate/>}>
                {loading ? 
                    <div className="w-full bg-indigo-500 rounded-md shadow-md h-full flex flex-row items-center justify-center p-3">
                        <CircularIndeterminate />
                    </div>
                     :
                <section id="actual" className="w-full bg-indigo-500 rounded-md shadow-md h-full flex flex-row items-center justify-center p-3">
                    
                    <div className="flex flex-col w-full justify-center items-center">
                        <p className="w-full h-11 flex items-center justify-center text-[45px] font-bold"> 
                            {weather !== undefined && weather.current !== undefined && weather.current.temp_c} ºC
                        </p>
                        <p className="text-slate-100">{weather !== undefined && weather.location !== undefined && weather.location.name + ", " + weather.location.country}</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <WeatherIcon size={100} weatherText={weather !== undefined && weather.current !== undefined && weather.current.condition.text} />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <p className="w-full text-xl flex items-center"> 
                            <CiTempHigh size={23}/>{weather !== undefined && weather.current !== undefined && weather.current.feelslike_c} ºC
                        </p>
                        <p className="w-full text-xl flex items-center"> 
                            <WiHumidity size={23} />{weather !== undefined && weather.current !== undefined && weather.current.humidity} %
                        </p>
                        <p className="w-full text-xl flex items-center">
                            <PiCloudRainDuotone size={23} />{weather !== undefined && weather.forecast !== undefined && weather.forecast.forecastday[0].day.daily_chance_of_rain} %
                        </p>
                    </div>
                </section>
                }
            </Suspense>
            <Suspense fallback={<CircularIndeterminate/>}>
                {
                    loading ? 
                    <div  className="w-full h-full bg-indigo-600 rounded-md shadow-md">
                        <CircularIndeterminate /> 
                    </div>
                    :
                    <section className="w-full h-full bg-indigo-600 rounded-md shadow-md">
                    <ForecastInfo weather={weather}/>
                    </section> 
                }   
            </Suspense>
        </div>
    )
}