## README de Roc per l'assignatura de Projecte. Segon projecte gener-maig 2025.

# Main del repositori: https://github.com/angelspsv/projecte2_market_place.git

# L'Àngel i jo compartim el mateix repositori. A continuació anomenaré quins fitxers i directoris són meus:

+ En el main del repositori (https://github.com/angelspsv/projecte2_market_place.git) hi ha una carpeta aneomenada app que conté el codi de l'aplicació d'Android.
+ A la carpeta api_roc (https://github.com/angelspsv/projecte2_market_place/tree/roc/api_roc) es troben els fitxers de la fastAPI corresponent per a l'app mobile (connection.py, functions.py i el main.py).
+ En la carpeta imatges_roc (https://github.com/angelspsv/projecte2_market_place/tree/roc/imatges_roc) estan les imatges de les vistes de l'aplicació.

## Tasques realitzades en aquest projecte:

- Intervenir en el disseny de la base de dades
- Dissenyar els prototips tant d'alta com de baixa fidelitat de l'aplicació mobile
- Crear l'API per l'app mobile i tots els endpoints que fa servir aquesta
- Programar tot el codi de l'aplicació amb Android Studio
- Intervenir en la redacció de la memòria final del projecte
- Intervenir en la creació de l'excel requeriments i casos de prova (https://docs.google.com/spreadsheets/d/12p8Ltpf-7BIqkJc8cvjYpvqa9SkM08cWD_kM25HuPcw/edit?usp=sharing) que en el nostre cas ve a substituir el Kanban, ja que vam veure ambdues tasques molt semblants
- Intervenir en la creació de la guia d'estils bàsics per l'aplicació (https://docs.google.com/document/d/10MaYJP7TtTwaBtJmbL7QMlWNAMecu9scfLhi2Ok85r0/edit?usp=sharing)

## Enllaços:

+ Enllaç a la memòria del projecte en format word: https://docs.google.com/document/d/1BhFzjUOgs8S2WeY2fM5rBQGwfl9so3Q92bXR-wmLbqY/edit?usp=sharing
+ Enllaç de la presentació: https://docs.google.com/presentation/d/10kQsVXWAoQsBQMQdB0HtQi5R6Cux4_z4e4irVRibcoM/edit?usp=sharing
+ Enllaç al directori amb les actes de reunió dels diferents sprints: https://drive.google.com/drive/folders/1mIC2DBC-xDeaiddQLMnwmLmfx1EgdgBW?usp=sharing
+ Enllaç al full d'excel amb els requeriments i casos de prova: https://docs.google.com/spreadsheets/d/12p8Ltpf-7BIqkJc8cvjYpvqa9SkM08cWD_kM25HuPcw/edit?usp=sharing
+ Enllaç a la guia d'estils: https://docs.google.com/document/d/10MaYJP7TtTwaBtJmbL7QMlWNAMecu9scfLhi2Ok85r0/edit?usp=sharing

# Vistes de l'aplicació

## Pàgina d’inici

Aquesta vista ens mostra el logo de l’aplicació i el nom, a part de dos botons. Els botons tenen la funcionalitat de portar-nos a la vista d’inici de sessió o a la de registre. Si l’usuari ja té un compte creat escollirà el botó d’inici de sessió, i sinó seleccionarà el de registrar-se.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcU8fRuamWUiP3M8xRjdzq-N02ReLUnB9HCct6k3zia1wsKZBXxlC3UHNV30jMJJ1nMVkMBFeDGKj6PkK9sQf-9pCSJs_zd_Ocm3beZ6Olv5UruNKw-j93G_cU5wO0gmNzjFLuw3g?key=XEllHKnq58IjeqipnshfrA)

## Inici de sessió

Aquesta vista permet a l’usuari introduir el seu correu i la contrasenya corresponent. L’aplicació crida a l’API per comprovar les dades introduïdes. Si son correctes, redirigeix la vista a la pàgina d’inici corresponent de l’usuari. Si no son correctes, mostra un Toast indicant el motiu de l’error (camps buits, format incorrecte, credencials no coincidents…).

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeASJi66BCJSeGJTkQC8YVqLuAm_q-yT15y9Ie1eJte2fi_8_kqoEwSkrpvM6qknXpuQu5aFGdYesbJgfvyXf0ivyatMxuuT-Ng3B3y06nX7tL3-4CY7ysFjCm8XuNdAXp2PmCgLg?key=XEllHKnq58IjeqipnshfrA)

## Registre

La funcionalitat de registre està dividida en dues vistes, amb la finalitat de facilitar el procés d’introducció de dades. Primerament, l’usuari selecciona quin tipus de perfil vol crear. Aquesta informació s’emmagatzema internament i es mostra una altra vista amb un formulari on l’usuari indicarà les seves dades personals.

Tota la informació introduïda als camps del formulari és validada per certes normes depenent de cada camp (el DNI ha de tenir 8 dígits i una lletra, l’email ha de tenir un format vàlid, el telèfon no pot contenir lletres…). Un cop l’usuari prem el botó de registrar-se l’app el redirigeix a l'activitat d’inici de sessió.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfejMB2zW8QJfZ4m157-GBv8zPwqcaP4iT0s6QVdRagEaGrlmuJa2oGhA-Zh6PCrN6ObrrLOEOFSRuqnVv20KjEoeJwkmSFDuqiCT225OknfrzlVUG3iEhS8q6IPYz78Qj5oJl86w?key=XEllHKnq58IjeqipnshfrA)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfWq1d4Jii1rhKu8AEDh1jGrDmegFImtIJ7P59G-AetleT-ZvUoq4b417mSyw2N2vuGKPDRVa9EpJ0saoXn-ZEJOCPauJ16wGm8bs_jcq79FWDYzwROYqEwPXm-Z2KODOcGltOosQ?key=XEllHKnq58IjeqipnshfrA)

## Pàgina d’inici comprador

Al iniciar sessió amb un usuari de tipus comprador es mostra aquesta pàgina en la que podem veure una llista dels diferents productes disponibles, juntament amb el seu nom i el seu preu. Dins de cada producte hi ha un botó per afegir-ne la quantitat desitjada i un altre per disminuir la quantitat ja introduïda. A dalt a la dreta trobem un botó que ens portarà a la vista del cistell de la compra.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfpIF3N040LomBk10VpXe4E69RmK37Pk66VAA0ISYDQNVOfmBfKkE7UvkfEk6dmXXSdZSA-GxLmBIKQEHT50-zTOWqerQkguZ0b4r6gRUQ7UMdVd_XCsC3-pT0pwrXJ7XHwqPcs6g?key=XEllHKnq58IjeqipnshfrA)

## Pàgina d’inici venedor

Al iniciar sessió amb un usuari de tipus venedor es mostra aquesta pàgina en la que podem veure una llista dels diferents productes que oferim i un resum de les seves dades. Al prémer a sobre de cadascun dels productes ens mostra directament la vista d’edició del producte seleccionat. A més a més, a la part dreta superior trobem un botó que ens dirigeix a la vista de creació de producte.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfk1Mhs9JuU-e34EcS4gMHZR3gKFsCGNssqFh1xh9hybc7lWE8a6slLGk-Dw6fNotCy2cR2HEVz_FddsxNpUXBkG_28ncgtfq9oVoOycP_ryEyCA6lI9TA5S9MQqQC0TbOVHsV1?key=XEllHKnq58IjeqipnshfrA)

## Vista de perfil

Mitjançant el menú de navegació situat a la part inferior de la pantalla, els usuaris poden accedir a l’apartat de perfil. En aquesta vista podem veure una petita salutació amb el nom de l’usuari, la seva foto de perfil, i dos botons.

El botó d’editar perfil ens porta a la vista d’edició de perfil, mentre que el de tancar sessió esborra les dades de sessió de l'usuari actual i ens porta a la activitat d’inici de sessió.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXf2QlfN0cI8rFS2gwR5S1Fl_ekIaQl_RUenJxOSNlbqgb5wdNkXZgpSRiZplt_pPiEYz1zDhi8fsP0VWtUSttxLZeQptz35NgAfwE9aenrtC5Nl2V6GgZkxGvSCWTVBUW4ZVeV2bA?key=XEllHKnq58IjeqipnshfrA)

## Edició de perfil

En aquesta activitat els usuaris poden modificar les seves dades personals. Tots els camps passen per un procés de validació que comprova que no estiguin buits i que les dades introduïdes siguin correctes (el DNI ha de tenir 8 dígits i una lletra, l’email ha de tenir un format vàlid, el telèfon no pot contenir lletres…). En prémer el botó de guardar es fan les validacions i, si no hi ha cap error, es persisteixen les dades corresponents a la base de dades.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfBfNGa9I5kKtRDq5BN4NUUftnb-lyrKCR7RBnyBRjw8nOdwbXkt9X98wnhvgqguaUnmmJpnMdJSGLguucWgSC6OZr62n9wL-QpzZUzrhys9p9Q6YZ8JqIaJ01sxyrRiMW4ldHI?key=XEllHKnq58IjeqipnshfrA)

## Creació de producte

Aquesta activitat permet a l'usuari venedor crear un producte nou. Abans d’enviar les dades introduïdes per l’usuari, aquestes passen per certes normes de validació. Els camps obligatoris no poden estar buits, i a part, el preu i l’estoc han de ser números positius. Al prémer el botó de guardar es fan les comprovacions mencionades i es persisteix el nou objecte a la base de dades.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfiCfyfr-fNlA4jINx5FlfWNifjC2b80O4RcshHYkrJAXqlN_b6ACpF0S4dz8ZdRdVd-_jPSBq2yN6BtC9Tvdq_puOyU-Gq-9wVRCLB1ZZL11I_OpYIzcsuXUUM6ogGPTPMqor6fA?key=XEllHKnq58IjeqipnshfrA)

## Edició i esborrament de producte

L’usuari venedor pot editar o eliminar els seus productes mitjançant aquesta vista. Després de seleccionar el producte desde la seva pàgina d’inici, es mostra un formulari amb les dades d’aquest, les quals poden ser editades per l’usuari.

Abans d’enviar les dades introduïdes per l’usuari, aquestes passen per certes normes de validació. Els camps obligatoris no poden estar buits, i a part, el preu i l’estoc han de ser números positius. Al prémer el botó de guardar es fan les comprovacions mencionades i es persisteix el nou objecte a la base de dades. El botó d’eliminar simplement esborra el producte de la base de dades.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeXQGlCjzlB6iEQ8SkKtRXRoBrIY18Xdxko-W2-dtjafM5de2t6ZbCKti6uETs1XeBdRSU3jOYkjR0w_om-ueaYb7G6JrpFyQq7dhRaAPieCeLa5MlEo9fz2J5wK_6VPCtf-hUqKA?key=XEllHKnq58IjeqipnshfrA)

## Endpoints utilitzats

Seguidament es mostra un captura corresponent al Swagger de l’API implementada per a l’aplicació mòbil, en el que es poden veure tots els endpoints que consumeix aquesta:

![img](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdEXU3cnuU4W-xcrEQlNOhxzZ0z4YjRSbAo21t6Ap15rsZcKqcySB3UgDjoa9MrX1aFX-SK8RtnbzgbQydquciP8wSRn_Mh3Y-sk4pk0ZY_CryzuEjc3evLxJYcMfOHLJCWRN0PNA?key=XEllHKnq58IjeqipnshfrA)
