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
    res = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                       latitud +"," + longitud +
                        "&key=" + os.getenv('GOOGLE_API_KEY'))