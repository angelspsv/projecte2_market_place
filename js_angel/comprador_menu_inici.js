document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");
    
    //salutacio usuari
    let nom = 'Angel'; //haura d'agafar el nom real de l'usuari
    const nom_usuari = document.querySelector('.username');
    nom_usuari.textContent = nom.toUpperCase();

    //fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "dades_comprador.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella.html" }
        // { text: "Cistella", link: "cistella.html" } //en cop del text podem posar l'imatge d'un carreto
    ];

    //bucle per generar dinamicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        if (button.imgSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = button.imgSrc;
            imgElement.alt = "Carrito";
            imgElement.classList.add("icono-cistella"); // Nueva clase CSS
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        //inserim els botons al contenidor creat per aquests
        buttonsContainer.appendChild(btnElement);
    });

    //faig un contenidor pels dos elements
    const contenidor = document.getElementById('per_input_i_boto');

    //faig el input i el boto de cerca de productes
    const input_text = document.createElement('input');
    input_text.type = 'text';
    input_text.placeholder = 'Què necessites?';
    input_text.classList.add("input-text");  // Afegim una classe per CSS
    contenidor.appendChild(input_text);

    //faig el boto que activara la cerca de articles en la meteixa comarca
    const boto_cerca = document.createElement('button');
    boto_cerca.textContent = 'Cercar';
    boto_cerca.classList.add("btn");  // Reutilitzem el mateix estil dels altres botons
    boto_cerca.addEventListener('click', function(){
        //cridar a l'endpoint por cercar productes de la mateixa comarca
        console.log('està cercant productes...');
    });
    contenidor.appendChild(boto_cerca);
});


//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
function mostrarProductes(text_cerca, comarca){
    // XXX cal desenvolupar 
}
