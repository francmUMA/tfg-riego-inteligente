from dotenv import load_dotenv
import paho.mqtt.client as mqtt
import mysql.connector

load_dotenv()
# print('Obteniendo token...')
# token = get_token()
# while token is None:
#     print('Error al obtener el token\nReintentando...')
#     token = get_token()
# print('Token obtenido')
# API_URL = os.getenv("API_URL")


def get_actuadores(cnx: mysql.connector.connection.MySQLConnection):
    """
    Obtiene los actuadores disponibles en modo auto
    """
    query = ("SELECT id, name, Latitud, Longitud, area, status, device FROM Actuadores WHERE mode=1")
    actuadores = []
    cursor = cnx.cursor()
    cursor.execute(query)
    for (id, name, Latitud, Longitud, area, status, device) in cursor:
        actuadores.append({
            'id': id,
            'name': name,
            'Latitud': Latitud,
            'Longitud': Longitud,
            'area': area,
            'status': status,
            'device': device
        })
    return actuadores

def get_area_sensors(cnx: mysql.connector.connection.MySQLConnection, area):
    """
    Obtiene los sensores de un área
    """
    try:
        query = ("SELECT id FROM Sensores WHERE area = %s")
        sensors = []
        cursor = cnx.cursor()
        cursor.execute(query, (area, ))
        for (id) in cursor:
            sensors.append(id[0])
        return sensors
    except Exception as e:
        print('Error al obtener los sensores -> ' + str(e))
        return []

def get_temperature(cnx: mysql.connector.connection.MySQLConnection,area):
    sensors = get_area_sensors(cnx,area)
    if len(sensors) == 0:
        return None
    data = []
    for sensor in sensors:
        try:
            query = ("SELECT value FROM SensorDatas WHERE sensorCode = %s and "
                    "type = 0 ORDER BY time DESC LIMIT 1")
            cursor = cnx.cursor()
            cursor.execute(query, (sensor,))
            data.append(cursor.fetchone()[0])
        except Exception as e:
            print('Error al obtener los datos de los sensores -> ' + str(e))
            return None
    return sum(data)/len(data)       

def get_humidity(cnx: mysql.connector.connection.MySQLConnection, area):
    sensors = get_area_sensors(cnx,area)
    if len(sensors) == 0:
        return None
    data = []
    for sensor in sensors:
        try:
            query = ("SELECT value FROM SensorDatas WHERE sensorCode = %s and "
                    "type = 2 ORDER BY time DESC LIMIT 1")
            cursor = cnx.cursor()
            cursor.execute(query, (sensor,))
            data.append(cursor.fetchone()[0])
        except Exception as e:
            print('Error al obtener los datos de los sensores -> ' + str(e))
            return None
    return sum(data)/len(data)  

def get_soil_temperature(cnx: mysql.connector.connection.MySQLConnection, area):
    sensors = get_area_sensors(cnx,area)
    if len(sensors) == 0:
        return None
    data = []
    for sensor in sensors:
        try:
            query = ("SELECT value FROM SensorDatas WHERE sensorCode = %s and "
                    "type = 1 ORDER BY time DESC LIMIT 1")
            cursor = cnx.cursor()
            cursor.execute(query, (sensor,))
            data.append(cursor.fetchone()[0])
        except Exception as e:
            print('Error al obtener los datos de los sensores -> ' + str(e))
            return None
    return sum(data)/len(data)   

def get_soil_humidity(cnx: mysql.connector.connection.MySQLConnection,area):
    sensors = get_area_sensors(cnx,area)
    if len(sensors) == 0:
        return None
    data = []
    for sensor in sensors:
        try:
            query = ("SELECT value FROM SensorDatas WHERE sensorCode = %s and "
                    "type = 3 ORDER BY time DESC LIMIT 1")
            cursor = cnx.cursor()
            cursor.execute(query, (sensor,))
            data.append(cursor.fetchone()[0])
        except Exception as e:
            print('Error al obtener los datos de los sensores -> ' + str(e))
            return None
    return sum(data)/len(data) 

def open(cnx: mysql.connector.connection.MySQLConnection, mqttc: mqtt.Client, actuador_id, actuador_device_id):
    try:
        query = ("UPDATE Actuadores SET status = 1 WHERE id = %s")
        cursor = cnx.cursor()
        cursor.execute(query, (actuador_id,))
        cnx.commit()
    except Exception as e:
        print('Error al abrir el actuador -> ' + str(e))
        return
    topic = f'devices/{actuador_device_id}/actuadores/{actuador_id}/update/status'
    mqttc.publish(topic, '1')
    print(f'Abriendo actuador {actuador_id}')

def close(cnx: mysql.connector.connection.MySQLConnection ,mqttc: mqtt.Client, actuador_id, actuador_device_id):
    try:
        query = ("UPDATE Actuadores SET status = 0 WHERE id = %s")
        cursor = cnx.cursor()
        cursor.execute(query, (actuador_id,))
        cnx.commit()
    except Exception as e:
        print('Error al abrir el actuador -> ' + str(e))
        return
    topic = f'devices/{actuador_device_id}/actuadores/{actuador_id}/update/status'
    mqttc.publish(topic, '0')
    print(f'Cerrando actuador {actuador_id}')
