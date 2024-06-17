"""
Script encargado de comprobar los actuadores que hay en modo automático para saber
si hay que abrirlos o cerrarlos
"""
import datetime
from time import sleep
from utils.actuadores import *
from utils.weather import *
from utils.database import *
from utils.mqtt import *
from utils.areas import *

# Definición de los valores de comparación
TEMP_HIGH_THRESHOLD = 30
TEMP_LOW_THRESHOLD = 13

SOIL_HUMIDITY_HIGH_THRESHOLD = 80
SOIL_HUMIDITY_LOW_THRESHOLD = 25

HOUR_CRITICAL_HIGH_THRESHOLD = 18
HOUR_CRITICAL_LOW_THRESHOLD = 13
HOUR_NORMAL_LOW_THRESHOLD = 9

current_hour = datetime.datetime.now().hour
print('Conectando con la base de datos...')
cnx = get_connection()
while cnx is None:
    print('Error al obtener la conexión a la base de datos\nReintentando...')
    cnx = get_connection()
print('Conexión establecida con la base de datos')
print('Conectando con el broker MQTT...')
mqttc = get_mqtt_client()

while True:
    actuadores = get_actuadores(cnx)
    while actuadores is None or len(actuadores) == 0:
        print('No se han encontrado actuadores.\nReintentando...')
        sleep(5)
        actuadores = get_actuadores(cnx)

    # Filtrar actuadores que no tienen posición o área asignada
    actuadores = filter(lambda x:
                        x['Latitud'] is not None and
                        x['Longitud'] is not None and
                        x['area'] is not None, actuadores)
    print('Comprobando actuadores...')
    for actuador in actuadores:
        print(f'Actuador: {actuador["id"]} - {actuador["name"]}')
        # Obtener predicción de lluvia
        weather_prediction = get_weather_prediction(actuador['Latitud'],
                                                    actuador['Longitud'],
                                                    current_hour+1)

        # Obtener temperatura promedio del área de cultivo
        temperature = get_temperature(cnx, actuador['area'])
        if temperature is None:
            print('Valor erroneo de temperatura')
            continue
        print(f'Temperatura: {temperature}')

        # Obtener humedad promedio del área de cultivo
        # humidity = get_humidity(cnx, actuador['area'])
        # if humidity is None:
        #     print('Valor erroneo de humedad')
        #     continue
        # print(f'Humedad: {humidity}')

        # Obtener temperatura de suelo promedio del área de cultivo
        # soil_temperature = get_soil_temperature(cnx, actuador['area'])
        # if soil_temperature is None:
        #     print('Valor erroneo de temperatura de suelo')
        #     continue
        # print(f'Temperatura de suelo: {soil_temperature}')

        # Obtener humedad de suelo promedio del área de cultivo
        soil_humidity = get_soil_humidity(cnx, actuador['area'])
        if soil_humidity is None:
            print('Valor erroneo de humedad de suelo')
            continue
        print(f'Humedad de suelo: {soil_humidity}')

        # Si la predicción del clima indica lluvia, continuar al siguiente actuador
        if near_rain(weather_prediction) and is_area_indoor(cnx, actuador['area']) is False:
            print('Hay predicción de lluvia')
            close(cnx, mqttc, actuador['id'], actuador['device'])
            continue

        # Comprobar si la humedad de suelo está por debajo del umbral
        if actuador['status'] == 0:
            if soil_humidity < SOIL_HUMIDITY_LOW_THRESHOLD:

                # Si la temperatura es normal, abrir el actuador
                if temperature > TEMP_LOW_THRESHOLD and temperature < TEMP_HIGH_THRESHOLD:
                    open(cnx, mqttc, actuador['id'], actuador['device'])
                else:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        # Si la temperatura es alta, abrir el actuador solo si no es una hora crítica
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            continue
                        open(cnx, mqttc, actuador['id'], actuador['device'])
                    else:
                        open(cnx, mqttc, actuador['id'], actuador['device'])
            else:
                if soil_humidity > SOIL_HUMIDITY_HIGH_THRESHOLD:
                    continue
                else:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        # Si la temperatura es alta, abrir el actuador solo si no es una hora crítica
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            continue
                        else:
                            open(cnx, mqttc, actuador['id'], actuador['device'])
                    else:
                        if temperature > TEMP_LOW_THRESHOLD and temperature < TEMP_HIGH_THRESHOLD:
                            if current_hour > HOUR_NORMAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                                open(cnx, mqttc, actuador['id'], actuador['device'])
                            else:
                                continue
                        else:
                            open(cnx, mqttc, actuador['id'], actuador['device'])
        else:
            if soil_humidity > SOIL_HUMIDITY_HIGH_THRESHOLD:
                close(cnx, mqttc, actuador['id'], actuador['device'])
            else:
                if soil_humidity < SOIL_HUMIDITY_HIGH_THRESHOLD and soil_humidity > SOIL_HUMIDITY_LOW_THRESHOLD:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            close(cnx, mqttc, actuador['id'], actuador['device'])
                        else:
                            if current_hour > HOUR_NORMAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_LOW_THRESHOLD:
                                close(cnx, mqttc, actuador['id'], actuador['device'])
                            else:
                                continue
                    else:
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            close(cnx, mqttc, actuador['id'], actuador['device'])
                        else:
                            continue
                else:
                    if temperature > TEMP_HIGH_THRESHOLD:
                        if current_hour > HOUR_CRITICAL_LOW_THRESHOLD and current_hour < HOUR_CRITICAL_HIGH_THRESHOLD:
                            close(cnx, mqttc, actuador['id'], actuador['device'])
                        else:
                            continue
                    else:
                        continue
    sleep(60)