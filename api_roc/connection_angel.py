from mysql import connector as mysql_connector
from sshtunnel import SSHTunnelForwarder


MYSQL_HOST = "192.168.200.10"
MYSQL_PORT = 3306
MYSQL_USER = "angel"
MYSQL_PASSWORD = "Pirineus1."
MYSQL_DB_NAME = "marquetplace"


SSH_HOST = "10.2.122.226"
SSH_PORT = 22
SSH_USERNAME = "isard"
SSH_PASSWORD = "pirineus"


def get_db_conection():
    try:
        tunnel = SSHTunnelForwarder(
            (SSH_HOST, SSH_PORT),
            ssh_username=SSH_USERNAME,
            ssh_password=SSH_PASSWORD,
            remote_bind_address=(MYSQL_HOST, MYSQL_PORT),  # Redirigir a la BD remota
            local_bind_address=("127.0.0.1", 3306)  # Puerto local donde nos conectaremos
        )
        tunnel.start()

        connection = mysql_connector.connect(
            host="127.0.0.1",
            port=3306,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB_NAME,
            collation="utf8mb4_general_ci"
        )

        print("✅ Conexión exitosa a MySQL")
        return connection, tunnel
    except Exception as e:
        return {"status": -1, "message": f"❌ Error de conexión: {e}"}
