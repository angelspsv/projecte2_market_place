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
