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

    //fem el input y boto de cerca
    const contenidor = document.getElementById('per_input_i_boto');
    const input_text = document.createElement('input');
    input_text.type = 'text';
    input_text.placeholder = 'Què necessites?';
    input_text.classList.add("input-text");
    contenidor.appendChild(input_text);

    const boto_cerca = document.createElement('button');
    boto_cerca.textContent = 'Cercar';
    boto_cerca.classList.add("btn");
    boto_cerca.addEventListener('click', function(){
        console.log('està cercant productes...');
    });
    contenidor.appendChild(boto_cerca);
});


//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
function mostrarProductes(text_cerca, comarca){
    // XXX cal desenvolupar 
}
