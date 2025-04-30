function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        let cookieValue = parts.pop().split(";").shift();
        console.log(`Cookie ${name} encontrada:`, cookieValue);  //verifiquem que la coookie hi es
        return cookieValue;
    }
    console.log(`Cookie ${name} no encontrada`);
    return null;
}

document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");
    //per agafar el valor del imput de cerca
    let text_entrat = "";
    let llistaProductesDeLaComarca = [];

    //recuperar cookies
    const userEmail = getCookie('user_email');
    const userName = getCookie('user_name');
    const userType = getCookie('user_type');
    const userId = getCookie('user_id');

    console.log('Email:', userEmail);
    console.log('Nombre:', userName);
    console.log('Tipo de usuario:', userType);
    console.log('ID usuari:', userId);


    //salutacio a l'usuari
    let nom = userName;  
    const nom_usuari = document.querySelector('.username');

    if (nom_usuari && nom) {
        nom_usuari.textContent = `Hola, ${nom.toUpperCase()}`;
    } else {
        console.error('Problema con el nombre del usuario');
        nom_usuari.textContent = `Hola!`;
    }

    //fem els botons del menu dinamicament
    const buttons = [
        { text: "Les meves dades", link: "dades_comprador.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella.html" }
    ];

    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        if (button.imgSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = button.imgSrc;
            imgElement.alt = "Carrito";
            imgElement.classList.add("icono-cistella");
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        buttonsContainer.appendChild(btnElement);
    });

    //fem el input i boto de cerca
    const contenidor = document.getElementById('per_input_i_boto');
    const input_text = document.createElement('input');
    input_text.type = 'text';
    input_text.placeholder = 'Què necessites?';
    input_text.classList.add("input-text");
    contenidor.appendChild(input_text);

    const boto_cerca = document.createElement('button');
    boto_cerca.textContent = 'Cercar';
    boto_cerca.classList.add("btn");
    boto_cerca.addEventListener('click', async function(){
        //agafem el text introduit en el input per l'usuari i el transforme per fer la cerca
        text_entrat = input_text.value.trim().toLowerCase();
        console.log(text_entrat);

        //coneixem l'ID de l'usuari comprador
        console.log(`ID usuari comprador: ${userId}`);

        //obtenim les dades de l'usuari comprador per agafar la COMARCA d'actuacio
        const dadesUsuari = await obtenimDadesUsuari(userId);
        //JA TINC les dades del usuari i amb aixo la comarca! i també el text de la cerca
        console.log(dadesUsuari);
        console.log(`La comarca de l'usuari es: ${dadesUsuari.comarca}`);
        console.log(`Text entrat: ${text_entrat}`);
        
        //obtenim productes que es venen a la mateixa comarca
        llistaProductesDeLaComarca = await llistaProductesComarca(dadesUsuari.comarca);
        console.log(llistaProductesDeLaComarca);

        //cridem funcio per realitzar la cerca de productes a partir del text entrat
        //i de la llista de objectes amb productes que es venen a la mateixa comarca
        buscarNomEntreProductes(llistaProductesDeLaComarca, text_entrat);

    });
    contenidor.appendChild(boto_cerca);


});




//fem el fetch amb el id de l'usuari per obtenir les dades de l'usuari i coneixer la comarca d'actuacio
//realitzar la peticio GET
async function obtenimDadesUsuari(id){
    try {
        const response = await fetch(`http://127.0.0.1:8000/usuari/${id}`);

        if (!response.ok) {
            throw new Error('Usuari no trobat');
        }

        //obtenim les dades de l'usuari
        const userData = await response.json();
        //console.log("Dades de l'usuari:", userData); //depuracio
        return userData;

    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}


//funcio async per obtenir tots els productes que es venen a la comarca del comprador
//retorna una llista d'objectes de productes
async function llistaProductesComarca(comarca){
    try {
        const response = await fetch(`http://127.0.0.1:8000/productes/${comarca}`);

        if (!response.ok) {
            throw new Error('No hi ha productes');
        }

        //obtenim la llista de productes de la comarca
        const productesComarca = await response.json();
        console.log("Productes de la comarca:", productesComarca); //depuracio
        return productesComarca;

    } catch (error) {
        console.log('error en el fetch', error.message);
    }
}



//funcio per mostrar cada producte
//fare servir createElements per visualitzar cada producte
//dos productes per linia
function mostrarProductesVenedor(productes){
    //seleccionem l'element html on es mostraran els productes del venedor
    const container = document.getElementById('visualitzacio_productes_cercats');
    //netegem el contingunt previ
    container.innerHTML = "";

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

            //contador de productes/quantitat que vol compra l'usuari
            const afegirTreureContainer = document.createElement("div");
            afegirTreureContainer.className = "producte-afegir-treure";

            //boto +
            const btnAfegir = document.createElement("button");
            btnAfegir.textContent = "+";
            btnAfegir.className = "btn-quantitat";
            btnAfegir.addEventListener("click", () => {
                let actual = parseInt(spanQuantitat.textContent);
                spanQuantitat.textContent = actual + 1;
            });

            //span per mostrar la quantitat
            const spanQuantitat = document.createElement("span");
            spanQuantitat.textContent = "0";
            spanQuantitat.className = "quantitat-numero";
        
            //boto -
            const btnRestar = document.createElement("button");
            btnRestar.textContent = "-";
            btnRestar.className = "btn-quantitat";
            btnRestar.addEventListener("click", () => {
                let actual = parseInt(spanQuantitat.textContent);
                if (actual > 0) {
                    spanQuantitat.textContent = actual - 1;
                }
            });

            // Afegim els elements al contenidor
            afegirTreureContainer.appendChild(btnAfegir);
            afegirTreureContainer.appendChild(spanQuantitat);
            afegirTreureContainer.appendChild(btnRestar);

    
            //botons
            //boto per afegir el producte al carreto
            //const btnEditar = document.createElement("button");
            //btnEditar.textContent = "Afegir";
            //btnEditar.className = "btn-producte editar";
            //afegim esdeveniment al boto per afegir un article
            //btnEditar.addEventListener('click', function(){
            //    alert('Cridar funció per afegir al carretó!');
            //});
    
            //boto per esborrar o treure el producte del carreto
            //const btnEliminar = document.createElement("button");
            //btnEliminar.textContent = "Treure";
            //btnEliminar.className = "btn-producte eliminar";
            //afegim esdeveniment al boto per esborrar un article
            //btnEliminar.addEventListener('click', function(){
            //    alert('Cridar funció per esborrar!');
            //});
    
            //const botoContainer = document.createElement("div");
            //botoContainer.className = "producte-botons";
            //botoContainer.appendChild(btnEditar);
            //botoContainer.appendChild(btnEliminar);
    
            //afegim diferents elements al card/contenidor de producte
            card.appendChild(img);
            card.appendChild(info);
            //card.appendChild(botoContainer);
            card.appendChild(afegirTreureContainer);
            
            //afegim el producte a la filera
            fila.appendChild(card);
        }
        //afegim filera al contenidor
        container.appendChild(fila);
    }
}



//funcio que filtra els articles pel seu nom 
// i només retorna els que tenen el nom igual que el text cercat
function buscarNomEntreProductes(objectes, text_entrat){
    let text_cerca = text_entrat.trim().toLowerCase();

    //nomes es fara cerca a partir de dos caracters entrats
    if(text_cerca.length > 1){
        //filtrem els productes de la comarca en la cerca del text entrat
        let productes_filtrats = objectes.filter(function(obj){
            return obj.nom.toLowerCase().includes(text_cerca);
        });

        //cridem la funcio per visualització dels productes que compleixin amb el text cercat
        mostrarProductesVenedor(productes_filtrats);


    }else{
        //si el text es menor de 2chars
        alert("El text entrat és massa curt!");
    }
}