from connection import *
from fastapi import HTTPException


#rep una tupla i retorna un diccionari de usuari
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
        "tipus_usuaris": user[8],
        "compte_banc": user[9],
    }


# rep una tupla d'usuaris i retorna una lista de diccionaris
def users_schema(users) -> dict:
    return [user_schema(user) for user in users]



# metode READ / GET per retornar tots els usuaris
def read_usuaris():
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM usuaris")
        usuaris = cursor.fetchall()

        if usuaris is None:
            raise HTTPException(status_code=404, detail="No hi ha usuaris a la taula Usuaris")

        return usuaris

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els usuaris: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



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


# metode READ / GET per obtenir les dades d'un usuari a partir del seu correu
def read_usuari_email(email: str):
    try:
        conn = connexio_db()
        if not conn:
            raise HTTPException(status_code=500, detail="No connection to database")
        
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuaris WHERE email = %s", (email,))
        usuari = cursor.fetchone()
        
        if usuari is None:
            raise HTTPException(status_code=404, detail="Usuari amb aquest correu no existeix")
        
        return usuari
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir l'usuari: {e}")
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
        cur.execute("INSERT INTO usuaris (dni, nom, cognom, email, contrasenya, telefon, comarca, tipus_usuaris, compte_banc) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (usuari.dni, usuari.nom, usuari.cognom, usuari.email, usuari.contrasenya, usuari.telefon, usuari.comarca, usuari.tipus_usuaris, usuari.compte_banc))
        #desem els canvis a la taula/bbdd
        print("Usuari inserit correctament")
        conn.commit()
        return {"message" : "inserit nou usuari amb exit"}
    except Exception as e:
        print(f"Error a la bbdd: {str(e)}")
        raise HTTPException(status_code=500, detail=f'Error a la bbdd: {str(e)}')
    finally:
        cur.close()
        conn.close()




# insert de nou producte a la base de dades
def insert_nou_producte(producte):
    try:
        #connectem a la bbdd
        conn = connexio_db()
        cur = conn.cursor()
        #preparem l'insert per la taula
        cur.execute("INSERT INTO productes (id_venedor, nom, descripcio, preu, stock, url_imatge) VALUES (%s, %s, %s, %s, %s, %s)", (producte.id_venedor, producte.nom, producte.descripcio, producte.preu, producte.stock, producte.url_imatge))
        #desem els canvis a la taula/bbdd
        conn.commit()
        return {"message" : "inserit nou producte amb exit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error a la bbdd: {str(e)}')
    finally:
        cur.close()
        conn.close()


#rep una tupla i retorna un diccionari de producte
def producte_schema(product) -> dict:
    return {
        "id": product[0],
        "id_venedor": product[1],
        "nom": product[2],
        "descripcio": product[3],
        "preu": product[4],
        "stock": product[5],
        "url_imatge": product[6],
        "creat_a": product[7]
    }


# metode READ / GET per obtenir les dades d'un producte
def read_producte(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        # fem la query i l'executem
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM productes WHERE id = %s", (id,))
        producte = cursor.fetchone()
        
        #si no existeix el producte amb id X executa excepció
        if producte is None:
            raise HTTPException(status_code=404, detail='ID product not found')
        # retornem el producte
        return producte

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir el producte: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



#funcio per actualitzar un usuari a la base de dades
def update_user(id, usuari):
    try:
        conn = connexio_db()
        if not conn:
            raise HTTPException(status_code=500, detail="No connection to database")

        cursor = conn.cursor()

        # Consulta d'actualització
        query = """
            UPDATE usuaris 
            SET dni=%s, nom=%s, cognom=%s, email=%s, contrasenya=%s, 
                telefon=%s, comarca=%s, compte_banc=%s 
            WHERE id = %s
        """

        # Valors que venen del frontend (del JSON)
        valors = (
            usuari.dni, usuari.nom, usuari.cognom, usuari.email,
            usuari.contrasenya, usuari.telefon, usuari.comarca,
            usuari.compte_banc, id
        )

        cursor.execute(query, valors)
        conn.commit()

        #comprovem si s'ha actualitzat cap registre
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Usuari no trobat per actualitzar")

        return {"missatge": "Usuari actualitzat correctament"}

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en actualitzar usuari: {e}")

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


# rep una tupla de productes i retorna una llista de diccionaris
def products_schema(products) -> dict:
    return [producte_schema(product) for product in products]



# metode READ / GET per retornar tots els productes
def read_products():
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM productes")
        products = cursor.fetchall()

        if products is None:
            raise HTTPException(status_code=404, detail="No hi ha productes a la taula Productes")

        return products

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els productes: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()




# metode READ / GET per retornar tots els productes del mateix venedor
def read_products_venedor(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM productes WHERE id_venedor = %s", (id,))
        products = cursor.fetchall()

        if products is None:
            raise HTTPException(status_code=404, detail="Usuari amb ID ${id} no te productes a la taula Productes")

        return products

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els productes: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



# metode DELETE per esborrar un producte d'un venedor
def delete_producte(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        # fem la query i l'executem
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM productes WHERE id = %s", (id,))
        producte = cursor.fetchone()
        
        #si no existeix el producte amb id X executa excepcio
        if producte is None:
            raise HTTPException(status_code=404, detail='ID product not found')
        
        #ja que existeix la ID, esborrem el producte
        cursor.execute("DELETE FROM productes WHERE id = %s", (id,))
        #desem els canvis a la bbdd
        conn.commit()

        # retornem missatge d'exit en esborrar el producte
        return {"message": "producte esborrat amb exit"}

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir el producte: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()




#funcio per retornar tots el productes segons la comarca del venedor
def read_products_comarca(comarca):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()
        cursor.execute("SELECT p.* FROM productes p JOIN usuaris u ON p.id_venedor = u.id WHERE u.comarca = %s", (comarca,))
        products = cursor.fetchall()
        
        if products is None:
            raise HTTPException(status_code=404, detail="No hi ha productes en aquesta comarca ${comarca} ")

        return products

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els productes: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



#funcio per actualitzar un producte a la base de dades
def update_producte(id, producte):
    try:
        conn = connexio_db()
        if not conn:
            raise HTTPException(status_code=500, detail="No connection to database")

        cursor = conn.cursor()

        #consulta d'actualitzacio
        query = """
            UPDATE productes 
            SET nom=%s, descripcio=%s, preu=%s, stock=%s, url_imatge=%s 
            WHERE id = %s
        """

        # Valors que venen del frontend (del JSON)
        valors = (
            producte.nom, producte.descripcio, producte.preu,
            producte.stock, producte.url_imatge, id
        )

        cursor.execute(query, valors)
        conn.commit()

        #comprovem si s'ha actualitzat cap registre
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="producte no trobat per actualitzar")

        return {"missatge": "Producte actualitzat correctament"}

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en actualitzar producte: {e}")

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()


# insert de nova comanda a la base de dades
def insert_nova_comanda(comanda):
    try:
        #connectem a la bbdd
        conn = connexio_db()
        cur = conn.cursor()
        #preparem l'insert per la taula
        cur.execute("INSERT INTO comanda (id_comprador, id_venedor, recollit, preu_total, franja_entrega, targeta) VALUES (%s, %s, %s, %s, %s, %s)", (comanda.id_comprador, comanda.id_venedor, comanda.recollit, comanda.preu_total, comanda.franja_entrega, comanda.targeta))
        #desem els canvis a la taula/bbdd
        conn.commit()
        return {"message" : "inserit nova comanda amb exit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error a la bbdd: {str(e)}')
    finally:
        cur.close()
        conn.close()



#rep una tupla i retorna un diccionari de comanda
def comanda_schema(comanda) -> dict:
    return {
        "id": comanda[0],
        "id_comprador": comanda[1],
        "id_venedor": comanda[2],
        "recollit": comanda[3],
        "preu_total": comanda[4],
        "franja_entrega": comanda[5],
        "targeta": comanda[6],
        "creat_a": comanda[7]
    }



# rep una tupla de productes i retorna una llista de diccionaris
def comandes_schema(comandes) -> dict:
    return [comanda_schema(comanda) for comanda in comandes]


# metode READ / GET per retornar totes les comandes del mateix comprador
def read_comandes_comprador(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM comanda WHERE id_comprador = %s", (id,))
        products = cursor.fetchall()

        if products is None:
            raise HTTPException(status_code=404, detail="Usuari amb ID ${id} no te comandes a la taula Comanda")

        return products

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir les comandes: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()




# metode READ / GET per retornar totes les comandes del mateix venedor
def read_comandes_venedor(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM comanda WHERE id_venedor = %s", (id,))
        products = cursor.fetchall()

        if products is None:
            raise HTTPException(status_code=404, detail="Usuari amb ID ${id} no te comandes a la taula Comanda")

        return products

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir les comandes: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



# metode DELETE per esborrar un producte d'un venedor
def delete_comanda(id):
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        # fem la query i l'executem
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM comanda WHERE id = %s", (id,))
        comanda = cursor.fetchone()
        
        #si no existeix el producte amb id X executa excepcio
        if comanda is None:
            raise HTTPException(status_code=404, detail='ID product not found')
        
        #ja que existeix la ID, esborrem el producte
        cursor.execute("DELETE FROM comanda WHERE id = %s", (id,))
        #desem els canvis a la bbdd
        conn.commit()

        # retornem missatge d'exit en esborrar el producte
        return {"message": "comanda esborrada amb exit"}

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir la comanda: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()