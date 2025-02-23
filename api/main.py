from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from typing import Union, List
from typing import Optional
from connexio import connection_db
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



@app.get("/usuaris", response_model=List[dict])
async def obtenir_usuaris():
    try:
        conn = connection_db()
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
@app.post("/nou_usuari/")
async def create_usuari(usuari: Usuari):
    #fer el codi
    print('falta codi')