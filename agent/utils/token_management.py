from dotenv import load_dotenv
import os
import requests

load_dotenv()

def get_token():
    """
    Solicita un token a la API para poder realizar peticiones
    """
    API_URL = os.getenv("API_URL")
    res = None
    try:
        res = requests.post(f'{API_URL}/auth', headers={
            'Content-Type': 'application/json'
        }, json={
            'email': os.getenv('ADMIN_EMAIL'),
            'password': os.getenv('ADMIN_PASSWORD')
        })
    except requests.exceptions.RequestException as e:
        print('Error al solicitar token')
        return None
    
    if res != None and res.status_code != 200:
        print('Error al solicitar token')
        return None
    data = res.json()
    token = data['token']
    return token