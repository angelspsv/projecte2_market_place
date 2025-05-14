document.addEventListener("DOMContentLoaded", async function(){
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



    //recuperar dades cookie
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

//CAL EDITAR I ADAPTAR CODI
//EDITAR CODI PER OBTENIR DADES VENEDOR
// 1) EL ID_VENEDOR EN AQUEST CAS ES EL MATEIX QUE EL ID_USUARI O userID (cookie)
// 2) FER endpoint per obtenir totes les comandes fetes al mateix venedor

    //obtenim les comandes fetes pels usuaris a un venedor concrete
    const comandes = await obtenirComandesUsuariVenedor(userId);
        console.log('Comandes fetes a aquest venedor:', comandes);
    
    
        //construim contenedor per mostrar les comandes que ha rebut l'usuari venedor
        const contenedorComandes = document.getElementById('comandes_venedor');
    
        if (!comandes || comandes.length === 0) {
            contenedorComandes.innerHTML = `<p class="missatge-buit">${userName.toUpperCase()}, encara no has rebut cap comanda!</p>`;
        } else {
            const table = document.createElement('table');
            table.classList.add('taula-comandes');
        
            //cabecera
            const header = table.createTHead();
            const headerRow = header.insertRow();
            const headers = ['ID comanda', 'Nom comprador', 'Recollida', 'Preu total', 'Adreça', `Franja d'entrega`, 'Targeta', 'Comanda feta'];
            headers.forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.classList.add('celda-cabecera');
                headerRow.appendChild(th);
            });
        
            //construim el cos de la taula
            //donem format a les dades
            const tbody = document.createElement('tbody');
    
            //obtenim tots els noms dels compradors abans de generar la taula
            const comandesAmbNomComprador = await Promise.all(
                comandes.map(async (comanda) => {
                    const nomComprador = await obtenirNomComprador(comanda.id_comprador);
                    return { ...comanda, nom_comprador: nomComprador };
                })
            );
    
            //amb els noms dels venedors ja disponibles...
            //construim les files i les omplim de dades
            comandesAmbNomComprador.forEach(comanda => {
                const row = tbody.insertRow();
                const values = [
                    comanda.id,
                    comanda.nom_comprador || 'Desconegut',
                    comanda.recollit ? "Sí" : "No",
                    comanda.preu_total + "€",
                    comanda.targeta.slice(27),
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



//funcio async per recuperar totes les comandes fetes al mateix usuari 
async function obtenirComandesUsuariVenedor(id_venedor){
    try {
        const response = await fetch(`http://127.0.0.1:8000/comandes_venedor/${id_venedor}`);

        if (!response.ok) {
            throw new Error('Comandes no trobades');
        }
    
        //obtenim les comandes de l'usuari venedor
        const venedorComandes = await response.json();
        console.log("Comandes del usuari venedor:", venedorComandes); //depuracio
        return venedorComandes;
    
    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}


//funcio per obtenir el nom del comprador
async function obtenirNomComprador(id){
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