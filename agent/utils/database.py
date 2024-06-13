import mysql.connector
from mysql.connector import errorcode
import os
from dotenv import load_dotenv

load_dotenv()

user=os.getenv('DB_USER')
password=os.getenv('DB_PASSWORD')
host=os.getenv('DB_HOST')
database=os.getenv('DB_NAME')

def get_connection():
    try:
        cnx = mysql.connector.connect(user=user, password=password,
                                    host=host,
                                    database=database)
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
            cnx.close()
            return None
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
            cnx.close()
            return None
        else:
            print(err)
            cnx.close()
            return None



