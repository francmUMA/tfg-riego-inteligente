from dotenv import load_dotenv
import os
import requests

load_dotenv()

def get_token():
    """
    Solicita un token a la API para poder realizar peticiones
    """
    API_URL = os.getenv("API_URL")

    res = requests.post(f'{API_URL}/auth', headers={
        'Content-Type': 'application/json'
    }, json={
        'email': 'admin@gmail.com',
        'password': 'admin_pass'
    })

    data = res.json()
    token = data['token']
    return token