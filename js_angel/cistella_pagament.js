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







    // Salutació usuari
    let nom = "Angel"; // haura d'agafar el nom real de l'usuari
    const nom_usuari = document.querySelector(".username");
    nom_usuari.textContent = nom.toUpperCase();

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


    //codi pel formulari de pagament
    const accioButton = document.querySelector('.submit-btn');
    if (accioButton){
        console.log('Botó trobat');
        accioButton.addEventListener('click', function(event){
            //evitem que la pagina es regarregues
            event.preventDefault(); 
            console.log('Botó clicat');

            //agafem les dades des dels camps del formulari 
            const titular_targeta = document.getElementById("nom_targeta").value.trim().toLowerCase();
            const numero_targeta = document.getElementById("num_targeta").value.trim();
            const camp_cvv = document.getElementById("cvv").value.trim().toLowerCase();      
            const caducidad = document.getElementById("caducitat").value.trim().toLowerCase();
            const direccio = document.getElementById("address").value.trim().toLowerCase();
            const fra_entrega = document.getElementById("franja_entrega").value.trim();

            //si hi ha camps buits => missatge d'avis
            if (!titular_targeta || !numero_targeta || !camp_cvv || !caducidad || !direccio || !fra_entrega) {
                alert("No pot haver camps buits!");
                return;
            }


            // aqui calen mes comprovacions

            //num targeta nomes nums i ==16

            //el cvv nomes 3 lletres

            //caducitat: chars 0,1,3 i 4 -> nums; char[2] == '/'

            // franja d'entrega: chars 0,1,3 i 4 -> nums; char[2] == ':'



            // Capturar els valors del formulari
            // *** les keyes de l'objecte hauran de tenir el mateix nom que els camps de la bbdd
            const formData = {
                "titular_targeta": titular_targeta,
                "targeta": numero_targeta,
                "camp_cvv": camp_cvv,
                "caducidad": caducidad,
                "direccio": direccio,
                "fra_entrega": fra_entrega
            };

            console.log("Dades del formulari:", formData);

            //aqui fer peticio fetch


            //i finalment conduir l'usuari a una altra pagina o mostrar un missatge

        });
    }else{
        console.log('Botón no encontrado');
    }







});