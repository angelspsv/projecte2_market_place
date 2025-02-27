from connection import *
from fastapi import HTTPException


#rep una tupla i retorna un diccionari de usuari
def user_schema(user) -> dict:
    return {
        "id_usuari": user[0],
        "nom": user[1],
        "cognom": user[2],
        "correu": user[3],
        "telefon": user[4],
        "comarca": user[5],
        "tipus_usuari": user[6],
        "compte_banc": user[7],
    }


# rep una tupla d'usuaris i retorna una lista de diccionaris
def users_schema(users) -> dict:
    return [user_schema(user) for user in users]


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