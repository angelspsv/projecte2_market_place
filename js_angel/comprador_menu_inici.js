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
        

        llistaProductesDeLaComarca = await llistaProductesComarca(dadesUsuari.comarca);
        console.log(llistaProductesDeLaComarca);

        //cridem funcio per realitzar la cerca de productes a partir del text entrat
        mostrarInputText(text_entrat); //ara es aquesta funcio per fer les proves
        //despres: mostrarProductesPerComprador(text_cerca, comarca);
    });
    contenidor.appendChild(boto_cerca);


});


//funcio de prova per mostrar el text entrat
function mostrarInputText(texto){
    const container_poducts = document.getElementById('visualitzacio_productes_cercats');
    container_poducts.textContent = texto;
}


//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
async function mostrarProductesPerComprador(text_cerca, comarca){
    // XXX cal desenvolupar 
}




/*
query per retornar tots els productes dels venedors de la comarca X

SELECT p.*
FROM productes p
JOIN usuaris u ON p.id_venedor = u.id_usuari
WHERE u.comarca = 'barcelones';


*/


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