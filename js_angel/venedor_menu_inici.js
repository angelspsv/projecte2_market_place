document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");
    
    //salutacio usuari
    let nom = 'Joan'; //haura d'agafar el nom real de l'usuari
    const nom_usuari = document.querySelector('.username');
    nom_usuari.textContent = nom.toUpperCase();

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

    //funcio que carrega els productes del venedor
    mostrarProductesVenedor(3);
});


//funcio encara per desenvolupar
//coneixent qui es el venedor es cridara el endpoint per retornar tots els seus productes
function mostrarProductesVenedor(id_venedor){
    const tmp = document.getElementById('productes_venedor');
    tmp.textContent = `Aqui mostrem els articles del venedor amb id: ${id_venedor}`;

    //obtenir la llista de productes de l'usuari i mostrar a tots
    //amb un forEach crear contenidors per cada producte i mostrar a dos per linia


}
