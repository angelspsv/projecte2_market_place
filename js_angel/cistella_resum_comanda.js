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
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella_resum_comanda.html" }
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
            imgElement.classList.add("icono-cistella"); //afegim classe CSS
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        //si el boto es el de la pagina actual, afegim classe "active" i eliminem l'enllaç
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); //evita que l'usuari pugui fer clic de nou
        }
        buttonsContainer.appendChild(btnElement);
    });


    //----------------------------a partir d'aqui la resta de codi
    //al final de tot hauria de redirigir l'usuari a
    //               cistella_pagament.html


});