from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from typing import Union, List
from typing import Optional
from connection import connexio_db
from functions import *


app = FastAPI()


# Configuración de CORS (si la app está en otro dominio o puerto)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar a dominios específicos en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello" : "World"}


#endpoint per veure tots els usuaris
@app.get("/usuaris", response_model=List[dict])
async def obtenir_usuaris():
    try:
        conn = connexio_db()
        if not conn:  
            raise HTTPException(status_code=500, detail="No connection data base")  
        
        cursor = conn.cursor()  
        cursor.execute("SELECT * FROM usuaris")
        usuaris = cursor.fetchall()

        return users_schema(usuaris)

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en obtenir els usuaris: {e}")
    
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()



#enpoint per retornar un usuari amb totes les seves dades a partir del seu ID
@app.get("/usuari/{id}", response_model= dict)
async def retornar_usuari(id: int):
    usuari_data = read_usuari(id)
    return user_schema(usuari_data)



#per validar les dades abans del POST/insert
class Usuari(BaseModel):
    dni: str
    nom: str
    cognom: str
    email: str
    telefon: int
    comarca: str
    tipus_usuaris: bool
    compte_banc: str
    

#endpoint nou_usuari
@app.post("/nou_usuari/", response_model=dict)
async def create_usuari(usuari: Usuari):
    resultat_insert = insert_new_user(usuari)
    return resultat_insert


