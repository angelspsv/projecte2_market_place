document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.getElementById("buttons-container");

    // Salutació usuari
    let nom = "Angel"; // haura d'agafar el nom real de l'usuari
    const nom_usuari = document.querySelector(".username");
    nom_usuari.textContent = nom.toUpperCase();

    // Obtenim el nom del fitxer actual
    const currentPage = window.location.pathname.split("/").pop();

    // Fem un array amb el text dels botons i les urls
    const buttons = [
        { text: "Les meves dades", link: "meves_dades.html" },
        { text: "Les meves comandes", link: "comprador_comandes.html" },
        { text: "Tancar sessió", link: "tancar_sessio.html" },
        { imgSrc: "imatges_angel/216477_shopping_cart_icon.png", link: "cistella.html" }
    ];

    // Bucle per generar dinàmicament els botons
    buttons.forEach(button => {
        let btnElement = document.createElement("a");
        btnElement.href = button.link;
        btnElement.classList.add("btn");

        if (button.imgSrc) {
            let imgElement = document.createElement("img");
            imgElement.src = button.imgSrc;
            imgElement.alt = "Carrito";
            imgElement.classList.add("icono-cistella"); // Afegim classe CSS
            btnElement.appendChild(imgElement);
        } else {
            btnElement.textContent = button.text;
        }

        // Si el botó és el de la pàgina actual, afegim classe "active" i eliminem l'enllaç
        if (currentPage === button.link) {
            btnElement.classList.add("active");
            btnElement.removeAttribute("href"); // Evita que l'usuari pugui fer clic de nou
        }

        buttonsContainer.appendChild(btnElement);
    });
});