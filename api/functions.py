from fastapi import HTTPException
from mysql import connector as mysql_connector
from connection_roc import get_db_conection


# Rep una tupla i retorna un diccionari d'usuari
def user_schema(user) -> dict:
    return {
        "id_usuari": user[0],
        "dni": user[1],
        "nom": user[2],
        "cognom": user[3],
        "correu": user[4],
        "contrasenya": user[5],
        "telefon": user[6],
        "comarca": user[7],
        "tipus_usuari": user[8],
        "compte_banc": user[9],
    }


# Rep una tupla d'usuaris i retorna una lista de diccionaris
def users_schema(uresult) -> dict:
    return [user_schema(user) for user in uresult]


# <----- MÈTODES READ ----->

# Aquest mètode obté les dades de tots els usuaris
def read_usuaris():
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuaris")
        usuaris = cursor.fetchall()

        return users_schema(usuaris)

    except mysql_connector.Error as e:
        raise HTTPException(
            status_code=500, detail=f"Error en obtenir els usuaris: {e}"
        )

    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()


# Aquest mètode obté les dades d'un usuari amb una ID determinada
def read_usuari(id):
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        # Fem la query i l'executem
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuaris WHERE id = %s", (id,))
        usuari = cursor.fetchone()

        # Si no existeix l'usuari amb id X executa excepció
        if usuari is None:
            raise HTTPException(status_code=404, detail="No existeix un usuari amb aquesta ID.")

        # Retornem l'usuari
        return user_schema(usuari)

    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir l'usuari: {e}")

    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()


# <----- MÈTODES CREATE ----->

# Aquest mètode insereix un nou usuari a la taula usuaris
def create_usuari(usuari):
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result
        
        conn, tunnel = result
        cursor = conn.cursor()
        
        # Preparem l'insert per la taula
        cursor.execute(
            "INSERT INTO usuaris (dni, nom, cognom, email, contrasenya, telefon, comarca, tipus_usuaris, compte_banc) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (
                usuari.dni,
                usuari.nom,
                usuari.cognom,
                usuari.email,
                usuari.contrasenya,
                usuari.telefon,
                usuari.comarca,
                usuari.tipus_usuaris,
                usuari.compte_banc,
            ),
        )
        
        # Desem els canvis a la taula/BBDD
        conn.commit()
        
        return {"message": "Nou usuari inserit amb èxit."}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error a la BBDD: {str(e)}")
    
    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()


# Aquest mètode insereix un nou producte a la taula productes
def create_producte(producte):
        try:
            result = get_db_conection()
            
            if isinstance(result, dict) and result.get("status") == -1:
                return result
            
            conn, tunnel = result
            
            # Connectem a la BBDD
            cursor = conn.cursor()
            
            # Preparem l'insert per la taula
            cursor.execute(
                "INSERT INTO productes (id_venedor, nom, descripcio, preu, stock) VALUES (%s, %s, %s, %s, %s)",
                (
                    producte.id_venedor,
                    producte.nom,
                    producte.descripcio,
                    producte.preu,
                    producte.stock,
                ),
            )
            
            # Desem els canvis a la taula/BBDD
            conn.commit()
            
            return {"message": "Nou producte inserit amb èxit."}
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error a la BBDD: {str(e)}")
        
        finally:
            if "conn" in locals() and conn:
                conn.close()
            if "tunnel" in locals() and tunnel:
                tunnel.stop()
