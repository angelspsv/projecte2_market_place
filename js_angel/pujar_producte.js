document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");


    
    //faig el logo-home que si rep click portara el usuari a la pagina index / inici
    const logo = document.createElement('img');
    logo.src = 'imatges_angel/sprout_346246.png';
    logo.alt = 'GO to home';
    logo.addEventListener('click', function(){
    window.location.href = 'venedor_menu_inici.html';
    });
    document.getElementById('logo_home').appendChild(logo);




    //salutacio usuari
    let nom = 'Angel'; //haura d'agafar el nom real de l'usuari
    const nom_usuari = document.querySelector('.username');
    nom_usuari.textContent = nom.toUpperCase();

    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_venedor.html" },
        { text: "Les meves comandes", link: "venedor_comandes.html" },
        { text: "Pujar nou producte", link: "pujar_producte.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" }
    ];

    //obtenim el nom del fitxer actual
    const currentPage = window.location.pathname.split("/").pop(); 

    //bucle per generar dinamicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.textContent = button.text;
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        //si la pagina actual es la mateixa que el link, marquem el boto com actiu
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); //evita que el usuari pugui fer click ovament al boto
        }

        buttonsContainer.appendChild(btnElement);
    });


    const accioButton = document.querySelector('.submit-btn');
        if (accioButton) {
            console.log('Botón encontrado');
            accioButton.addEventListener('click', function(event){
                //evitem que la pagina es regarregues
                event.preventDefault(); 
                console.log('Botón clicado');

                //agafem les dades des dels camps del formulari 
                const nom_producte = document.getElementById("nom_producte").value.trim().toLowerCase();
                const descripcio_producte = document.getElementById("descripcio_producte").value.trim().toLowerCase();
                //agafem el valor del preu
                let precio = document.getElementById("preu").value.trim();
                if(!precio){
                    alert("Preu no introduït!");
                    return;
                }       
                const preu = comprovacioPreu(precio);
                //si el preu es menor a 0 => valor entrat com preu es incorrecte
                if(preu < 0){
                    alert("Preu introduït no vàlid!");
                    return;
                }
                const quantitat_disponible = document.getElementById("quantitat_disponible").value;
                const url_imatge = document.getElementById("url_imatge").value


                //si hi ha camps buits => missatge d'avis
                if (!nom_producte || !descripcio_producte || !preu || !quantitat_disponible || !url_imatge) {
                    alert("No pot haver camps buits!");
                    return;
                }


                // Capturar els valors del formulari
                const formData = {
                    nom_producte: document.getElementById("nom_producte").value,
                    descripcio_producte: document.getElementById("descripcio_producte").value,
                    preu: document.getElementById("preu").value,
                    quantitat_disponible: document.getElementById("quantitat_disponible").value,
                    url_imatge: document.getElementById("url_imatge").value
                };

                console.log("Dades del formulari:", formData);

                // Aquí podrías hacer una petición fetch si fuera necesario


                //i finalment conduir l'usuari a una altra pagina o mostrar un missatge

            });
        } else {
            console.log('Botón no encontrado');
        }
    
});


//funcio que valida el preu entrat; admet nombres enters i decimals
function comprovacioPreu(entrada){
    let precioString = entrada.replace(",", ".").trim();
    
    // Verificar si es un número válido usando una expresión regular
    if (/^\d+(\.\d{1,2})?$/.test(precioString)) {
        let precioNumero = parseFloat(precioString);
    
        if (!isNaN(precioNumero) && precioNumero > 0) {
            console.log("Número válido:", precioNumero);
            //retornem el valor del preu passat a float/decimal
            return precioNumero;
        } else {
            console.log("Error: el precio debe ser un número positivo.");
            return -1;
        }
    } else {
        console.log("Error: formato de precio inválido.");
        alert("El preu introduït no és vàlid!");
        return -1;
    }
}