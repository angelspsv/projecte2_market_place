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


#enpoint per retornar un producte amb totes les seves dades a partir del seu ID
@app.get("/producte/{id}", response_model= dict)
async def retornar_producte(id: int):
    producte_data = read_producte(id)
    return producte_schema(producte_data)



#endpoint PUT per actualitzar un usuari existent
@app.put("/usuari_put/{id}", response_model=dict)
async def actualitzar_usuari(id: int, usuari: Usuari):
    resultat = update_user(id, usuari)
    return resultat



#endpoint per veure tots els productes
@app.get("/productes", response_model=List[dict])
async def obtenir_productes():
    productes = read_products()
    return products_schema(productes)



#endpoint per veure tots els productes del mateix venedor
@app.get("/productes_venedor/{id}", response_model=List[dict])
async def obtenir_productes_venedor(id: int):
    productes = read_products_venedor(id)
    return products_schema(productes)




#endpoint per esborrar un producte pel seu ID
@app.delete("/producte_del/{id}", response_model= dict)
async def esborrar_producte(id: int):
    producte_esborrat = delete_producte(id)
    return producte_esborrat




#endpoint per veure tots els productes dee la mateixa comarca 
@app.get("/productes/{comarca}", response_model=List[dict])
async def obtenir_productes_comarca(comarca: str):
    productes = read_products_comarca(comarca)
    return products_schema(productes)




#endpoint PUT per actualitzar un producte existent
@app.put("/producte_put/{id}", response_model=dict)
async def actualitzar_producte(id: int, producte: Producte):
    resultat = update_producte(id, producte)
    return resultat



# per validar les dades de Comanda abans del POST/insert
class Compra(BaseModel):
    id_comprador: int
    id_venedor: int
    recollit: int
    preu_total: float
    franja_entrega: str
    targeta: str



# endpoint nova comanda (POST/INSERT) a la taula COMANDA
@app.post("/nova_comanda/", response_model=dict)
async def create_nova_comanda(compra: Compra):
    result = insert_nova_comanda(compra)
    return result



#endpoint per veure totes les comandes del mateix comprador
@app.get("/comandes_comprador/{id}", response_model=List[dict])
async def obtenir_comandes_comprador(id: int):
    comandes = read_comandes_comprador(id)
    return comandes_schema(comandes)



#endpoint per veure totes les comandes fetes al mateix venedor
@app.get("/comandes_venedor/{id}", response_model=List[dict])
async def obtenir_comandes_venedor(id: int):
    comandes = read_comandes_venedor(id)
    return comandes_schema(comandes)



#endpoint per esborrar una comanda pel seu ID
@app.delete("/comanda_del/{id}", response_model= dict)
async def esborrar_comanda(id: int):
    comanda_esborrada = delete_comanda(id)
    return comanda_esborrada