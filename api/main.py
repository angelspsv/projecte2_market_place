from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from functions import *

# fer correr l'api: 'fastapi dev main.py' o també 'uvicorn main:app --reload'

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
    return {"Hello": "World"}


# Endpoint per veure tots els usuaris
@app.get("/usuaris", response_model=List[dict])
async def veure_usuaris():
    return read_usuaris()


# Enpoint per retornar un usuari amb totes les seves dades a partir del seu ID
@app.get("/usuari/{id}", response_model=dict)
async def retornar_usuari(id: int):
    return read_usuari(id)


# Validar les dades abans del POST/insert
class Usuari(BaseModel):
    dni: str
    nom: str
    cognom: str
    email: str
    contrasenya: str
    telefon: int
    comarca: str
    tipus_usuaris: bool
    compte_banc: str


# Endpoint nou_usuari
@app.post("/nou_usuari/", response_model=dict)
async def nou_usuari(usuari: Usuari):
    resultat_insert = create_usuari(usuari)
    return resultat_insert


# Validar les dades de Producte abans del POST/insert
class Producte(BaseModel):
    id_venedor: int
    nom: str
    descripcio: str
    preu: float
    stock: int
    url_imatge: str


# Endpoint nou producte (POST/INSERT) a la taula productes
@app.post("/nou_producte/", response_model=dict)
async def nou_producte(producte: Producte):
    result = create_producte(producte)
    return result
