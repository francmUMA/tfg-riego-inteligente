import paho.mqtt.client as mqtt
import os
from dotenv import load_dotenv

load_dotenv()

BROKER = os.getenv('BROKER_IP')

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def get_mqtt_client():
    mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    mqttc.on_connect = on_connect
    mqttc.connect(BROKER, 1883, 60)
    return mqttc


