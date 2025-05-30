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


    //----------------------------a partir d'aqui la resta de codi
    //al final de tot hauria de redirigir l'usuari a
    //               cistella_pagament.html

    //recuperem els productes seleccionats del localStorage
    const container = document.getElementById('visualitzacio_resum_comanda_cistella');

    //recuperar productes de localStorage
    const cistella = JSON.parse(localStorage.getItem("cistella")) || [];

    //comprovar si la cistella esta buida
    if (cistella.length === 0) {
        container.textContent = "La teva cistella està buida.";
        return;
    }

    //mostrar cada producte
    cistella.forEach((producte, index) => {
        const card = document.createElement("div");
        card.className = "producte-resum";

        card.innerHTML = `
            <img src="${producte.imatge}" alt="${producte.nom}" class="imatge-producte">
            <div class="info-producte">
                <strong>${producte.nom}</strong><br>
                Quantitat: ${producte.quantitat}<br>
                Preu: ${parseFloat(producte.preu).toFixed(2)}€/kg<br>
                Total: ${(parseFloat(producte.preu) * producte.quantitat).toFixed(2)}€
            </div>
        `;

        //crear boto eliminar un producte del resum-cistella-localStorage
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";
        btnEliminar.addEventListener("click", () => {
            //esborrem producte del array de productes en el localStorage
            cistella.splice(index, 1);
            //actualitzar localStorage
            localStorage.setItem("cistella", JSON.stringify(cistella));
            //recargar la pagina
            location.reload();
        });

        card.appendChild(btnEliminar);
        container.appendChild(card);
    });

    
    //calcular total de productes
    const totalBase = cistella.reduce((sum, prod) => sum + parseFloat(prod.preu) * prod.quantitat, 0);

    //definir l'import de la comissió de serveis
    const comissio = 1.00;

    //el total final amb comissió
    const totalFinal = totalBase + comissio;

    //contenidor per mostrar el total amb desglossament
    const totalElement = document.createElement("div");
    totalElement.className = "total-final";
    totalElement.innerHTML = `
        <p><strong>Subtotal:</strong> ${totalBase.toFixed(2)}€</p>
        <p><strong>Comissió serveis:</strong> ${comissio.toFixed(2)}€</p>
        <p><strong>Total de la comanda:</strong> ${totalFinal.toFixed(2)}€</p>
    `;
    container.appendChild(totalElement);


    //afegim al localStorage un resum de la comanda
    //per despres accedir a aquest des de la seguent fase del pagament
    const resumComanda = {
        productes: cistella,
        subtotal: totalBase.toFixed(2),
        comissio: comissio.toFixed(2),
        total: totalFinal.toFixed(2)
    };
    localStorage.setItem("resum_comanda", JSON.stringify(resumComanda));



    //fem boto per dirigir l'usuari a l'etapa d'introduir les seves dades bancaries i 
    //proseguir amb el proces de pagament
    const espaiBoto = document.getElementById('boto_per_anar_pagament');
    const btnGoToPay = document.createElement('button');
    btnGoToPay.textContent = 'Continuar i pagar';
    btnGoToPay.classList.add('btn');
    btnGoToPay.addEventListener('click', function(){
        window.location.href = 'cistella_pagament.html';
    });
    espaiBoto.appendChild(btnGoToPay);
});