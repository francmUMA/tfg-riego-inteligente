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
        res = requests.get(f'{API_URL}/actuadores/admin/all', headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        })
    except requests.exceptions.RequestException as e:
        print('Error al solicitar los actuadores')
        return None
    if res != None and res.status_code != 200:
        print('Error al solicitar actuadores')
        return None
    data = res.json()
    return data