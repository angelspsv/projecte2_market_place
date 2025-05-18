from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
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


# <----- BASE MODELS ----->

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
    
# Validar les dades de Producte abans del POST/insert
class Producte(BaseModel):
    id_venedor: int
    nom: str
    descripcio: str
    preu: float
    stock: int
    url_imatge: str


# <----- ENDPOINTS GET ----->

# Endpoint arrel
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


# Enpoint que retorna la contraseña d'un email o null si no existeix
@app.get("/login/{email}", response_model=dict)
async def retornar_contrasenya(email: str):
    return read_contrasenya(email)


# Enpoint que retorna un producte a partir de la seva ID
@app.get("/producte/{id}", response_model=dict)
async def retornar_producte(id: int):
    return read_producte(id)


# Enpoint que retorna una llista amb tots els productes d'un venedor determinat a partir de la seva ID
@app.get("/productes/", response_model=List[dict])
async def retornar_productes():
    return read_all_productes()


# Enpoint que retorna una llista amb tots els productes d'un venedor determinat a partir de la seva ID
@app.get("/productes/{id}", response_model=List[dict])
async def retornar_productes(id: int):
    return read_productes(id)


# <----- ENDPOINTS POST ----->

# Endpoint nou_usuari
@app.post("/nou_usuari/", response_model=dict)
async def nou_usuari(usuari: Usuari):
    resultat_insert = create_usuari(usuari)
    return resultat_insert

# Endpoint nou producte (POST/INSERT) a la taula productes
@app.post("/nou_producte/", response_model=dict)
async def nou_producte(producte: Producte):
    result = create_producte(producte)
    return result


# <----- ENDPOINTS PUT ----->

# Endpoint per editar producte (PUT/UPDATE) a la taula productes
@app.put("/editar_producte/{id}", response_model=dict)
async def editar_producte(id: int, producte: Producte):
    result = update_producte(id, producte)
    return result

# Endpoint per editar usuari (PUT/UPDATE) a la taula usuaris
@app.put("/editar_usuari/{id}", response_model=dict)
async def editar_usuari(id: int, usuari: Usuari):
    result = update_usuari(id, usuari)
    return result


# <----- ENDPOINTS DELETE ----->

# Endpoint per eliminar producte (DELETE) a la taula productes
@app.delete("/eliminar_producte/{id}", response_model=dict)
async def eliminar_producte(id: int):
    result = delete_producte(id)
    return result
