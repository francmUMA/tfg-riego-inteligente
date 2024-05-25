import requests
import os
from dotenv import load_dotenv

load_dotenv()

def near_rain(weather_prediction):
    """
    Verifica si hay lluvia en la predicción del clima
    """
    False

def get_weather_prediction(latitud, longitud):
    res = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?latlng='
                       +f'{latitud},{longitud}&key={os.getenv('GOOGLE_API_KEY')}')
    if res.status_code != 200:
        print('Error al solicitar la predicción del clima. Code -> ' + str(res.status_code))
        return None
    data = res.json()
    print(data)
    pass