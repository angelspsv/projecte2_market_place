from fastapi import HTTPException
from mysql import connector as mysql_connector
from connection import get_db_conection

# <----- SCHEMAS ----->

# Rep una tupla i retorna un diccionari d'usuari
def user_schema(user) -> dict:
    return {
        "id_usuari": user[0],
        "dni": user[1],
        "nom": user[2],
        "cognom": user[3],
        "email": user[4],
        "contrasenya": user[5],
        "telefon": user[6],
        "comarca": user[7],
        "tipus_usuaris": bool(user[8]),
        "compte_banc": user[9],
    }

# Rep una tupla d'usuaris i retorna una lista de diccionaris
def users_schema(uresult) -> dict:
    return [user_schema(user) for user in uresult]

# Rep una tupla amb les dades del producte i retorna un diccionari
def product_schema(product) -> dict:
    return {
        "id": product[0],
        "id_venedor": product[1],
        "nom": product[2],
        "descripcio": product[3],
        "preu": product[4],
        "stock": product[5],
        "url_imatge": product[6]
    }

# Rep una tupla de productes i retorna una lista de diccionaris
def products_schema(products) -> dict:
    return [product_schema(product) for product in products]


# <----- MÈTODES READ ----->

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

# Aquest mètode obté la contrasenya i el tipus d'un usuari amb un email determinat
def read_contrasenya(email):
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        # Definim la query i l'executem
        cursor = conn.cursor()
        cursor.execute(f"SELECT id, contrasenya, tipus_usuaris FROM usuaris WHERE email = '{email}'")
        data = cursor.fetchone()
        
        # Si existeix una contrasenya asociada al mail la retorna, si no, retorna None
        if data is None:
            return {"id": None, "password": None, "userType": None}
        else:
            return {"id":data[0], "password": data[1], "userType": data[2]}

    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir la contrasenya: {e}")

    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()
            
# Aquest mètode obté els productes d'un usuari amb una ID determinada
def read_producte(id):
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        # Fem la query i l'executem
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM productes WHERE id = '{id}'")
        producte = cursor.fetchone()
        
        # Si existeix el producte associat a la id retorna un dict amb les dades, sino retorna none
        if producte is None:
            return {"producte": None}
        else:
            return product_schema(producte)

    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir producte: {e}")

    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()

# Aquest mètode obté tots els productes de la base de dades
def read_all_productes():
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        # Fem la query i l'executem
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM productes")
        products = cursor.fetchall()
        
        # Si existeixen productes  retorna la llista, sino retorna none
        if products is None:
            return {"productes": None}
        else:
            return products_schema(products)

    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir productes: {e}")

    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()

# Aquest mètode obté els productes d'un usuari amb una ID determinada
def read_productes(id):
    try:
        result = get_db_conection()

        if isinstance(result, dict) and result.get("status") == -1:
            return result

        conn, tunnel = result

        # Fem la query i l'executem
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM productes WHERE id_venedor = '{id}'")
        products = cursor.fetchall()
        
        # Si existeixen productes associats a la id retorna la llista, sino retorna none
        if products is None:
            return {"productes": None}
        else:
            return products_schema(products)

    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir productes: {e}")

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
        raise HTTPException(status_code=500, detail=f"Error en crear usuari: {str(e)}")
    
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
                "INSERT INTO productes (id_venedor, nom, descripcio, preu, stock, url_imatge) VALUES (%s, %s, %s, %s, %s, %s)",
                (
                    producte.id_venedor,
                    producte.nom,
                    producte.descripcio,
                    producte.preu,
                    producte.stock,
                    producte.url_imatge
                ),
            )
            
            # Desem els canvis a la taula/BBDD
            conn.commit()
            
            return {"message": "Nou producte inserit amb èxit."}
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error en crear producte: {str(e)}")
        
        finally:
            if "conn" in locals() and conn:
                conn.close()
            if "tunnel" in locals() and tunnel:
                tunnel.stop()


# <----- MÈTODES UPDATE ----->

# Aquest mètode actualitza un producte existent a la taula productes
def update_producte(id, producte):
    try:
        result = get_db_conection()
        
        if isinstance(result, dict) and result.get("status") == -1:
            return result
        
        conn, tunnel = result
        
        # Connectem a la BBDD
        cursor = conn.cursor()
                
        # Preparem l'actualització de la taula
        cursor.execute(
            """
            UPDATE productes
            SET nom = %s, descripcio = %s, preu = %s, stock = %s, url_imatge = %s
            WHERE id = %s
            """,
            (
                producte.nom,
                producte.descripcio,
                producte.preu,
                producte.stock,
                producte.url_imatge,
                id,
            ),
        )
        
        # Comprovem si alguna fila ha estat modificada
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Producte no trobat.")
        
        # Desem els canvis a la taula/BBDD
        conn.commit()
        
        return {"message": "Producte actualitzat amb èxit."}
    
    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en actualitzar el producte: {e}")
    
    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()

# Aquest mètode actualitza un usuari existent a la taula usuaris
def update_usuari(id, usuari):
    try:
        result = get_db_conection()
        
        if isinstance(result, dict) and result.get("status") == -1:
            return result
        
        conn, tunnel = result
        
        # Connectem a la BBDD
        cursor = conn.cursor()
                
        # Preparem l'actualització de la taula
        cursor.execute(
            """
            UPDATE usuaris
            SET dni = %s, 
                nom = %s, 
                cognom = %s, 
                email = %s, 
                contrasenya = %s, 
                telefon = %s, 
                comarca = %s, 
                tipus_usuaris = %s, 
                compte_banc = %s
            WHERE id = %s
            """,
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
                id,
            ),
        )
        
        # Comprovem si alguna fila ha estat modificada
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuari no trobat.")
        
        # Desem els canvis a la taula/BBDD
        conn.commit()
        
        return {"message": "Usuari actualitzat amb èxit."}
    
    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en actualitzar l'usuari: {e}")
    
    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()


# <----- MÈTODES DELETE ----->

def delete_producte(id):
    try:
        result = get_db_conection()
        
        if isinstance(result, dict) and result.get("status") == -1:
            return result
        
        conn, tunnel = result
        
        # Connectem a la BBDD
        cursor = conn.cursor()
        
        # Preparem l'actualització de la taula
        cursor.execute(f"DELETE FROM productes WHERE id = '{id}'")
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Producte no trobat.")

        # Desem els canvis a la taula/BBDD
        conn.commit()
        
        return {"message": "Producte eliminat amb èxit."}
    
    except mysql_connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en eliminar el producte: {e}")
    
    finally:
        if "conn" in locals() and conn:
            conn.close()
        if "tunnel" in locals() and tunnel:
            tunnel.stop()
