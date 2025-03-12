document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");

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
});