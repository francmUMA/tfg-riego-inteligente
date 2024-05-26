"""
Ofrece funciones para obtener la predicción del clima en una ubicación
"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

def near_rain(weather_prediction):
    """
    Verifica si hay lluvia en la predicción del clima
    """
    for chance in weather_prediction:
        if chance > 60:
            return True
    return False

def get_weather_prediction(latitud, longitud, next_hour):
    """
    Obtiene la predicción del clima en una ubicación
    """
    try:
        res = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
                        +str(latitud)+','+str(longitud)+'&key='+os.getenv('GOOGLE_API_KEY'),
                        timeout=5)
    except requests.exceptions.RequestException as e:
        print('Error al solicitar la predicción del clima. Error -> ' + str(e))
        return []
    if res.status_code != 200:
        print('Error al solicitar la predicción del clima. Code -> ' + str(res.status_code))
        return []
    data = res.json()
    res2 = None
    try:
        place = data['results'][len(data['results']) - 5]['address_components'][0]['long_name']
        res2 =  requests.get("https://api.weatherapi.com/v1/forecast.json?key="
                             + os.getenv('API_WEATHER_KEY')+"&q="+place+"&days=2&aqi=no&alerts=no",
                             timeout=5)
    except requests.exceptions.RequestException as e:
        print('Error al solicitar la predicción del clima. Error -> ' + str(e))
        return []
    if res2.status_code != 200:
        print('Error al solicitar la predicción del clima. Code -> ' + str(res2.status_code))
        return []
    data = res2.json()
    pred_chance_rain = []
    for i in range(0,5):
        chance = data['forecast']['forecastday'][int((next_hour+i)/24)]['hour'][(next_hour+i)%24]['chance_of_rain']
        pred_chance_rain.append(chance)
    return pred_chance_rain
