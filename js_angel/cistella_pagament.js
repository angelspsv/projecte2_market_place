document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");


    //faig el logo-home que si rep click portara el usuari a la pagina index / inici
    const logo = document.createElement('img');
    logo.src = 'imatges_angel/sprout_346246.png';
    logo.alt = 'GO to home';
    logo.addEventListener('click', function(){
        window.location.href = 'comprador_menu_inici.html';
    });
    document.getElementById('logo_home').appendChild(logo);


    // Obtenim el nom del fitxer actual
    const currentPage = window.location.pathname.split("/").pop();

    // Fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_comprador.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella_pagament.html" }
    ];

    // Bucle per generar dinàmicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        if (button.imgSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = button.imgSrc;
            imgElement.alt = "Carrito";
            imgElement.classList.add("icono-cistella"); // Afegim classe CSS
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        // Si el botó és el de la pàgina actual, afegim classe "active" i eliminem l'enllaç
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); // Evita que l'usuari pugui fer clic de nou
        }

        buttonsContainer.appendChild(btnElement);
    });

    //codi del boto de cancel·lar
    const cancelButton = document.querySelector(".cancel-btn");
    if (cancelButton) {
        cancelButton.addEventListener("click", function(){
            window.location.href = "comprador_menu_inici.html"; // redirigeix al inici
        });
    }


    //codi per recuperar la cookie
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) {   
            let cookieValue = parts.pop().split(";").shift();
            console.log(`Cookie ${name} trobada:`, cookieValue);  //verifiquem que la coookie hi es
            return cookieValue;
        }
        console.log(`Cookie ${name} no encontrada`);
        return null;
    }



    // Recuperar las cookies
    const userEmail = getCookie('user_email');
    const userName = getCookie('user_name');
    const userType = getCookie('user_type');
    const userId = getCookie('user_id');

    console.log('Email:', userEmail);
    console.log('Nombre:', userName);
    console.log('Tipo de usuario:', userType);
    console.log('ID usuari:', userId);



    //salutacio usuari
    let nom = userName;  //hauria de retornar el nom del usuari
    const nom_usuari = document.querySelector('.username');

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }


    //recuperem les dades de la comanda del resum_comanda
    const resumComanda = JSON.parse(localStorage.getItem("resum_comanda"));
    if (resumComanda) {
        console.log("Productes:", resumComanda.productes);
        console.log("Total:", resumComanda.total);
    }


    //codi pel formulari de pagament
    const accioButton = document.querySelector('.submit-btn');
    console.log(accioButton); //depuracio
    if (accioButton){
        accioButton.addEventListener('click', async function(event){
            //evitem que la pagina es regarregues
            event.preventDefault(); 
            console.log('Botó clicat');

            //agafem les dades des dels camps del formulari 
            const titular_targeta = document.getElementById("nom_targeta").value.trim().toLowerCase();
            const numero_targeta = document.getElementById("num_targeta").value.trim();
            const camp_cvv = document.getElementById("cvv").value.trim().toLowerCase();      
            const caducidad = document.getElementById("caducitat").value.trim();
            const direccio = document.getElementById("address").value.trim().toLowerCase();
            const fra_entrega = document.getElementById("franja_entrega").value.trim();

            //si hi ha camps buits => missatge d'avis
            if (!titular_targeta || !numero_targeta || !camp_cvv || !caducidad || !direccio || !fra_entrega) {
                alert("No pot haver camps buits!");
                return;
            }


            //num targeta nomes nums i nums=16
            if(numero_targeta.length !== 16){
                alert("Longitud de targeta entrada incorrecte!");
                return;
            }

            if(!nomesNums(numero_targeta)){
                alert("Per la targeta del banc: només s'admeten números!");
                return;
            }

            //el cvv nomes 3 lletres
            if(camp_cvv.length !== 3){
                alert("Longitud del CVV entrat incorrecte!");
                return;
            }

            if(!cvvCorrecte(camp_cvv)){
                alert("El camp CVV només admét números!");
                return;
            }


            //caducitat: chars 0,1,3 i 4 -> nums; char[2] == '/'
            if(caducidad.length !== 5){
                alert("La longitud de la caducitat de la targeta no és correcta!");
                return;
            }

            if(!esValidaDataTargeta(caducidad)){
                alert("El camp caducitat entrat no és correcte!");
                return;
            }

            // franja d'entrega: chars 0,1,3 i 4 -> nums; char[2] == ':'
            if(fra_entrega.length !== 5){
                alert("La longitud de la franja horaria no és correcta!");
                return;
            }

            if(!esFranjaValida(fra_entrega)){
                alert("El camp de franja horaria no té el format correcte!");
                return;
            }
            

            //falta ID_venedor: ¿como conseguirlo?
            //cistella_pagament recibe id_productos -> fetch de /producte/id 
            //retorna un objeto json y de allí coger id_vendedor
            //aqui obtenir el id_venedor per despres passar-ho al objecte i l'insert de comanda
            //agafem l'id del primer producte del resum de la comanda des del localStorage
            const id_producte = resumComanda.productes[0].id;
            if(!id_producte){
                alert('No hi ha productes a la cistella!');
                return;
            }

            const dataProducte = await obtenirDadesProducte(id_producte);
            //mirem si producte existeix
            if(!dataProducte){
                alert(`Fallo en l'obtenció de dades del producte!`);
                return;
            }
            //finalment obtenim el id del venedor
            const venedor_id = dataProducte.id_venedor


            //ara nomes falta fer un String (csv) amb les dades del banc de l'usuari
            //format: "num_tarjeta,camp_cvv,caducitat"
            const targeta = "" + numero_targeta + "," + camp_cvv + "," + caducidad;
            //depuracio dades targeta
            console.log(targeta);


            // Capturar els valors del formulari
            // *** les keyes de l'objecte hauran de tenir el mateix nom que els camps de la bbdd
            //cal incloure: titular_targeta i direccio
            const formData = {
                "id_comprador": Number(userId),
                "id_venedor": venedor_id,
                "recollit": 0,
                "preu_total": parseFloat(resumComanda.total).toFixed(2),
                "franja_entrega": fra_entrega,
                "targeta": targeta                
            };

            console.log(`Dades del formulari:", ${titular_targeta}, ${numero_targeta}, ${camp_cvv}, ${caducidad}, ${direccio}, ${fra_entrega},`);
            console.log("Dades a enviar de la comanda:", JSON.stringify(formData)); //depuracio
            
            
            //aqui fer peticio fetch POST/insert a la taula COMANDA
            try {
                const response = await fetch("http://127.0.0.1:8000/nova_comanda/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                console.log("Resposta de la API:", response.status, response.statusText); //depuracio

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                console.log("Resposta JSON:", data); //depuracio

                if (data.detail) {
                    alert("Error al finalitzar la compra: " + data.detail);
                } else {
                    alert("Compra finalitzada correctament!");

                    //cal esborrar cistella i resum_comanda del localStage per finalitzar la compra
                    localStorage.removeItem("cistella");
                    localStorage.removeItem("resum_comanda");


                    //i finalment conduir l'usuari a la pagina de les seves comandes
                    window.location.href = 'comprador_comandes.html';
                }
            } catch (error) {
                alert("Error en finalitzar la compra. " + error.message);
                console.error("Error detallat:", error);
            }

        });
    }else{
        console.log('Botón no encontrado');
    }


});

//FUNCIONS REGULARS
//funcio regular per comprovar que la targeta entrada per l'usuari son 16 nums
function nomesNums(str){
    return /^\d{16}$/.test(str);
}

//funcio que comprova que nomes son numeros
function cvvCorrecte(str){
    return /^\d{3}$/.test(str);
}

//funcio per comprovar la validesa d'una targeta
function esValidaDataTargeta(fecha) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(fecha);
}

//funcio per validar la franja horari d'entrega
function esFranjaValida(franja) {
    return /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-3])$/.test(franja);
}


//funcio asyncrona per obtenir les dades del producte a partir del ID de producte
async function obtenirDadesProducte(id){
    try {
        const response = await fetch(`http://127.0.0.1:8000/producte/${id}`);

        if (!response.ok) {
            throw new Error('Producte no trobat');
        }

        const dadesProducte = await response.json();
        console.log("Dades del producte:", dadesProducte);

        //retornem les dades del producte
        return dadesProducte;

    } catch (error) {
        console.error("Error al carregar les dades:", error.message);
        alert("No s'han pogut carregar les dades del producte.");
    }
}