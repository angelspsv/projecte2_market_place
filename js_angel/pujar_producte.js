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



    //recuperar cookie
    const userEmail = getCookie('user_email');
    const userName = getCookie('user_name');
    const userType = getCookie('user_type');
    const userId = getCookie('user_id');

    console.log('Email:', userEmail);
    console.log('Nombre:', userName);
    console.log('Tipo de usuario:', userType);
    console.log('ID usuari:', userId);
    

    //salutacio al usuari
    let nom = userName;  //hauria de mostrar el nom del usuari real
    const nom_usuari = document.querySelector('.username');

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }







    const accioButton = document.querySelector('.submit-btn');
    if (accioButton){
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
            const price = comprovacioPreu(precio);
            //si el preu es menor a 0 => valor entrat com preu es incorrecte
            if(preu < 0){
                alert("Preu introduït no vàlid!");
                return;
            }
            const quantitat_disponible = document.getElementById("quantitat_disponible").value;
            const imatge = document.getElementById("url_imatge").value

            //si hi ha camps buits => missatge d'avis
            if (!nom_producte || !descripcio_producte || !price || !quantitat_disponible || !imatge) {
                alert("No pot haver camps buits!");
                return;
            }

            // Capturar els valors del formulari
            const formData = {
                nom : nom_producte,
                descripcio : descripcio_producte,
                preu: price,
                stock : quantitat_disponible,
                url_imatge : imatge
            };

            console.log("Dades del formulari:", formData);

            //aqui fer la peticio fetch


            //si fetch ok

            //finalment conduir l'usuari a una altra pagina o mostrar un missatge
            //window.location.href = 'venedor_menu_inici.html';
        });
    }else{
        console.log('Botón no encontrado');
    }
});


//funcio que valida el preu entrat; admet numeros enters i decimals
function comprovacioPreu(entrada){
    let precioString = entrada.replace(",", ".").trim();
    
    //verificar si es un numero es valid
    if (/^\d+(\.\d{1,2})?$/.test(precioString)) {
        let precioNumero = parseFloat(precioString);
    
        if (!isNaN(precioNumero) && precioNumero > 0) {
            console.log("Número válido:", precioNumero);
            //retornem el valor del preu passat a float/decimal
            return precioNumero;
        } else {
            console.log("Error: el preu ha de ser un número positiu.");
            return -1;
        }
    } else {
        console.log("Error: format de preu invalid.");
        alert("El preu introduït no és vàlid!");
        return -1;
    }
}