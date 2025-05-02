document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");
    
    
    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_venedor.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Pujar nou producte", link: "pujar_producte.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" }
    ];

    //bucle per generar dinamicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.textContent = button.text;
        btnElement.href = button.link;
        btnElement.classList.add("btn");
        //inserim els botons al contenidor creat per aquests
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
    const id_usuari = userId;

    //si nom i nom_usuari no son buits, mostrem l'opcio del IF
    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = 'Hola!';
    }


    //funcio asincrona que carrega els productes del venedor cridant el endpoint /productes_venedor/{id}
    obtenirProductesVenedor(id_usuari);

});




//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
async function obtenirProductesVenedor(id_venedor){
    try{

        const tmp = document.getElementById('productes_venedor');
        tmp.textContent = `Aqui mostrem els articles del venedor amb id: ${id_venedor}`;

        //obtenir la llista de productes de l'usuari
        //fetch per obtenir els productes del venedor 
        const response = await fetch(`http://127.0.0.1:8000/productes_venedor/${id_venedor}`);

        if (!response.ok) {
            throw new Error('Usuari no trobat');
        }

        //obtenim la llista d'objectes de productes
        const dataProductes = await response.json();
        console.log(dataProductes);


        //cridar funcio per mostrar cada producte
        //fare servir createElements per visualitzar cada producte
        //dos productes per linia
        mostrarProductesVenedor(dataProductes);


    }catch (error){
        console.log('error en el fetch', error.message);
    }
}


//funcio per mostrar cada producte
//fare servir createElements per visualitzar cada producte
//dos productes per linia
function mostrarProductesVenedor(productes){
    //seleccionem l'element html on es mostraran els productes del venedor
    const container = document.getElementById('productes_venedor');
    //netegem el contingunt previ
    container.innerHTML = "";


    //si no hi ha productes, mostrem un missatge
    if (productes.length === 0) {
        const missatge = document.createElement("div");
        missatge.className = "missatge-buit";
        missatge.textContent = "No tens cap producte pujat!";
        container.appendChild(missatge);
        return;
    }

    //bucles per recorre els objectes de productes
    for (let i = 0; i < productes.length; i += 2) {
        const fila = document.createElement("div");
        fila.className = "fila-productes";
    
        for (let j = i; j < i + 2 && j < productes.length; j++) {
            const prod = productes[j];
    
            //faig el contenidor per cada producte
            const card = document.createElement("div");
            card.className = "producte-card";
    
            //imatge del producte
            const img = document.createElement("img");
            img.src = prod.url_imatge;
            img.alt = prod.nom;
            img.className = "producte-img";
    
            //dades del producte
            const info = document.createElement("div");
            info.className = "producte-info";
            info.innerHTML = `
                <strong>${prod.nom}</strong><br>
                ${prod.descripcio}<br>
                Preu: ${prod.preu}€<br>
                Quantitat: ${prod.stock}kg/uds
            `;
    
            //botons
            //boto per editar les dades del producte
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.className = "btn-producte editar";
            //afegim esdeveniment al boto editar:
            //redirigeix el usuari-venedor cap a editar_producte.html amb el ID del producte
            btnEditar.addEventListener('click', function(){
                //passem id producte per l'url
                window.location.href = `editar_producte.html?id=${prod.id}`;
            });
    
            //boto per esborrar les dades del producte
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btn-producte eliminar";
            //afegim esdeveniment al boto per esborrar un article
            btnEliminar.addEventListener('click', function(){
                esborrarProducte(prod.id, prod.id_venedor);
            });
    
            const botoContainer = document.createElement("div");
            botoContainer.className = "producte-botons";
            botoContainer.appendChild(btnEditar);
            botoContainer.appendChild(btnEliminar);
    
            //afegim diferents elements al card/contenidor de producte
            card.appendChild(img);
            card.appendChild(info);
            card.appendChild(botoContainer);
            
            //afegim el producte a la filera
            fila.appendChild(card);
        }
        //afegim filera al contenidor
        container.appendChild(fila);
    }
    
}



//funcio async que cridara l'endpoint /producte_del/{id} per esborrar un producte
//pasem id_producte per esborrar-ho i el id_venedor per actualitzar despres la llista de productes
async function esborrarProducte(id_producte, id_venedor){
    if(!id_producte){
        console.log('Error: ID buit o no definit');
        return;
    }

    //abans d'esborrar demanem confirmacio a l'usuari
    if(confirm('Estàs segur que vols esborrar aquest producte?')){
        const response = await fetch(`http://127.0.0.1:8000/producte_del/${id_producte}`, {
            method: 'DELETE', 
        });

        if (!response.ok) {
            throw new Error('Producte no trobat');
        }

        //obtenim la llista d'objectes de productes
        const data = await response.json();
        console.log(data);

        //actualitzem la llista de productes
        obtenirProductesVenedor(id_venedor);
    }
}