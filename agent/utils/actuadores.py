from utils.token import get_token
from dotenv import load_dotenv
import os
import requests

load_dotenv()

token = get_token()
API_URL = os.getenv("API_URL")


def get_actuadores():
    """
    Obtiene los actuadores disponibles en modo auto
    """
    res = None
    try:
        res = requests.get(f'{API_URL}/actuadores/agent/all', headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        })
    except requests.exceptions.RequestException as e:
        print('Error al solicitar los actuadores')
        return None
    if res != None and res.status_code != 200:
        print('Error al solicitar actuadores' + str(res.status_code))
        return None
    data = res.json()
    return data

def get_weather_prediction(latitud, longitud):
    pass

def get_temperature(area):
    try:
        res = requests.get(f'{API_URL}/monitor/temperature/area/mean/{area}', 
                            headers={
                                'Content-Type': 'application/json',
                                'Authorization': f'Bearer {token}'
                            })
    except requests.exceptions.RequestException as e:
        print('Error al solicitar la temperatura')
        return 0
    if res.status_code != 200:
        print('Error al solicitar la temperatura. Code -> ' + str(res.status_code))
        return 0
    print(res.json()['mean'])
    return 0

def get_humidity(area):
    return 0

def get_soil_temperature(area):
    return 0

def get_soil_humidity(area):
    return 0

def open(actuador_id):
    print(f'Abriendo actuador {actuador_id}')
