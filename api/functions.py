from connection import *
from fastapi import HTTPException


#rep una tupla i retorna un diccionari de usuari
def user_schema(user) -> dict:
    return {
        "id_usuari": user[0],
        "dni": user[1],
        "nom": user[2],
        "cognom": user[3],
        "correu": user[4],
        "telefon": user[5],
        "comarca": user[6],
        "tipus_usuari": user[7],
        "compte_banc": user[8],
    }


# rep una tupla d'usuaris i retorna una lista de diccionaris
def users_schema(users) -> dict:
    return [user_schema(user) for user in users]



# metode READ / GET per obtenir les dades d'un usuari
def read_usuari(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        # fem la query i l'executem
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM usuaris WHERE id = %s", (id,))
        usuari = cursor.fetchone()
        
        #si no existeix l'usuari amb id X executa excepció
        if usuari is None:
            raise HTTPException(status_code=404, detail='ID usuari not found')
        # retornem l'usuari
        return usuari

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els usuaris: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()




# inserim un nou usuari a la taula usuaris
def insert_new_user(usuari):
    try:
        #connectem a la bbdd
        conn = connexio_db()
        cur = conn.cursor()
        #preparem l'insert per la taula
        cur.execute("INSERT INTO usuaris (dni, nom, cognom, email, telefon, comarca, tipus_usuaris, compte_banc) VALUES (%s, %s, %s, %s, %s,%s, %s, %s)", (usuari.dni, usuari.nom, usuari.cognom, usuari.email, usuari.telefon, usuari.comarca, usuari.tipus_usuaris, usuari.compte_banc))
        #desem els canvis a la taula/bbdd
        conn.commit()
        return {"message": "Nova entrada a estadistiques realitzada amb exit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error a la bbdd: {str(e)}')
    finally:
        cur.close()
        conn.close()