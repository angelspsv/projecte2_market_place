from fastapi import FastAPI, Form, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
#import mysql.connector
from typing import Union, List
from typing import Optional
#from connection import connexio_db
from functions import *


# fer correr l'api: 'fastapi dev main.py' o també 'uvicorn main:app --reload'

app = FastAPI()


# Configuración de CORS (si la app está en otro dominio o puerto)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
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
    usuaris = read_usuaris()
    return users_schema(usuaris)


#enpoint per retornar un usuari amb totes les seves dades a partir del seu ID
@app.get("/usuari/{id}", response_model= dict)
async def retornar_usuari(id: int):
    usuari_data = read_usuari(id)
    return user_schema(usuari_data)


#enpoint per retornar un usuari amb totes les seves dades a partir del seu correu
@app.get("/login/{email}")
async def login(email: str):
    usuari_dades = read_usuari_email(email)
    return user_schema(usuari_dades)



#per validar les dades abans del POST/insert
class Usuari(BaseModel):
    dni: str
    nom: str
    cognom: str
    email: str
    contrasenya: str
    telefon: int
    comarca: str
    tipus_usuaris: int
    compte_banc: str
    

#endpoint nou_usuari
@app.post("/nou_usuari/", response_model=dict)
async def create_usuari(usuari: Usuari):
    resultat_insert = insert_new_user(usuari)
    return resultat_insert


# per validar les dades de Producte abans del POST/insert
class Producte(BaseModel):
    id_venedor: int
    nom: str
    descripcio: str
    preu: float
    stock: int
    url_imatge: str


# endpoint nou producte (POST/INSERT) a la taula productes
@app.post("/nou_producte/", response_model=dict)
async def create_producte(producte: Producte):
    result = insert_nou_producte(producte)
    return result
