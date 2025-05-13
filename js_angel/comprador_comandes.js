document.addEventListener("DOMContentLoaded", async function(){
    const buttonsContainer = document.getElementById("buttons-container");


    //faig el logo-home que si rep click portara el usuari a la pagina index / inici
    const logo = document.createElement('img');
    logo.src = 'imatges_angel/sprout_346246.png';
    logo.alt = 'GO to home';
    logo.addEventListener('click', function(){
        window.location.href = 'comprador_menu_inici.html';
    });
    document.getElementById('logo_home').appendChild(logo);


    //obtenim el nom del fitxer actual
    const currentPage = window.location.pathname.split("/").pop();

    // Fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_comprador.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella_resum_comanda.html" }
    ];

    //bucle per generar dinàmicament els botons
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

        //si el botó és el de la pàgina actual, afegim classe "active" i eliminem l'enllaç
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


    //obtenim les comandes fetes per l'usuari
    const comandes = await obtenirComandesUsuariComprador(Number(userId));
    console.log('Comandes comprador:', comandes);


    //mostrem les comandes que ha realitzat l'usuari comprador
    const contenedorComandes = document.getElementById('visualitzacio_comandes_fetes');

    if (!comandes || comandes.length === 0) {
        contenedorComandes.innerHTML = `<p class="missatge-buit">${userName.toUpperCase()}, encara no has fet cap comanda!</p>`;
    } else {
        const table = document.createElement('table');
        table.classList.add('taula-comandes');
    
        //cabecera
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ['ID comanda', 'Nom venedor', 'Recollida', 'Preu total', `Franja d'entrega`, 'Targeta', 'Comanda feta'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.classList.add('celda-cabecera');
            headerRow.appendChild(th);
        });
    
        //construim el cos de la taula
        //donem format a les dades
        const tbody = document.createElement('tbody');

        //obtenim tots els noms de venedors abans de generar la taula
        const comandesAmbNomVenedor = await Promise.all(
            comandes.map(async (comanda) => {
                const nomVenedor = await obtenirNomVenedor(comanda.id_venedor);
                return { ...comanda, nom_venedor: nomVenedor };
            })
        );

        //amb els noms dels venedors ja disponibles...
        //construim les files i les omplim de dades
        comandesAmbNomVenedor.forEach(comanda => {
            const row = tbody.insertRow();
            const values = [
                comanda.id,
                comanda.nom_venedor || 'Desconegut',
                comanda.recollit ? "Sí" : "No",
                comanda.preu_total + "€",
                `Des de: ${comanda.franja_entrega.slice(0, 2)}h, fins a: ${comanda.franja_entrega.slice(3)}h`,
                `**** **** **** ${comanda.targeta.slice(12, 16)}`,
                comanda.creat_a
            ];

            values.forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
                cell.classList.add('celda');
            });
        });
    
        table.appendChild(tbody);
        contenedorComandes.innerHTML = '';
        contenedorComandes.appendChild(table);
    }
});


//funcio async per recuperar totes les comandes del mateix usuari 
async function obtenirComandesUsuariComprador(id_comprador){
    try {
        const response = await fetch(`http://127.0.0.1:8000/comandes_comprador/${id_comprador}`);

        if (!response.ok) {
            throw new Error('Comandes no trobades');
        }
    
        //obtenim les comandes de l'usuari comprador
        const compradorComandes = await response.json();
        console.log("Comandes del usuari comprador:", compradorComandes); //depuracio
        return compradorComandes;
    
    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}



//funcio per obtenir el nom del venedor
async function obtenirNomVenedor(id){
    try {
        const response = await fetch(`http://127.0.0.1:8000/usuari/${id}`);

        if (!response.ok) {
            throw new Error('Usuari no trobat');
        }
    
        //obtenim les dades de l'usuari
        const userData = await response.json();
        //nomes retornem el nom del usuari
        return userData.nom;
    
    } catch (error) {
        console.log('error en el fetch', error.message);
    }   
}