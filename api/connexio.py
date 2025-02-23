import mysql.connector

# confirmar IP i port

def connection_db():

    try:
        conn = mysql.connector.connect(
            host="3.220.179.122",
            user="angel",
            password="pirineus",
            database="marquetplace",
            port=3306
        )
        print("Connexió exitosa!")
        return conn
    except mysql.connector.Error as e:
        raise Exception(f'Error al conectar con la base de datos: {e}')