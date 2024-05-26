"""
Script encargado de comprobar los actuadores que hay en modo automático para saber
si hay que abrirlos o cerrarlos
"""
import datetime
from time import sleep
from sys import exit
from utils.actuadores import *
from utils.weather import *

# Definición de los valores de comparación
TEMP_HIGH_THRESHOLD = 30
TEMP_LOW_THRESHOLD = 10

HUMIDITY_HIGH_THRESHOLD = 80
HUMIDITY_LOW_THRESHOLD = 30

SOIL_TEMP_HIGH_THRESHOLD = 25
SOIL_TEMP_LOW_THRESHOLD = 10

SOIL_HUMIDITY_HIGH_THRESHOLD = 80
SOIL_HUMIDITY_LOW_THRESHOLD = 25

HOUR_CRITICAL_HIGH_THRESHOLD = 18
HOUR_CRITICAL_LOW_THRESHOLD = 13
HOUR_NORMAL_LOW_THRESHOLD = 9

current_hour = datetime.datetime.now().hour

while True:
    actuadores = get_actuadores()
    if actuadores is None:
        print('Error al obtener los actuadores')
        exit(1)

    # Filtrar actuadores que no tienen posición o área asignada
    actuadores = filter(lambda x:
                        x['Latitud'] is not None and
                        x['Longitud'] is not None and
                        x['area'] is not None, actuadores)
    print('Comprobando actuadores...')
    for actuador in actuadores:
        # Obtener predicción de lluvia
        weather_prediction = get_weather_prediction(actuador['Latitud'],
                                                    actuador['Longitud'],
                                                    current_hour+1)

        # Obtener temperatura promedio del área de cultivo
        temperature = get_temperature(actuador['area'])

        # Obtener humedad promedio del área de cultivo
        humidity = get_humidity(actuador['area'])

        # Obtener temperatura de suelo promedio del área de cultivo
        # soil_temperature = get_soil_temperature(actuador['area'])

        # Obtener humedad de suelo promedio del área de cultivo
        soil_humidity = get_soil_humidity(actuador['area'])

        # Si la predicción del clima indica lluvia, continuar al siguiente actuador
        if near_rain(weather_prediction):
            continue

        # Comprobar si la humedad de suelo está por debajo del umbral
        if actuador['status'] == 0:
            if soil_humidity < SOIL_HUMIDITY_LOW_THRESHOLD:

                # Si la temperatura es normal, abrir el actuador
                if temperature > TEMP_LOW_THRESHOLD and temperature < TEMP_HIGH_THRESHOLD:
                    open(actuador['id'])
                else:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        # Si la temperatura es alta, abrir el actuador solo si no es una hora crítica
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            continue
                        else:
                            open(actuador['id'])
                    else:
                        open(actuador['id'])
            else:
                if humidity > HUMIDITY_HIGH_THRESHOLD:
                    continue
                else:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        # Si la temperatura es alta, abrir el actuador solo si no es una hora crítica
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            continue
                        else:
                            open(actuador['id'])
                    else:
                        if temperature > TEMP_LOW_THRESHOLD and temperature < TEMP_HIGH_THRESHOLD:
                            if current_hour > HOUR_NORMAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                                open(actuador['id'])
                            else:
                                continue
                        else:
                            open(actuador['id'])
        else:
            continue
    sleep(60)
    