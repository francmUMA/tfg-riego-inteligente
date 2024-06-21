import { getCookie } from "cookies-next"
import { fetchUserInfo } from "./userInfo"

export const getWeather = async () => {
    const token = getCookie("token")
    let userInfo = await fetchUserInfo(token as string)
    if (userInfo === undefined) return undefined
    let requestLocation = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+userInfo.Latitud +"," + userInfo.Longitud+ "&key=" + process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
    if (requestLocation.status !== 200) return undefined

    let location = await requestLocation.json()

    let request = await fetch("https://api.weatherapi.com/v1/forecast.json?key="+ process.env.NEXT_PUBLIC_WEATHER_API_KEY+ "&q="+location.results[location.results.length - 5].address_components[0].long_name+"&days=2&aqi=no&alerts=no")
    if (request.status === 200){
        let data = await request.json()
        return data
    }
    return undefined
}

export const getLocation = async () => {
    let options = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
    }
    let request = await fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=" + process.env.NEXT_PUBLIC_GOOGLE_API_KEY, options)
    if (request.status !== 200) return undefined
    let data = await request.json()
    return data.location
}