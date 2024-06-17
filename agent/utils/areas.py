import mysql.connector

def is_area_indoor(cnx: mysql.connector.connection.MySQLConnection, area: str) -> bool:
    try:
        query = ("SELECT indoor FROM Areas WHERE id = %s")
        cursor = cnx.cursor()
        cursor.execute(query, (area,))
        indoor = cursor.fetchone()[0]
        cursor.close()
        print(f'Area {area} es indoor: {indoor is True}')
        return indoor
    except Exception as e:
        print('Error al obtener el dato del área -> ' + str(e))
        return False